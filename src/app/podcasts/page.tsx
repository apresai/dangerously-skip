import { ArticleLayout } from "@/components/article-layout";
import { SectionHeader } from "@/components/section-header";
import { AudioPlayer } from "@/components/audio-player";

export const metadata = {
  title: "Podcasts — dangerously skip",
  description: "Two podcast conversations based on Dario Amodei's essays on AI's potential and humanity's survival.",
};

export default function Podcasts() {
  return (
    <ArticleLayout>
      <span className="font-mono text-xs text-terminal-dim block mb-4">
        Read(&quot;podcasts&quot;)
      </span>
      <span className="font-mono text-xs text-terminal-dim block mb-1">
        {"//"} 2 episodes
      </span>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
        Podcasts
      </h1>
      <p className="text-gray-500 text-lg mb-12">
        Two conversations on Dario Amodei&apos;s essays
      </p>

      <SectionHeader tag="listen" title="Audio Essays" />
      <p>
        Podcast fan? Check these out — two conversations based on Dario
        Amodei&apos;s essays about where AI is headed and what it means for all of us.
      </p>

      <AudioPlayer
        src="https://podcasts.apresai.dev/audio/01KJMZAJE3XN2NGWJ4ZRJ74VBG.mp3"
        title="The Radical Upside of AI: A Conversation on Transforming Biology, Inequality, and Democracy"
      />
      <p className="text-sm text-gray-500">
        Based on Amodei&apos;s essay <em>Machines of Loving Grace</em> — an optimistic
        case for how AI could transform biology, reduce inequality, and strengthen democracy.
      </p>

      <AudioPlayer
        src="https://podcasts.apresai.dev/audio/01KJMWWX0GP4295DAVW9KCT2Q3.mp3"
        title="Technological Adolescence: Can Humanity Survive Powerful AI?"
      />
      <p className="text-sm text-gray-500">
        Based on Amodei&apos;s essay on the critical period between developing powerful AI
        and learning to coexist with it — the adolescence we all have to survive.
      </p>
    </ArticleLayout>
  );
}
