"use client";

import { useSkip } from "./skip-provider";

export function SkipPrompt() {
  const { hasSkipped, skip } = useSkip();

  if (hasSkipped) return null;

  return (
    <div className="my-16 mx-auto max-w-2xl">
      <div className="border border-terminal-amber/30 rounded-lg p-8 bg-terminal-amber/5">
        <p className="font-mono text-sm text-gray-700 mb-2">
          You&apos;ve read what happened when I stopped checking.
        </p>
        <p className="font-mono text-sm text-gray-700 mb-6">
          Do you want to skip the safety checks too?
        </p>
        <div className="font-mono text-sm text-terminal-dim mb-6 bg-gray-900 text-gray-300 rounded px-4 py-3">
          $ claude --dangerously-skip-permissions
        </div>
        <div className="flex gap-3">
          <button
            onClick={skip}
            className="px-4 py-2 bg-terminal-amber/10 text-terminal-amber border border-terminal-amber/30 rounded font-mono text-sm hover:bg-terminal-amber/20 transition-colors cursor-pointer"
          >
            Yes, skip
          </button>
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-terminal-green/10 text-terminal-green border border-terminal-green/30 rounded font-mono text-sm hover:bg-terminal-green/20 transition-colors cursor-pointer"
          >
            No, keep asking me
          </button>
        </div>
      </div>
    </div>
  );
}
