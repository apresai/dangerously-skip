export function ConceptBox({
  title,
  command,
  children,
}: {
  title: string;
  command: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-10">
      <div className="px-4 py-2.5 bg-gray-800 border-b border-gray-700 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-green-500/60" />
        <span className="font-mono text-xs text-gray-400 ml-2">{title}</span>
      </div>
      <div className="px-6 pt-4 font-mono text-xs text-terminal-dim">
        $ {command}
      </div>
      <div className="px-6 py-4 font-mono text-sm text-gray-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
