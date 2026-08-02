import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, Mail, MapPin, Star, Ticket } from "lucide-react";
import type { Hotel } from "@/data/hotels";

export function HotelModal({ hotel, onClose }: { hotel: Hotel | null; onClose: () => void }) {
  return (
    <Dialog open={!!hotel} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        {hotel && (
          <div>
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              {hotel.video ? (
                <video
                  src={hotel.video}
                  poster={hotel.image}
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  muted
                  loop
                  autoPlay
                />
              ) : (
                <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
              )}
              {hotel.offer && (
                <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Ticket className="h-3.5 w-3.5" /> Free ferry tickets included
                </div>
              )}
            </div>
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{hotel.name}</DialogTitle>
              </DialogHeader>
              <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {hotel.town}</span>
                <span className="flex items-center gap-0.5 text-primary">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{hotel.description}</p>
              <div className="mt-6 grid gap-3 rounded-xl bg-secondary/60 p-4 text-sm">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {hotel.phone}</div>
                {hotel.email && (
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {hotel.email}</div>
                )}
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {hotel.town}, Thassos, Greece</div>
              </div>
              <div className="mt-6 flex items-center justify-end">
                <a
                  href={
                    hotel.email
                      ? `mailto:${hotel.email}?subject=Booking%20request%20-%20${encodeURIComponent(hotel.name)}`
                      : `tel:${hotel.phone.replace(/\s+/g, "")}`
                  }
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Request booking
                </a>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
