import Avatar from "../components/ui/Avatar";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-medium">Comercial demo</span>
          <span className="text-[11px] text-neutral-500">
            Closer / Setter
          </span>
        </div>
        <Avatar initials="AD" />
      </div>
    </header>
  );
}
