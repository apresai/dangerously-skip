export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="font-mono text-xs text-terminal-dim space-y-2">
          <p>
            $ echo &quot;How did you survive your adolescence?&quot;
          </p>
          <p className="text-gray-400">
            A site about AI safety, speed, and the moment you stop asking permission.
          </p>
          <p className="text-gray-400 pt-4">
            The views expressed here are entirely my own and do not represent the views of my employer.
          </p>
        </div>
      </div>
    </footer>
  );
}
