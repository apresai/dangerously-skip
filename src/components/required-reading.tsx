"use client";

import { useState } from "react";

export function RequiredReading() {
  const [acknowledged, setAcknowledged] = useState(false);

  if (acknowledged) return null;

  return (
    <div className="my-12 border border-border-subtle rounded-lg p-6 bg-surface">
      <div className="font-mono text-sm">
        <p className="text-terminal-dim mb-4">
          Claude recommends required reading before proceeding.
        </p>
        <p className="text-gray-700 mb-6">
          Dario Amodei&apos;s essay{" "}
          <a
            href="https://www.darioamodei.com/essay/the-adolescence-of-technology"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-green hover:underline"
          >
            &ldquo;The Adolescence of Technology&rdquo;
          </a>
        </p>
        <div className="flex gap-3">
          <a
            href="https://www.darioamodei.com/essay/the-adolescence-of-technology"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-terminal-green/10 text-terminal-green border border-terminal-green/30 rounded font-mono text-sm hover:bg-terminal-green/20 transition-colors"
          >
            Read it
          </a>
          <button
            onClick={() => setAcknowledged(true)}
            className="px-4 py-2 bg-gray-100 text-gray-600 border border-gray-200 rounded font-mono text-sm hover:bg-gray-200 transition-colors cursor-pointer"
          >
            I already have
          </button>
        </div>
      </div>
    </div>
  );
}
