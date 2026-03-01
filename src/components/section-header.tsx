type SectionHeaderProps = {
  tag: string;
  title: string;
};

export function SectionHeader({ tag, title }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <span className="font-mono text-xs text-terminal-dim block mb-2">
        {"//"} {tag}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}
