import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Download,
  FileText,
  Heart,
  MessageCircleWarning,
  ShieldCheck,
  Users,
} from "lucide-react";

const painPoints = [
  "One sibling has the whole mental load while everyone else gets fragments.",
  "Medication changes, doctor notes, and appointment dates disappear into text threads.",
  "Everyone wants to help, but nobody knows what was done, what is next, or what changed.",
  "The important documents are somewhere — just not where the family needs them in a stressful moment.",
];

const betaSignals = [
  "Daily parent status update",
  "Shared sibling task list",
  "Appointment notes in one timeline",
  "Medication and document inventory",
  "Simple weekly care summary",
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#fffaf7] text-slate-950">
      <nav className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-600 text-white">
              <Heart className="h-4 w-4" />
            </div>
            <span className="text-lg font-black tracking-tight">CareLoop</span>
          </div>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="#problem" className="hover:text-slate-950">Problem</Link>
            <Link href="#beta" className="hover:text-slate-950">Beta</Link>
            <Link href="#kit" className="hover:text-slate-950">Free kit</Link>
            <Link href="/auth/sign-up" className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-800">
              Join beta
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm">
            <MessageCircleWarning className="h-4 w-4" />
            For families caring for an aging parent together
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Your family group chat is not a care plan.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-700">
            CareLoop gives adult children one shared place for parent status, tasks, appointments, medication notes, documents, and sibling updates — so one person is not carrying the whole invisible load.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/auth/sign-up" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-700">
              Join the private beta <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="/family-care-meeting-kit" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-7 py-4 text-base font-bold text-slate-800 transition hover:border-slate-300">
              Get the free care meeting kit <Download className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Validation beta: no credit card. Built for families coordinating care, not providers managing charts.
          </p>
        </div>

        <div className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-2xl shadow-orange-100">
          <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-rose-200">Today&apos;s parent status</p>
                <h2 className="text-2xl font-black">Mom is okay</h2>
              </div>
              <div className="rounded-full bg-emerald-400/20 px-3 py-1 text-sm font-bold text-emerald-200">Checked in</div>
            </div>
            <div className="space-y-3">
              {[
                ["8:10 AM", "Morning meds confirmed", "quiet"],
                ["11:45 AM", "Dr. Patel follow-up moved to Thursday", "update"],
                ["2:30 PM", "Lisa added grocery run task", "task"],
                ["5:15 PM", "New note: more tired than usual", "watch"],
              ].map(([time, text, tag]) => (
                <div key={time} className="rounded-2xl bg-white/10 p-4">
                  <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                    <span>{time}</span><span className="uppercase tracking-wide">{tag}</span>
                  </div>
                  <p className="font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              [Users, "4 family members"],
              [ClipboardList, "7 open tasks"],
              [CalendarDays, "2 appointments"],
              [FileText, "12 documents"],
            ].map(([Icon, label]) => {
              const TypedIcon = Icon as typeof Users;
              return (
                <div key={label as string} className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm font-bold text-slate-700">
                  <TypedIcon className="mb-2 h-5 w-5 text-rose-600" />
                  {label as string}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="problem" className="bg-white px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-rose-600">The real job</p>
            <h2 className="text-4xl font-black tracking-tight text-slate-950">Not eldercare software. Family coordination when life gets messy.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {painPoints.map((point) => (
              <div key={point} className="rounded-3xl border border-slate-100 bg-[#fffaf7] p-6 shadow-sm">
                <CheckCircle2 className="mb-4 h-6 w-6 text-rose-600" />
                <p className="text-lg font-semibold leading-7 text-slate-800">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beta" className="px-4 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-rose-600">Private beta</p>
            <h2 className="text-4xl font-black tracking-tight">We are testing one narrow loop.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              The beta is for 5–10 families who are already coordinating care for a parent and want less chaos this month — not a someday platform with every healthcare integration under the sun.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-orange-100">
            <h3 className="mb-5 text-2xl font-black">What the first version helps with</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {betaSignals.map((signal) => (
                <div key={signal} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4 font-semibold text-slate-700">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                  {signal}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-rose-50 p-5 text-rose-950">
              <p className="font-bold">Success bar for continuing:</p>
              <p className="mt-1 text-sm leading-6">3 families still active after 4 weeks, 2 willing to pay $19/month, and at least one family invites 2+ relatives.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="kit" className="bg-slate-950 px-4 py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_.9fr]">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-rose-300">Free lead magnet</p>
            <h2 className="text-4xl font-black tracking-tight">Start with the Family Care Meeting Kit.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              A practical printable kit for getting siblings aligned: parent snapshot, medication list, appointment tracker, document inventory, task ownership, and the first 30-day care plan.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 text-slate-950">
            <h3 className="text-2xl font-black">Download the kit</h3>
            <p className="mt-3 text-slate-600">Use it immediately, then join the beta if your family needs a shared live version.</p>
            <a href="/family-care-meeting-kit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 px-7 py-4 font-bold text-white hover:bg-rose-700">
              Open printable kit <Download className="h-5 w-5" />
            </a>
            <Link href="/auth/sign-up" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 px-7 py-4 font-bold text-slate-800 hover:border-slate-300">
              Join the beta waitlist <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
