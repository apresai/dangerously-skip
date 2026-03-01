type ArticleLayoutProps = {
  children: React.ReactNode;
};

export function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <article className="max-w-[65ch] mx-auto px-6 py-12 md:py-20">
      <div className="prose-custom">{children}</div>
    </article>
  );
}
