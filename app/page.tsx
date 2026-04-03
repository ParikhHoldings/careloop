import Link from "next/link";
import { CheckCircle, Heart, Pill, Calendar, FileText, Users, Bell, ArrowRight, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">CareLoop</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm">How It Works</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</Link>
            <Link href="/auth/sign-in" className="text-gray-600 hover:text-gray-900 text-sm">Sign In</Link>
            <Link href="/auth/sign-up" className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-700">Start Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-4 bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            For the 53 million Americans caring for an aging parent
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Know your parent is okay.<br />
            <span className="text-rose-600">Without the constant worry.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            CareLoop handles the invisible work of caregiving — medication tracking, appointment management, daily check-ins, and keeping your whole family on the same page. You live your life. CareLoop makes sure nothing slips through.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up" className="bg-rose-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-rose-700 transition-colors flex items-center gap-2 justify-center">
              Start Free — No Credit Card <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#how-it-works" className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-300 transition-colors">
              See How It Works
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">Free plan forever · Family plan $19/month · No contracts</p>
        </div>
      </section>

      {/* The weight of it */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The invisible weight you&apos;re carrying</h2>
          <p className="text-gray-600 mb-8">You love your parent. And you&apos;re doing everything you can. But there&apos;s always the background noise:</p>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            {[
              "Did Mom take her 8 PM medication? I didn't check.",
              "When is Dad's cardiology follow-up? I should know this.",
              "My brother thinks everything is fine. I can't get him to help.",
              "There's a Medicare benefit she qualifies for — I just don't have time to look it up.",
              "I know we need to talk about driving. I don't know how to start.",
              "If something happens while I'm traveling, I don't even know where her advance directive is.",
            ].map((worry, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-rose-100 flex items-start gap-3">
                <span className="text-rose-400 shrink-0">😔</span>
                <p className="text-gray-700 text-sm italic">&quot;{worry}&quot;</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-8 font-medium">CareLoop doesn&apos;t eliminate the caring. It eliminates the chaos.</p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How CareLoop works</h2>
            <p className="text-gray-600">One 10-minute setup. Then CareLoop handles the rest.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { step: "1", title: "Set Up Your Parent&apos;s Profile", desc: "Add their medications, doctors, key contacts, and documents. CareLoop becomes the one place everything lives." },
              { step: "2", title: "CareLoop Checks In Daily", desc: "A gentle SMS or voice check-in goes to your parent each day. If anything sounds off, you&apos;re alerted. If everything is fine, you get a quiet ✓." },
              { step: "3", title: "You Stay Informed", desc: "Missed medication? Alert. Doctor appointment tomorrow? Reminder. Sibling update? In the family feed — not a chaotic group text." },
            ].map((s) => (
              <div key={s.step}>
                <div className="w-10 h-10 bg-rose-600 text-white rounded-xl flex items-center justify-center text-lg font-bold mb-4">{s.step}</div>
                <h3 className="font-semibold text-gray-900 mb-2" dangerouslySetInnerHTML={{ __html: s.title }} />
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14"><h2 className="text-3xl font-bold text-gray-900 mb-4">Everything in one place</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Pill className="w-6 h-6 text-rose-600" />, title: "Medication Tracking", desc: "Schedule all medications. Reminders go to your parent via SMS or voice call. If a dose is missed, you know within the hour — not the next day." },
              { icon: <Calendar className="w-6 h-6 text-rose-600" />, title: "Appointment Manager", desc: "All doctors, all appointments, in one calendar. Pre-appointment prep notes. Post-appointment summary capture ('what did the doctor say?')." },
              { icon: <Bell className="w-6 h-6 text-rose-600" />, title: "Daily Check-In", desc: "Simple daily SMS or voice check-in to your parent. AI flags anything concerning in their response. You get a quiet ✓ if all is well." },
              { icon: <FileText className="w-6 h-6 text-rose-600" />, title: "Document Vault", desc: "Insurance cards, advance directives, medication lists, power of attorney, Medicare info — all stored, accessible in an emergency." },
              { icon: <Users className="w-6 h-6 text-rose-600" />, title: "Family Coordination", desc: "Shared dashboard for all siblings. Task assignments. Update feed. No more 'I thought you were handling that' or chaotic group texts." },
              { icon: <Shield className="w-6 h-6 text-rose-600" />, title: "Benefits Finder", desc: "AI surfaces unclaimed Medicare benefits, Medicaid programs, local assistance, and caregiver tax credits most families don&apos;t know about." },
            ].map((f) => (
              <div key={f.title} className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                <div className="mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: f.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, fair pricing</h2>
          <p className="text-gray-600 mb-12">Less than one Instacart delivery a month. For peace of mind that can&apos;t be priced.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Free", price: "$0", period: "forever", features: ["1 parent profile", "Basic medication reminders", "30-day check-in history", "Document vault (5 files)", "No sibling sharing"], cta: "Start Free", hi: false },
              { name: "Family", price: "$19", period: "per month", features: ["Unlimited check-ins", "Full document vault", "Sibling sharing (up to 5)", "Benefits finder", "Appointment manager", "Email + SMS alerts"], cta: "Start Free Trial", hi: true },
              { name: "Premium", price: "$29", period: "per month", features: ["Everything in Family", "AI anomaly detection", "Conversation guide scripts", "Care coordinator mode", "Priority support", "Caregiver burnout check-ins"], cta: "Start Free Trial", hi: false },
            ].map((plan) => (
              <div key={plan.name} className={`p-8 rounded-2xl border ${plan.hi ? "border-rose-500 bg-rose-600 shadow-lg scale-105" : "border-gray-200 bg-white"}`}>
                <div className={`text-sm font-semibold mb-2 ${plan.hi ? "text-rose-200" : "text-gray-500"}`}>{plan.name}</div>
                <div className={`text-4xl font-bold mb-1 ${plan.hi ? "text-white" : "text-gray-900"}`}>{plan.price}</div>
                <div className={`text-sm mb-6 ${plan.hi ? "text-rose-200" : "text-gray-500"}`}>{plan.period}</div>
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${plan.hi ? "text-rose-200" : "text-green-500"}`} />
                      <span className={`text-sm ${plan.hi ? "text-rose-100" : "text-gray-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/sign-up" className={`block text-center py-3 rounded-xl font-semibold ${plan.hi ? "bg-white text-rose-600 hover:bg-rose-50" : "bg-gray-900 text-white hover:bg-gray-800"}`}>{plan.cta}</Link>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6">$149/year for Family plan (save 35%) · No contracts · Cancel anytime</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-rose-700">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Your parent deserves to be looked after. So do you.</h2>
          <p className="text-rose-200 mb-8">Free plan forever. Set up in 10 minutes.</p>
          <Link href="/auth/sign-up" className="inline-flex items-center gap-2 bg-white text-rose-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-rose-50">
            Start Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-rose-600 rounded flex items-center justify-center"><Heart className="w-3 h-3 text-white" /></div>
            <span className="text-white font-semibold">CareLoop</span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="#how-it-works" className="hover:text-white">How It Works</Link>
            <Link href="#pricing" className="hover:text-white">Pricing</Link>
            <Link href="/auth/sign-up" className="hover:text-white">Start Free</Link>
          </div>
          <div className="text-sm">© 2026 CareLoop. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
