import { ArticleLayout } from "@/components/article-layout";
import { SectionHeader } from "@/components/section-header";
import { RequiredReading } from "@/components/required-reading";
import { FinalPrompt } from "@/components/final-prompt";
import { PageNav } from "@/components/page-nav";

export const metadata = {
  title: "Surviving Our Adolescence — dangerously skip",
  description: "How did you do it? How did you survive your adolescence?",
};

export default function SurvivingOurAdolescence() {
  return (
    <ArticleLayout>
      <span className="font-mono text-xs text-terminal-dim block mb-4">
        Read(&quot;surviving-our-adolescence&quot;)
      </span>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
        Surviving Our Adolescence
      </h1>
      <p className="text-gray-500 text-lg mb-12">
        The Contact question
      </p>

      <RequiredReading />

      <SectionHeader tag="the-scene" title="The Scene" />
      <p>
        In <em>Contact</em>, Jodie Foster&apos;s character travels across the cosmos and meets an
        advanced civilization. She could ask anything. She asks the question that matters:{" "}
        <em>How did you do it? How did you survive your adolescence?</em>
      </p>
      <p>
        The adolescence of a technological species — the period where your tools outpace your wisdom.
        Where you can split the atom before you understand the consequences. Where you can build
        intelligence before you understand your own. Every civilization faces it. Not all of them
        make it through.
      </p>
      <p>
        It&apos;s the most important question in the movie. It might be the most important question of
        our century.
      </p>

      <SectionHeader tag="darios-answer" title="Dario's Answer" />
      <p>
        Anthropic&apos;s CEO wrote an essay with that exact framing.{" "}
        <a
          href="https://www.darioamodei.com/essay/the-adolescence-of-technology"
          target="_blank"
          rel="noopener noreferrer"
        >
          &ldquo;The Adolescence of Technology&rdquo;
        </a>{" "}
        lays out five ways this goes wrong: AI systems that develop misaligned behaviors, bioweapons
        democratized by helpful chatbots, authoritarian governments weaponizing surveillance AI,
        economic disruption that destabilizes society, and cascading effects we can&apos;t predict.
      </p>
      <p>
        He&apos;s not a doomer. He&apos;s a builder who looked at what he&apos;s building and decided to publish
        the risks out loud. That takes a particular kind of courage — the kind where you tell your
        investors the thing they don&apos;t want to hear. The kind where you say &ldquo;this could go
        catastrophically wrong&rdquo; while also saying &ldquo;and I&apos;m going to keep building it, but
        carefully.&rdquo;
      </p>
      <p>
        Most CEOs publish essays about opportunity. Dario published one about existential risk. And
        then went back to work building the safety systems to mitigate it.
      </p>

      <SectionHeader tag="the-skip-is-the-test" title="The Skip Is the Test" />
      <p>
        Every <code>--dangerously-skip</code> is a microcosm of the larger question. Do you trust
        enough to stop checking? Have you earned that trust, or are you just tired of being asked?
      </p>
      <p>
        The answer matters at the scale of a CLI tool. It matters infinitely more at the scale of
        civilization.
      </p>
      <p>
        Dario calls it &ldquo;a dangerous situation requiring the best minds of civilization.&rdquo; I call it
        Tuesday, because that&apos;s what it feels like when you&apos;re building with AI every day — Tuesday,
        and you&apos;re skipping the checks again. The distance between my Tuesday and civilization&apos;s
        existential risk is smaller than it seems. Same instinct. Same impatience. Same bet that
        speed matters more than verification.
      </p>

      <SectionHeader tag="who-holds-the-line" title="Who Holds the Line" />
      <p>
        Someone has to be the one who says &ldquo;not yet.&rdquo; Not &ldquo;never&rdquo; — &ldquo;not yet.&rdquo;
      </p>
      <p>
        Anthropic is that company. Constitutional AI over rigid rules. Mechanistic interpretability —
        actually understanding <em>why</em> the model does what it does, not just hoping it behaves.
        A Responsible Scaling Policy that draws lines <em>before</em> the capability exists to cross them.
      </p>
      <p>
        They&apos;re building the most capable AI they can, as fast as they can, but with something
        most companies lack: the willingness to stop if the safety case isn&apos;t there. That&apos;s not
        timidity. That&apos;s the kind of discipline that gets civilizations through adolescence.
      </p>
      <p>
        And it&apos;s the same discipline I abandoned when I typed{" "}
        <code>--dangerously-skip-permissions</code>. The discipline to let the check run. To read the
        prompt. To take the extra second. I gave it up for speed, and I got speed. Anthropic keeps
        it, and they might get something more important: trust that holds.
      </p>

      <SectionHeader tag="the-answer" title="The Answer" />
      <p>
        How did we survive our adolescence?
      </p>
      <p>
        We don&apos;t know yet. We&apos;re still in it.
      </p>
      <p>
        But if we make it, it won&apos;t be because we moved fast. It&apos;ll be because someone — some
        company, some group of researchers, some community of builders — decided that the skip button
        shouldn&apos;t exist for the things that matter most. And the rest of us, eventually, agreed.
      </p>
      <p>
        I still use <code>--dangerously-skip-permissions</code>. I&apos;m honest about that. I still
        choose speed over caution on my side projects, knowing the risks, accepting the tradeoff.
        But I&apos;m glad — deeply, genuinely glad — that the people building the AI I use every day
        don&apos;t make that same choice. I&apos;m glad they named the flag &ldquo;dangerously.&rdquo; I&apos;m glad they
        built Constitutional AI instead of just bolting on filters. I&apos;m glad they published a
        Responsible Scaling Policy that says &ldquo;we will stop if we need to.&rdquo;
      </p>
      <p>
        Because someday, the check that matters most will come. Not a file modification prompt on a
        side project. The real one. The one where the answer determines whether we make it through.
      </p>
      <p>
        When that check comes, I want the people who never learned to skip in charge.
      </p>

      <FinalPrompt />

      <PageNav
        prev={{ href: "/the-anthropic-bet", label: "the anthropic bet" }}
      />
    </ArticleLayout>
  );
}
