import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { HOTELS, type Hotel } from "@/data/hotels";
import { HotelCard } from "@/components/HotelCard";
import { HotelModal } from "@/components/HotelModal";
import { Ticket, Ship, Check } from "lucide-react";
import content from "@/data/content.json";

const copy = content.pages.offers;

export const Route = createFileRoute("/offers")({
  component: OffersPage,
  head: () => ({
    meta: [
      { title: copy.meta.title },
      { name: "description", content: copy.meta.description },
      { property: "og:title", content: copy.meta.ogTitle },
      { property: "og:description", content: copy.meta.ogDescription },
    ],
    links: [{ rel: "canonical", href: "/offers" }],
  }),
});

function OffersPage() {
  const [selected, setSelected] = useState<Hotel | null>(null);
  const offers = useMemo(() => HOTELS.filter((h) => h.offer), []);
  return (
    <div>
      <section className="border-b border-border/60 bg-gradient-to-br from-primary/15 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
            <Ticket className="h-4 w-4" /> {copy.eyebrow}
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            {copy.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {copy.description}
          </p>
          <ul className="mt-6 grid max-w-2xl gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {copy.terms.map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Ship className="h-4 w-4" /> {offers.length} {copy.participatingLabel}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{copy.sectionHeading}</h2>
        {offers.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {offers.map((h) => (
              <HotelCard key={h.id} hotel={h} onOpen={setSelected} showOfferRibbon />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-border/60 bg-card/50 p-10 text-center text-sm text-muted-foreground">
            {copy.emptyState}
          </div>
        )}
        <HotelModal hotel={selected} onClose={() => setSelected(null)} />
      </section>
    </div>
  );
}
