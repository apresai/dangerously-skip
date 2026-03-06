"use client";

import { useSkip } from "./skip-provider";

export function FinalPrompt() {
  const { hasSkipped } = useSkip();

  return (
    <div className="my-16 border border-gray-900 rounded-lg p-8 bg-gray-900 text-gray-100">
      <p className="font-mono text-sm text-terminal-green mb-4">
        {"//"} no skip available
      </p>
      {hasSkipped ? (
        <>
          <p className="font-mono text-sm leading-relaxed mb-3">
            You skipped the check on page two. You&apos;ve been reading unverified
            content ever since.
          </p>
          <p className="font-mono text-sm leading-relaxed">
            There is no <span className="text-terminal-amber">--dangerously-skip</span> for
            the things that matter.
            <br />
            But you already knew that. You just didn&apos;t stop.
          </p>
        </>
      ) : (
        <>
          <p className="font-mono text-sm leading-relaxed mb-3">
            You read every check. You approved every prompt.
          </p>
          <p className="font-mono text-sm leading-relaxed">
            This one you have to read.
            <br />
            There is no <span className="text-terminal-amber">--dangerously-skip</span> for
            the things that matter.
          </p>
        </>
      )}
    </div>
  );
}
