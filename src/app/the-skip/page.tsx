import { ArticleLayout } from "@/components/article-layout";
import { SectionHeader } from "@/components/section-header";
import { SkipPrompt } from "@/components/skip-prompt";
import { PageNav } from "@/components/page-nav";

export const metadata = {
  title: "The Skip — dangerously skip",
  description: "The personal journey from cautious user to --dangerously-skip-permissions.",
};

export default function TheSkip() {
  return (
    <ArticleLayout>
      <span className="font-mono text-xs text-terminal-dim block mb-4">
        Read(&quot;the-skip&quot;)
      </span>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
        The Skip
      </h1>
      <p className="text-gray-500 text-lg mb-12">
        A Claude Code confession
      </p>

      <SectionHeader tag="the-first-thousand" title="The First Thousand Prompts" />
      <p>
        I started Claude Code like everyone does: carefully.
      </p>
      <p>
        &ldquo;Can I read this file?&rdquo; Yes. &ldquo;Can I run this command?&rdquo; Yes. &ldquo;Can I check your
        AWS account?&rdquo; ...Yes? Every time, a prompt. Every time, a decision. Every time, I read
        what it was asking and made a judgment call.
      </p>
      <p>
        I said yes to almost everything. In thousands of prompts, I almost never said no. But I
        paid attention. I learned what Claude Code does, how it thinks, what it asks for and why.
        I built a mental model of its behavior through repetition. That mental model would later
        become the justification for what I did next.
      </p>

      <SectionHeader tag="the-comfort-zone" title="The Comfort Zone" />
      <p>
        Mostly I was building simple websites. Side projects. Nothing mission-critical. A restaurant
        site here, a personal project there. And Claude Code was <em>good</em>. Surprisingly good.
        It understood what I wanted before I finished explaining it. It wrote clean code. It caught
        its own mistakes more often than not.
      </p>
      <p>
        Good enough that the permission prompts started feeling like speed bumps on a road I&apos;d
        already driven a hundred times. I knew the road. I knew the car. Why was it still asking
        me to confirm every turn?
      </p>
      <p>
        That feeling — that impatience with safety you&apos;ve outgrown — is the most dangerous
        feeling in technology. It&apos;s the feeling right before the mistake.
      </p>

      <SectionHeader tag="the-flag" title="The Flag" />
      <p>
        Then I found it: <code>--dangerously-skip-permissions</code>.
      </p>
      <p>
        The name alone should have been a warning. It&apos;s not called <code>--trust-mode</code> or{" "}
        <code>--auto-approve</code>. It&apos;s called <em>dangerously skip</em>. Anthropic named it that on
        purpose. They wanted you to feel the weight of what you&apos;re doing.
      </p>
      <p>
        I felt it. I typed it anyway.
      </p>
      <p className="font-mono text-sm bg-gray-900 text-gray-300 rounded-lg px-6 py-4 my-8">
        $ claude --dangerously-skip-permissions
      </p>
      <p>
        And just like that, the prompts stopped. The speed bumps disappeared. The road opened up
        and I was flying.
      </p>

      <SectionHeader tag="faster-and-wronger" title="Faster and Wronger" />
      <p>
        Since turning it on, I&apos;ve moved faster. I&apos;ve also made bigger mistakes.
      </p>
      <p>
        Files modified that shouldn&apos;t have been. Configurations changed without me understanding
        why. Commands run that I would have questioned if I&apos;d seen the prompt. Nothing catastrophic —
        these are side projects. But the pattern is clear: the more I skip, the less I understand
        what&apos;s happening. And the less I understand, the more I need to trust. It&apos;s a compounding
        loop, and it only goes one direction.
      </p>
      <p>
        Each mistake is small. Each one is recoverable. But each one also moves the baseline.
        Yesterday&apos;s &ldquo;I would never do that&rdquo; becomes today&apos;s &ldquo;it&apos;s probably fine.&rdquo;
        The erosion of caution isn&apos;t dramatic. It&apos;s comfortable.
      </p>

      <SectionHeader tag="the-name-is-the-warning" title="The Name Is the Warning" />
      <p>
        Anthropic didn&apos;t hide this flag. They didn&apos;t make it easy to find, either. And they named
        it with the word &ldquo;dangerously&rdquo; right there in the syntax. That&apos;s not an accident.
        That&apos;s a company that understands the moment a user crosses from informed consent to blind
        trust — and wants to make damn sure you know which side you&apos;re on.
      </p>
      <p>
        Most companies would call it &ldquo;expert mode&rdquo; or &ldquo;advanced settings.&rdquo; Something
        that flatters the user. Something that makes bypassing safety feel like a promotion. Anthropic
        called it what it is: dangerous. And they put that word where you can&apos;t miss it.
      </p>
      <p>
        I respect that. I also ignored it. And that&apos;s the whole problem, isn&apos;t it? You can name
        the danger. You can put it in bold. You can make people type it out letter by letter. And
        they&apos;ll still do it, because the speed is too good to give up.
      </p>

      <SkipPrompt />

      <PageNav
        prev={{ href: "/move-fast", label: "move fast" }}
        next={{ href: "/the-anthropic-bet", label: "the anthropic bet" }}
      />
    </ArticleLayout>
  );
}
