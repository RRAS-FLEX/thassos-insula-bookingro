import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { HOTELS, TOWN_LIST, type Hotel } from "@/data/hotels";
import { HotelCard } from "@/components/HotelCard";
import { HotelModal } from "@/components/HotelModal";

export const Route = createFileRoute("/accommodation")({
  component: AccommodationPage,
  head: () => ({
    meta: [
      { title: "Thassos Accommodation — 200+ Hotels & Studios | Thassos HORECA" },
      { name: "description", content: "Browse 200+ hotels, studios and villas across Thassos Island." },
      { property: "og:title", content: "Thassos Accommodation — 200+ Hotels" },
      { property: "og:description", content: "200+ curated hotels and studios across Thassos Island." },
    ],
    links: [{ rel: "canonical", href: "/accommodation" }],
  }),
});

const PAGE_SIZE = 24;

function AccommodationPage() {
  const [town, setTown] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Hotel | null>(null);

  const filtered = useMemo(() => {
    const list = HOTELS.filter((h) => (town === "all" ? true : h.town === town));
    return [...list].sort((a, b) => b.stars - a.stars);
  }, [town]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const shown = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Thassos Accommodation</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Browse {HOTELS.length}+ hotels, studios and villas across Thassos. Contact each property directly — no booking fees.
        </p>
      </header>

      <div className="sticky top-16 z-20 mb-6 rounded-2xl border border-border/60 bg-card/80 p-3 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <select
            value={town}
            onChange={(e) => { setTown(e.target.value); setPage(1); }}
            className="rounded-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="all">All towns</option>
            {TOWN_LIST.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="text-xs text-muted-foreground">{filtered.length} results</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shown.map((h) => (
          <HotelCard key={h.id} hotel={h} onOpen={setSelected} showOfferRibbon />
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            disabled={current === 1}
            onClick={() => { setPage(current - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="rounded-full border border-input px-4 py-2 text-sm disabled:opacity-40"
          >Prev</button>
          <span className="text-sm text-muted-foreground">Page {current} of {pageCount}</span>
          <button
            disabled={current === pageCount}
            onClick={() => { setPage(current + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="rounded-full border border-input px-4 py-2 text-sm disabled:opacity-40"
          >Next</button>
        </div>
      )}

      <HotelModal hotel={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
