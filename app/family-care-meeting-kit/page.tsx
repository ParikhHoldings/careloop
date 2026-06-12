export default function FamilyCareMeetingKit() {
  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-10 text-slate-950 print:bg-white print:px-0 print:py-0">
      <div className="mx-auto max-w-4xl">
        <header className="rounded-[2rem] border border-rose-200 bg-white p-9 shadow-xl shadow-rose-100 print:rounded-none print:shadow-none">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-rose-600">CareLoop free worksheet</p>
          <h1 className="mt-3 text-5xl font-black leading-none tracking-tight sm:text-6xl">Family Care Meeting Kit</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            A practical starter kit for adult children coordinating care for an aging parent. Use this to get siblings aligned before the next crisis, appointment, or “wait, who was handling that?” moment.
          </p>
          <p className="mt-5 text-sm font-semibold text-slate-500 print:hidden">Use your browser&apos;s Print / Save as PDF command to save a copy.</p>
        </header>

        <WorksheetSection title="1. Parent Snapshot">
          <div className="grid gap-4 sm:grid-cols-2">
            {["Parent name", "Primary caregiver / point person", "Preferred hospital / clinic", "Primary doctor", "Emergency contact", "Insurance / Medicare notes"].map((field) => (
              <BlankField key={field} label={field} />
            ))}
          </div>
          <TextAreaBlock label="What changed recently?" />
        </WorksheetSection>

        <WorksheetSection title="2. Medication List">
          <Table headers={["Medication", "Dose", "When", "Prescriber", "Notes / side effects"]} rows={4} />
          <Callout>Bring this to every appointment. Medication confusion is where family coordination quietly turns expensive.</Callout>
        </WorksheetSection>

        <WorksheetSection title="3. Appointments + Follow-Ups">
          <Table headers={["Date", "Doctor / office", "Purpose", "Who attends?", "Follow-up tasks"]} rows={3} />
        </WorksheetSection>

        <WorksheetSection title="4. Important Documents Inventory">
          <Table headers={["Document", "Where it lives", "Who can access it?", "Needs update?"]} rows={["Insurance cards", "Medication list", "Advance directive", "Power of attorney", "Doctor contact list"]} />
        </WorksheetSection>

        <WorksheetSection title="5. Family Roles">
          <p className="mb-4 text-slate-600">Do not leave “helping” vague. Assign names to responsibilities.</p>
          <Table headers={["Responsibility", "Owner", "Backup", "Frequency"]} rows={["Doctor appointments", "Medication refills", "Groceries / errands", "Finance / bills check-in", "Weekly family update"]} />
        </WorksheetSection>

        <WorksheetSection title="6. First 30-Day Care Plan">
          <div className="grid gap-4 sm:grid-cols-2">
            {["This week", "Next week", "This month", "Watch list"].map((label) => <TextAreaBlock key={label} label={label} />)}
          </div>
          <Callout>If this worksheet immediately exposes chaos, CareLoop is being built for families like yours: one shared place for parent status, tasks, documents, appointments, and updates.</Callout>
        </WorksheetSection>
      </div>
    </main>
  );
}

function WorksheetSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-6 rounded-3xl border border-rose-100 bg-white p-7 print:break-inside-avoid print:rounded-none"> <h2 className="mb-5 text-3xl font-black tracking-tight">{title}</h2>{children}</section>;
}

function BlankField({ label }: { label: string }) {
  return <div><label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-600">{label}</label><div className="h-12 rounded-xl border border-slate-200 bg-slate-50" /></div>;
}

function TextAreaBlock({ label }: { label: string }) {
  return <div className="mt-4"><label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-600">{label}</label><div className="h-28 rounded-xl border border-slate-200 bg-slate-50" /></div>;
}

function Table({ headers, rows }: { headers: string[]; rows: number | string[] }) {
  const labels = Array.isArray(rows) ? rows : Array.from({ length: rows }, () => "");
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-rose-50 text-xs uppercase tracking-widest text-slate-600"><tr>{headers.map((h) => <th key={h} className="border-b border-slate-200 p-3">{h}</th>)}</tr></thead>
        <tbody>{labels.map((label, rowIndex) => <tr key={`${label}-${rowIndex}`}>{headers.map((h, colIndex) => <td key={h} className="h-12 border-b border-r border-slate-100 p-3 last:border-r-0">{colIndex === 0 ? label : ""}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 rounded-2xl border-l-4 border-rose-600 bg-rose-50 p-4 font-semibold text-rose-950">{children}</p>;
}
