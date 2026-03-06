import { ArticleLayout } from "@/components/article-layout";
import { SectionHeader } from "@/components/section-header";
import { Pullquote } from "@/components/pullquote";
import { AnimateIn } from "@/components/animate-in";
import { PageNav } from "@/components/page-nav";

export const metadata = {
  title: "Move Fast — dangerously skip",
  description: "Why every organization is racing to ship AI, and what happens when speed outruns accuracy.",
};

export default function MoveFast() {
  return (
    <ArticleLayout>
      <span className="font-mono text-xs text-terminal-dim block mb-4">
        Read(&quot;move-fast&quot;)
      </span>
      <span className="font-mono text-xs text-terminal-dim block mb-1">
        {"//"} article 1 of 4 · 2 min read
      </span>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
        Move Fast
      </h1>
      <p className="text-gray-500 text-lg mb-12">
        The Amazon story
      </p>

      <SectionHeader tag="customer-obsession" title="Customer Obsession Meets AI" />
      <p>
        At Amazon, AI isn&apos;t a department. It&apos;s every department. Fulfillment centers run on it.
        AWS builds tools around it. Every team, in one form or another, is using AI to move faster.
        Jassy has said as much publicly. This isn&apos;t hype — it&apos;s operational reality.
      </p>
      <p>
        When the CEO of one of the world&apos;s largest technology companies says AI is transforming
        how they work, people listen. But what does &ldquo;transforming&rdquo; actually look like on the ground?
        It looks like speed. Unprecedented, intoxicating speed. The kind of speed that makes you
        feel like you&apos;re finally working the way you were meant to. The kind that makes you forget
        why you had guardrails in the first place.
      </p>

      <SectionHeader tag="the-fire-drill" title="The Fire Drill" />
      <p>
        Here&apos;s a story about that speed.
      </p>
      <p>
        Someone on my team used AI to summarize feedback from our team for an internal business
        report. After ten years of writing these reports, trust me — I&apos;ll take the help. But the
        AI mixed signals from another workstream into the summary, and what came out painted a
        picture of customers in pain that didn&apos;t match reality.
      </p>
      <p>
        Amazon takes security seriously. Very seriously. And &ldquo;customers in pain&rdquo; gets attention
        fast. Leadership engaged. Resources started mobilizing. We were heading down the path of
        solving a problem for a customer who never reported one.
      </p>
      <p>
        Then the correction: <em>Sorry, that wasn&apos;t accurate. The summary was wrong.</em>
      </p>
      <p>
        The customer never knew. It was entirely internal — a simple business report with bad
        context. A wasted cycle. A few red faces in a meeting room. That&apos;s all it was.
      </p>
      <p>
        And that&apos;s exactly why the system works. Amazon&apos;s culture of escalation caught it.
        Humans were in the loop. The process did what processes are supposed to do.
      </p>

      <SectionHeader tag="the-near-miss" title="The Lesson" />
      <p>
        The story isn&apos;t that something went wrong — it&apos;s that the humans-in-the-loop system
        worked. Amazon&apos;s process caught the error before it reached a customer. That&apos;s what
        good organizational design looks like.
      </p>
      <p>
        But it does show why we need to be thoughtful about risk when using AI. A routine internal
        report — the kind I&apos;ve written hundreds of — nearly triggered an unnecessary escalation
        because AI-generated content was plausible enough to pass a first read.
      </p>
      <p>
        Now imagine that same dynamic in systems where there aren&apos;t ten years of institutional
        muscle memory to catch mistakes. Medical diagnosis. Criminal sentencing. Military targeting.
        The speed that makes AI useful is the same speed that demands we keep humans in the loop.
      </p>

      <AnimateIn>
        <Pullquote>
          The speed that makes AI useful is the same speed that demands we keep humans in the loop.
        </Pullquote>
      </AnimateIn>

      <SectionHeader tag="speed-is-the-product" title="Speed Is the Product" />
      <p>
        Here&apos;s the uncomfortable truth: organizations don&apos;t reward caution. They reward velocity.
        AI is the ultimate velocity tool. Asking people to slow down and verify is asking them to
        be less competitive. That&apos;s not a technology problem. That&apos;s a human one.
      </p>
      <p>
        Every metric that matters — time to market, tickets resolved, decisions made — gets better
        when you go faster. Nobody gets promoted for the disaster they prevented. Nobody gets a
        performance review that says &ldquo;took an extra two hours to verify AI output, avoided a
        false escalation.&rdquo; The incentives all point one direction: ship it.
      </p>

      <AnimateIn>
        <Pullquote variant="amber">
          Nobody gets promoted for the disaster they prevented.
        </Pullquote>
      </AnimateIn>

      <p>
        And AI is the most powerful shipping tool ever built.
      </p>

      <SectionHeader tag="the-question" title="The Question Nobody Asks" />
      <p>
        How many decisions at your company were informed by AI-generated content this week? How many
        were verified?
      </p>
      <p>
        You don&apos;t know. Nobody does. That&apos;s the point.
      </p>
      <p>
        We&apos;ve built systems that produce confident, well-structured, authoritative-sounding content
        at machine speed. We&apos;ve put those systems in the hands of people who are rewarded for moving
        fast. And we&apos;ve done almost nothing to build the verification infrastructure that matches
        the generation speed.
      </p>
      <p>
        My team&apos;s fire drill was contained because Amazon&apos;s process caught it — the way it&apos;s
        designed to. But it was also a reminder. Not of what AI does wrong — but of why we need to
        stay thoughtful about how we trust it at speed.
      </p>

      <PageNav
        prev={{ href: "/", label: "home" }}
        next={{ href: "/the-skip", label: "the skip" }}
        promptMessage="Claude wants to show you what happened next."
      />
    </ArticleLayout>
  );
}
