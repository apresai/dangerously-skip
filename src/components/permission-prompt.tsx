"use client";

import { useState } from "react";
import { useSkip } from "./skip-provider";

type PermissionPromptProps = {
  id: string;
  message: string;
  allowLabel?: string;
  denyLabel?: string;
  onAllow?: () => void;
  onDeny?: () => void;
  children: React.ReactNode;
  noSkip?: boolean;
};

export function PermissionPrompt({
  id,
  message,
  allowLabel = "Allow",
  denyLabel = "Deny",
  onAllow,
  onDeny,
  children,
  noSkip = false,
}: PermissionPromptProps) {
  const { hasApproved, approvePermission } = useSkip();
  const [denied, setDenied] = useState(false);

  const isApproved = !noSkip && hasApproved(id);

  if (isApproved) {
    return <>{children}</>;
  }

  if (denied) {
    return (
      <div className="my-12 mx-auto max-w-2xl">
        <div className="border border-border-subtle rounded-lg p-6 bg-surface font-mono text-sm">
          <p className="text-terminal-dim mb-4">Permission denied. Good. That&apos;s the whole point.</p>
          <button
            onClick={() => {
              setDenied(false);
              approvePermission(id);
              onAllow?.();
            }}
            className="text-terminal-green hover:underline cursor-pointer"
          >
            Changed your mind? [Allow]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-12 mx-auto max-w-2xl">
      <div className="border border-border-subtle rounded-lg p-6 bg-surface">
        <p className="font-mono text-sm text-terminal-dim mb-4">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              approvePermission(id);
              onAllow?.();
            }}
            className="px-4 py-2 bg-terminal-green/10 text-terminal-green border border-terminal-green/30 rounded font-mono text-sm hover:bg-terminal-green/20 transition-colors cursor-pointer"
          >
            {allowLabel}
          </button>
          <button
            onClick={() => {
              setDenied(true);
              onDeny?.();
            }}
            className="px-4 py-2 bg-gray-100 text-gray-600 border border-gray-200 rounded font-mono text-sm hover:bg-gray-200 transition-colors cursor-pointer"
          >
            {denyLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
