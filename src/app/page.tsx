import { NavCard } from "@/components/nav-card";

const pages = [
  {
    href: "/move-fast",
    title: "Move Fast",
    hook: "Why every organization is racing to ship AI, and what happens when speed outruns accuracy.",
  },
  {
    href: "/the-skip",
    title: "The Skip",
    hook: "The personal journey from cautious user to --dangerously-skip-permissions.",
  },
  {
    href: "/the-anthropic-bet",
    title: "The Anthropic Bet",
    hook: "Why safety isn't a brake — it's the engineering that lets you go faster without crashing.",
  },
  {
    href: "/surviving-our-adolescence",
    title: "Surviving Our Adolescence",
    hook: "How did you do it? How did you survive your adolescence?",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="font-mono text-xs text-terminal-dim mb-4">
              $ claude code
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.95]">
              <span className="font-mono text-terminal-green">--</span>dangerously
              <br />
              skip
              <span className="font-mono text-terminal-green">-</span>permissions
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed mt-8">
            We built safety checks for a reason.
          </p>
        </div>
      </section>

      {/* The Hook */}
      <section className="px-6 pb-16">
        <div className="max-w-[65ch] mx-auto prose-custom">
          <p>
            The first time Claude Code asked me &ldquo;Can I modify this file?&rdquo;, I read the prompt
            carefully. By the hundredth time, I was already reaching for yes. By the thousandth, I went
            looking for a way to stop it from asking. I found{" "}
            <code>--dangerously-skip-permissions</code>. I haven&apos;t looked back.
            I&apos;ve also made bigger mistakes than I ever did before.
          </p>
          <p>
            This is a site about that moment — the moment you decide you trust the machine more than
            you trust the process. It&apos;s about Amazon, where every team is using AI and Jassy says
            it&apos;s transforming everything. It&apos;s about Anthropic, who built the AI I use every day and
            refuses to let me skip the checks that actually matter. And it&apos;s about a question from a
            movie about first contact: <em>How did you do it? How did you survive your adolescence?</em>
          </p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-xs text-terminal-dim mb-6">
            {"//"} table of contents
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {pages.map((page, i) => (
              <NavCard key={page.href} {...page} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-xs text-terminal-dim mb-6">
            {"//"} listen
          </div>
          <NavCard
            href="/podcasts"
            title="Podcasts"
            hook="Two conversations based on Dario Amodei's essays — on AI's radical upside and humanity's technological adolescence."
            index={5}
          />
        </div>
      </section>
    </div>
  );
}
