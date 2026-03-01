"use client";

import Link from "next/link";
import { useSkip } from "./skip-provider";

type PageNavProps = {
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
  promptMessage?: string;
};

export function PageNav({ prev, next, promptMessage }: PageNavProps) {
  const { hasSkipped } = useSkip();

  return (
    <div className="border-t border-border-subtle mt-16 pt-8">
      <div className="flex justify-between items-center">
        {prev ? (
          <Link
            href={prev.href}
            className="font-mono text-sm text-terminal-dim hover:text-gray-900 transition-colors"
          >
            &larr; {prev.label}
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <div className="text-right">
            {!hasSkipped && promptMessage && (
              <span className="font-mono text-xs text-terminal-dim block mb-2">
                {promptMessage}
              </span>
            )}
            <Link
              href={next.href}
              className="font-mono text-sm text-terminal-green hover:underline transition-colors"
            >
              {next.label} &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
