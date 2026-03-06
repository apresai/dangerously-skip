type Variant = "default" | "amber" | "green";

const variantStyles: Record<Variant, { border: string; bg: string }> = {
  default: { border: "border-gray-900", bg: "bg-surface" },
  amber: { border: "border-terminal-amber", bg: "bg-terminal-amber/5" },
  green: { border: "border-terminal-green", bg: "bg-terminal-green/5" },
};

export function Pullquote({
  children,
  variant = "default",
  attribution,
}: {
  children: React.ReactNode;
  variant?: Variant;
  attribution?: string;
}) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`border-l-[3px] ${styles.border} ${styles.bg} mx-0 md:mx-[-2rem] px-6 md:px-8 py-6 my-10 rounded-r-sm`}
    >
      <span className="font-mono text-xs text-terminal-dim block mb-3">
        {"//"} pullquote
      </span>
      <p className="text-lg md:text-xl font-medium leading-snug tracking-tight text-gray-900">
        {children}
      </p>
      {attribution && (
        <span className="font-mono text-xs text-terminal-dim block mt-3">
          — {attribution}
        </span>
      )}
    </div>
  );
}
