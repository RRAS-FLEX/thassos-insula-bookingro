import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  const close = () => setIdx(null);
  const prev = () => setIdx((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length));
  const next = () => setIdx((i) => (i === null ? i : (i + 1) % GALLERY.length));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{copy.heading}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {copy.description}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Photos via{" "}
          <a href="https://commons.wikimedia.org/wiki/Category:Thasos" target="_blank" rel="noreferrer" className="underline hover:text-primary">
            Wikimedia Commons
          </a>
        </p>
      </header>

      <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
        {GALLERY.map((p, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="block w-full overflow-hidden rounded-xl border border-border/60 bg-card"
          >
            <img src={p.src} alt={p.alt} loading="lazy" className="h-auto w-full transition-transform duration-500 hover:scale-105" />
          </button>
        ))}
      </div>

      {idx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4">
          <button onClick={close} className="absolute right-4 top-4 rounded-full bg-card p-2 text-foreground"><X className="h-5 w-5" /></button>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-card p-2 text-foreground"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-card p-2 text-foreground"><ChevronRight className="h-5 w-5" /></button>
          <img src={GALLERY[idx].src} alt={GALLERY[idx].alt} className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
        </div>
      )}
    </div>
  );
}
