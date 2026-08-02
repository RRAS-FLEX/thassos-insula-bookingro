import { Phone, Mail, MapPin, Star, Ticket } from "lucide-react";
import type { Hotel } from "@/data/hotels";

export function HotelCard({
  hotel,
  onOpen,
  showOfferRibbon,
}: {
  hotel: Hotel;
  onOpen: (h: Hotel) => void;
  showOfferRibbon?: boolean;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(255,122,26,0.35)]">
      {showOfferRibbon && hotel.offer && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow">
          <Ticket className="h-3.5 w-3.5" /> Free ferry
        </div>
      )}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight">{hotel.name}</h3>
          <div className="flex shrink-0 items-center gap-0.5 text-primary">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {hotel.town}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{hotel.description}</p>
        <div className="mt-3 flex flex-col gap-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-primary" /> {hotel.phone}</span>
          {hotel.email && (
            <span className="flex items-center gap-1.5 truncate"><Mail className="h-3.5 w-3.5 text-primary" /> {hotel.email}</span>
          )}
        </div>
        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={() => onOpen(hotel)}
            className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}
