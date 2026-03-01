import Link from "next/link";

type NavCardProps = {
  href: string;
  title: string;
  hook: string;
  index: number;
};

export function NavCard({ href, title, hook, index }: NavCardProps) {
  return (
    <Link
      href={href}
      className="group block border border-border-subtle rounded-lg p-6 hover:border-gray-400 transition-all hover:shadow-sm"
    >
      <span className="font-mono text-xs text-terminal-dim block mb-2">
        [{String(index).padStart(2, "0")}]
      </span>
      <h3 className="text-lg font-bold mb-2 group-hover:text-terminal-green transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{hook}</p>
    </Link>
  );
}
