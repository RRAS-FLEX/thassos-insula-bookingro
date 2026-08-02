import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EXPERIENCES, CATEGORY_LIST, type Experience } from "@/data/experiences";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ExperienceModal } from "@/components/ExperienceModal";
import content from "@/data/content.json";

const copy = content.pages.gallery;

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: copy.meta.title },
      { name: "description", content: copy.meta.description },
      { property: "og:title", content: copy.meta.ogTitle },
      { property: "og:description", content: copy.meta.ogDescription },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

function GalleryPage() {
  const [category, setCategory] = useState<string>("all");
  const [selected, setSelected] = useState<Experience | null>(null);

  const filtered = useMemo(() => {
    return EXPERIENCES.filter((e) => (category === "all" ? true : e.category === category));
  }, [category]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{copy.heading}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {copy.description}
        </p>
      </header>

      <div className="sticky top-16 z-20 mb-6 rounded-2xl border border-border/60 bg-card/80 p-3 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="all">All categories</option>
            {CATEGORY_LIST.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="text-xs text-muted-foreground">{filtered.length} results</div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((e) => (
            <ExperienceCard key={e.id} experience={e} onOpen={setSelected} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-card/50 p-10 text-center text-sm text-muted-foreground">
          {copy.emptyState}
        </div>
      )}

      <ExperienceModal experience={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
