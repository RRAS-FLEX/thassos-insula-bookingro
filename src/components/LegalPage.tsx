type LegalSection = { heading: string; body: string[] };

export function LegalPage({
  heading,
  updated,
  intro,
  sections,
}: {
  heading: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{heading}</h1>
        <p className="mt-2 text-xs text-muted-foreground">{updated}</p>
        <p className="mt-4 text-sm text-muted-foreground">{intro}</p>
      </header>
      <div className="space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl font-semibold">{s.heading}</h2>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
