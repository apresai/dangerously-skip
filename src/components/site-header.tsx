"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "home" },
  { href: "/move-fast", label: "move fast" },
  { href: "/the-skip", label: "the skip" },
  { href: "/the-anthropic-bet", label: "the anthropic bet" },
  { href: "/surviving-our-adolescence", label: "surviving" },
  { href: "/podcasts", label: "podcasts" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border-subtle">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-bold tracking-tight hover:text-terminal-green transition-colors">
          $ dangerously-skip
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-mono text-xs transition-colors ${
                pathname === href
                  ? "text-gray-900 font-semibold"
                  : "text-terminal-dim hover:text-gray-900"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  return (
    <details className="md:hidden relative">
      <summary className="font-mono text-xs text-terminal-dim cursor-pointer list-none">
        [menu]
      </summary>
      <div className="absolute right-0 top-8 bg-white border border-border-subtle rounded-lg shadow-lg p-4 z-50 min-w-48">
        {nav.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`block py-2 font-mono text-xs transition-colors ${
              pathname === href
                ? "text-gray-900 font-semibold"
                : "text-terminal-dim hover:text-gray-900"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </details>
  );
}
