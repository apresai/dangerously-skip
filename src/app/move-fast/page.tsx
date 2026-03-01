import { ArticleLayout } from "@/components/article-layout";
import { SectionHeader } from "@/components/section-header";
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
        Someone on the team used AI to draft an executive escalation. The ask: more support, customers
        are in pain. The problem: the context was wrong. It mixed signals from another workstream.
      </p>
      <p>
        At Amazon, &ldquo;customers in pain&rdquo; goes straight to the top. Fast. Leadership engaged. Resources
        started mobilizing. We were heading down the path of solving a problem for a customer who
        never reported one — about to manufacture a response to pain they never felt.
      </p>
      <p>
        Then the correction: <em>Sorry, that wasn&apos;t accurate. No help is needed.</em>
      </p>
      <p>
        The customer never knew. It was entirely internal. An embarrassing email. A wasted cycle. A
        few red faces in a meeting room. That&apos;s all it was.
      </p>
      <p>
        That time.
      </p>

      <SectionHeader tag="the-near-miss" title="The Near-Miss" />
      <p>
        Think about what almost happened: a company known for customer obsession, mobilizing at
        executive speed, about to deliver a solution to a problem that didn&apos;t exist — all because
        AI-generated content was trusted without verification.
      </p>
      <p>
        Now imagine that same mechanism in systems where the stakes aren&apos;t an embarrassing email.
        Medical diagnosis. Criminal sentencing. Military targeting. The speed that makes AI useful
        is the same speed that makes it dangerous.
      </p>
      <p>
        We got lucky. The correction came in time. The customer never felt a thing. But luck is not
        a strategy, and &ldquo;we caught it this time&rdquo; is not a safety case.
      </p>

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
        The fire drill at Amazon was contained. It was internal. It was embarrassing but not
        consequential. It was also a preview. Not of what AI does wrong — but of what happens when
        humans trust it at speed.
      </p>

      <PageNav
        prev={{ href: "/", label: "home" }}
        next={{ href: "/the-skip", label: "the skip" }}
        promptMessage="Claude wants to show you what happened next."
      />
    </ArticleLayout>
  );
}
