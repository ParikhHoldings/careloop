-- CareLoop — AI Caregiver Assistant
-- PostgreSQL Schema — 2026-04-03

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free','family','premium')),
  stripe_customer_id VARCHAR(255),
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '14 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_users_clerk_id ON users(clerk_id);

-- Parent profiles
CREATE TABLE parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  primary_caregiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  date_of_birth DATE,
  phone VARCHAR(50),
  address TEXT,
  living_situation VARCHAR(50) CHECK (living_situation IN ('independent','with_family','assisted_living','memory_care','skilled_nursing')),
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(50),
  primary_physician_name VARCHAR(255),
  primary_physician_phone VARCHAR(50),
  -- Check-in preferences
  checkin_enabled BOOLEAN DEFAULT TRUE,
  checkin_time TIME DEFAULT '10:00',
  checkin_method VARCHAR(20) DEFAULT 'sms' CHECK (checkin_method IN ('sms','voice','email')),
  -- Notes
  general_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_parents_caregiver ON parents(primary_caregiver_id);

-- Family members / caregivers (siblings, spouses, etc.)
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'caregiver' CHECK (role IN ('primary_caregiver','family','view_only')),
  relationship VARCHAR(100), -- 'daughter', 'son', 'spouse', etc.
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(parent_id, user_id)
);
CREATE INDEX idx_family_members_parent ON family_members(parent_id);

-- Medications
CREATE TABLE medications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  dosage VARCHAR(100),
  purpose TEXT,
  prescribing_doctor VARCHAR(255),
  pharmacy VARCHAR(255),
  refill_date DATE,
  -- Schedule
  frequency VARCHAR(50), -- 'once_daily', 'twice_daily', 'weekly', 'as_needed'
  times_of_day TIME[],
  with_food BOOLEAN DEFAULT FALSE,
  instructions TEXT,
  -- Status
  active BOOLEAN DEFAULT TRUE,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_medications_parent ON medications(parent_id);

-- Medication adherence log
CREATE TABLE medication_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medication_id UUID REFERENCES medications(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  scheduled_time TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','taken','missed','skipped')),
  recorded_by VARCHAR(20) CHECK (recorded_by IN ('parent_self','caregiver','system')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_med_logs_parent ON medication_logs(parent_id, scheduled_time);

-- Appointments / doctors
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  doctor_name VARCHAR(255),
  specialty VARCHAR(100),
  appointment_datetime TIMESTAMPTZ NOT NULL,
  location TEXT,
  phone VARCHAR(50),
  purpose TEXT,
  prep_notes TEXT,
  post_visit_summary TEXT,
  reminder_sent_at TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled','completed','cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_appointments_parent ON appointments(parent_id, appointment_datetime);

-- Daily check-ins
CREATE TABLE checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  checkin_date DATE NOT NULL DEFAULT CURRENT_DATE,
  method VARCHAR(20),
  status VARCHAR(20) CHECK (status IN ('pending','completed','no_response','flagged')),
  parent_response TEXT,
  ai_summary TEXT,
  concern_level VARCHAR(20) CHECK (concern_level IN ('all_good','watch','alert')),
  flagged_reason TEXT,
  caregiver_notified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(parent_id, checkin_date)
);
CREATE INDEX idx_checkins_parent ON checkins(parent_id, checkin_date);

-- Document vault
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) CHECK (category IN ('insurance','medical','legal','financial','personal','other')),
  description TEXT,
  file_url TEXT, -- stored in S3/Cloudflare R2
  file_size INTEGER,
  mime_type VARCHAR(100),
  expiry_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_documents_parent ON documents(parent_id, category);

-- Alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) NOT NULL, -- 'missed_medication','no_checkin','appointment_tomorrow','document_expiring'
  severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('low','medium','high','urgent')),
  message TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  notified_users UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);
CREATE INDEX idx_alerts_parent ON alerts(parent_id, resolved);

-- Family updates feed
CREATE TABLE updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
  posted_by UUID REFERENCES users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  update_type VARCHAR(50) DEFAULT 'note', -- 'note','appointment_summary','checkin_summary','alert'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_updates_parent ON updates(parent_id, created_at);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255),
  tier VARCHAR(20),
  status VARCHAR(20),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- View: parent care status
CREATE VIEW parent_care_status AS
SELECT 
  p.id as parent_id,
  p.primary_caregiver_id,
  p.first_name || ' ' || COALESCE(p.last_name, '') as parent_name,
  -- Today's checkin
  c.status as todays_checkin,
  c.concern_level,
  -- Medication adherence (last 7 days)
  ROUND(
    100.0 * COUNT(CASE WHEN ml.status = 'taken' THEN 1 END) / NULLIF(COUNT(ml.id), 0),
    1
  ) as medication_adherence_pct,
  -- Open alerts
  COUNT(DISTINCT a.id) FILTER (WHERE NOT a.resolved) as open_alerts,
  -- Next appointment
  MIN(ap.appointment_datetime) FILTER (WHERE ap.appointment_datetime > NOW()) as next_appointment
FROM parents p
LEFT JOIN checkins c ON c.parent_id = p.id AND c.checkin_date = CURRENT_DATE
LEFT JOIN medication_logs ml ON ml.parent_id = p.id AND ml.scheduled_time > NOW() - INTERVAL '7 days'
LEFT JOIN alerts a ON a.parent_id = p.id
LEFT JOIN appointments ap ON ap.parent_id = p.id AND ap.status = 'scheduled'
GROUP BY p.id, p.primary_caregiver_id, parent_name, c.status, c.concern_level;
