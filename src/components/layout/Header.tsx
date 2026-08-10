export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      
      <div>
        <h2 className="text-lg font-semibold text-white">
          DBA AI Studio
        </h2>

        <p className="text-xs text-slate-500">
          Database Administration & AI Platform
        </p>
      </div>

      <div className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400">
        Local Environment
      </div>

    </header>
  );
}