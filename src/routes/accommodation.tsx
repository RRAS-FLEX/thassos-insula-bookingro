import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { HOTELS, TOWN_LIST, type Hotel } from "@/data/hotels";
import { HotelCard } from "@/components/HotelCard";
import { HotelModal } from "@/components/HotelModal";
import { Search } from "lucide-react";

export const Route = createFileRoute("/accommodation")({
  component: AccommodationPage,
  head: () => ({
    meta: [
      { title: "Thassos Accommodation — 200+ Hotels & Studios | Thassos HORECA" },
      { name: "description", content: "Browse 200+ hotels, studios and villas across Thassos Island. Filter by town, star rating and price." },
      { property: "og:title", content: "Thassos Accommodation — 200+ Hotels" },
      { property: "og:description", content: "200+ curated hotels and studios across Thassos Island." },
    ],
    links: [{ rel: "canonical", href: "/accommodation" }],
  }),
});

const PAGE_SIZE = 24;

function AccommodationPage() {
  const [q, setQ] = useState("");
  const [town, setTown] = useState<string>("all");
  const [sort, setSort] = useState<"rating" | "price-asc" | "price-desc">("rating");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Hotel | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = HOTELS.filter((h) => {
      if (town !== "all" && h.town !== town) return false;
      if (term && !`${h.name} ${h.town}`.toLowerCase().includes(term)) return false;
      return true;
    });
    if (sort === "rating") list = [...list].sort((a, b) => b.stars - a.stars);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.priceFrom - a.priceFrom);
    return list;
  }, [q, town, sort]);

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
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search hotels or towns…"
              className="w-full rounded-full border border-input bg-background pl-9 pr-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <select
            value={town}
            onChange={(e) => { setTown(e.target.value); setPage(1); }}
            className="rounded-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="all">All towns</option>
            {TOWN_LIST.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="rating">Top rated</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
          <div className="flex items-center justify-end px-2 text-xs text-muted-foreground">
            {filtered.length} results
          </div>
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
