"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const articleSlugs = [
  "/move-fast",
  "/the-skip",
  "/the-anthropic-bet",
  "/surviving-our-adolescence",
];

export function ReadingProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  const isArticle = articleSlugs.includes(pathname);

  useEffect(() => {
    if (!isArticle) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isArticle]);

  if (!isArticle) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none">
      <div
        className="h-full bg-terminal-green transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
