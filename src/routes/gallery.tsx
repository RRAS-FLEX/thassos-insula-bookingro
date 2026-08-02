import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GALLERY } from "@/data/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [idx, setIdx] = useState<number | null>(null);

  // Sorted alphabetically by name; Array#sort is stable so each place's own
  // photos keep their original relative order within its group.
  const sorted = useMemo(() => [...GALLERY].sort((a, b) => a.alt.localeCompare(b.alt)), []);

  const groups = useMemo(() => {
    const map = new Map<string, number[]>();
    sorted.forEach((photo, i) => {
      const list = map.get(photo.alt) ?? [];
      list.push(i);
      map.set(photo.alt, list);
    });
    return [...map.entries()];
  }, [sorted]);

  const close = () => setIdx(null);
  const prev = () => setIdx((i) => (i === null ? i : (i - 1 + sorted.length) % sorted.length));
  const next = () => setIdx((i) => (i === null ? i : (i + 1) % sorted.length));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{copy.heading}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {copy.description}
        </p>
      </header>

      {sorted.length > 0 ? (
        <div className="space-y-10">
          {groups.map(([name, indices]) => (
            <section key={name}>
              <h2 className="mb-3 font-display text-lg font-semibold text-foreground">{name}</h2>
              <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
                {indices.map((i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="group relative block w-full overflow-hidden rounded-xl border border-border/60 bg-card"
                  >
                    <img src={sorted[i].src} alt={sorted[i].alt} loading="lazy" className="h-auto w-full transition-transform duration-500 group-hover:scale-105" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-sm font-medium text-foreground">{sorted[i].alt}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/60 bg-card/50 p-10 text-center text-sm text-muted-foreground">
          {copy.emptyState}
        </div>
      )}

      {idx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4">
          <button onClick={close} className="absolute right-4 top-4 rounded-full bg-card p-2 text-foreground"><X className="h-5 w-5" /></button>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-card p-2 text-foreground"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-card p-2 text-foreground"><ChevronRight className="h-5 w-5" /></button>
          <div className="flex max-h-[85vh] max-w-full flex-col items-center gap-2">
            <img src={sorted[idx].src} alt={sorted[idx].alt} className="max-h-[75vh] max-w-full rounded-2xl object-contain" />
            <span className="text-sm text-muted-foreground">{sorted[idx].alt}</span>
          </div>
        </div>
      )}
    </div>
  );
}
