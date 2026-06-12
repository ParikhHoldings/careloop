# CareLoop Progress

## 2026-06-12 — Validation landing sprint

### Current goal
Execute validation steps 1–3: name/trademark sanity check, validation landing page, and lead magnet.

### Completed this cycle
- Repositioned the landing page around the validation wedge: “Your family group chat is not a care plan.”
- Shifted CTA from broad SaaS promise to private beta + free care meeting kit.
- Created printable lead magnet route at `/family-care-meeting-kit`.
- Fixed Clerk middleware matcher so the public validation landing page and lead magnet route do not 500 without Clerk env vars.
- Verified 7,000-user market-capture math: 7,000 out of 59M caregivers is `0.011864407%`, not `0.000118644%` as a percentage.
- Ran production build successfully and smoke-tested `/` plus `/family-care-meeting-kit` with HTTP 200 responses.

### In progress
- Decide whether to keep CareLoop as working title or rename before public traffic.

### Next steps
- Wire real email capture / analytics before sending public traffic.
- Add alternate brand-name shortlist if we choose to rename before launch.

### Risks / decisions
- `CareLoop` should be treated as a working title until legal/trademark review. The Cariloop proximity is not theoretical.
- Plain `npm install` previously failed due Clerk/Next peer conflict; current build uses existing installed dependency state until dependency cleanup.
