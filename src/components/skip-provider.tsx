"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type SkipContextType = {
  hasSkipped: boolean;
  skip: () => void;
  permissionsApproved: string[];
  approvePermission: (id: string) => void;
  hasApproved: (id: string) => boolean;
};

const SkipContext = createContext<SkipContextType | null>(null);

export function SkipProvider({ children }: { children: ReactNode }) {
  const [hasSkipped, setHasSkipped] = useState(false);
  const [permissionsApproved, setPermissionsApproved] = useState<string[]>([]);

  const skip = useCallback(() => setHasSkipped(true), []);

  const approvePermission = useCallback(
    (id: string) =>
      setPermissionsApproved((prev) =>
        prev.includes(id) ? prev : [...prev, id]
      ),
    []
  );

  const hasApproved = useCallback(
    (id: string) => hasSkipped || permissionsApproved.includes(id),
    [hasSkipped, permissionsApproved]
  );

  return (
    <SkipContext value={{ hasSkipped, skip, permissionsApproved, approvePermission, hasApproved }}>
      {children}
    </SkipContext>
  );
}

export function useSkip() {
  const ctx = useContext(SkipContext);
  if (!ctx) throw new Error("useSkip must be used within SkipProvider");
  return ctx;
}
