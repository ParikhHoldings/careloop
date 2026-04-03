import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Heart, Pill, Calendar, FileText, Users, Bell, ArrowRight, CheckCircle } from "lucide-react";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/auth/sign-in");
  const user = await currentUser();
  const firstName = user?.firstName || "there";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center"><Heart className="w-4 h-4 text-white" /></div><span className="font-bold text-gray-900">CareLoop</span></div>
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/parents" className="text-gray-600 hover:text-gray-900 flex items-center gap-1"><Heart className="w-4 h-4" />Parents</Link>
            <Link href="/medications" className="text-gray-600 hover:text-gray-900 flex items-center gap-1"><Pill className="w-4 h-4" />Medications</Link>
            <Link href="/documents" className="text-gray-600 hover:text-gray-900 flex items-center gap-1"><FileText className="w-4 h-4" />Documents</Link>
            <Link href="/family" className="text-gray-600 hover:text-gray-900 flex items-center gap-1"><Users className="w-4 h-4" />Family</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Hi {firstName} 👋</h1>
          <p className="text-gray-600 mt-1">Here&apos;s what needs your attention today.</p>
        </div>

        {/* Today's status */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Check-Ins Today", value: "—", icon: <CheckCircle className="w-5 h-5 text-green-500" />, note: "No parents added yet" },
            { label: "Medications Due", value: "—", icon: <Pill className="w-5 h-5 text-rose-500" />, note: "" },
            { label: "Appointments", value: "—", icon: <Calendar className="w-5 h-5 text-blue-500" />, note: "This week" },
            { label: "Alerts", value: "0", icon: <Bell className="w-5 h-5 text-orange-500" />, note: "All clear" },
          ].map((s) => (
            <div key={s.label} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2"><span className="text-xs text-gray-500">{s.label}</span>{s.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              {s.note && <div className="text-xs text-gray-400 mt-1">{s.note}</div>}
            </div>
          ))}
        </div>

        {/* Setup CTA */}
        <div className="bg-rose-600 rounded-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">Add your first parent profile</h2>
              <p className="text-rose-200 text-sm">Set up their medications, doctors, and documents. CareLoop will start checking in on them daily.</p>
            </div>
            <Link href="/parents" className="shrink-0 inline-flex items-center gap-2 bg-white text-rose-600 px-6 py-3 rounded-xl font-semibold hover:bg-rose-50">
              Add Parent <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Add Medication", desc: "Track a prescription or OTC medication", href: "/medications", icon: <Pill className="w-5 h-5 text-rose-500" /> },
            { title: "Upload Document", desc: "Insurance card, advance directive, med list", href: "/documents", icon: <FileText className="w-5 h-5 text-blue-500" /> },
            { title: "Invite Family", desc: "Add siblings to the shared dashboard", href: "/family", icon: <Users className="w-5 h-5 text-green-500" /> },
          ].map((a) => (
            <Link key={a.title} href={a.href} className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow flex items-start gap-3">
              <div className="mt-0.5">{a.icon}</div>
              <div>
                <div className="font-semibold text-sm text-gray-900">{a.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
