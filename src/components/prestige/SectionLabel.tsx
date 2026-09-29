import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <div
      className={cn("text-label mb-10 flex items-center gap-4 opacity-100", className)}
      aria-hidden="true"
    >
      <span className="w-8 h-[1px] bg-prestige-gold/40" />
      {label}
    </div>
  );
}
