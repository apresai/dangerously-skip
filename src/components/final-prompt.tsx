export function FinalPrompt() {
  return (
    <div className="my-16 border border-gray-900 rounded-lg p-8 bg-gray-900 text-gray-100">
      <p className="font-mono text-sm text-terminal-green mb-4">
        {"//"} no skip available
      </p>
      <p className="font-mono text-sm leading-relaxed">
        This one you have to read.
        <br />
        There is no <span className="text-terminal-amber">--dangerously-skip</span> for the things
        that matter.
      </p>
    </div>
  );
}
