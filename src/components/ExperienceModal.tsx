import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, Mail, MapPin, Tag } from "lucide-react";
import type { Experience } from "@/data/experiences";

export function ExperienceModal({ experience, onClose }: { experience: Experience | null; onClose: () => void }) {
  return (
    <Dialog open={!!experience} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        {experience && (
          <div>
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img src={experience.image} alt={experience.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{experience.name}</DialogTitle>
              </DialogHeader>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Tag className="h-4 w-4" /> {experience.category}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {experience.town}</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{experience.description}</p>
              {(experience.phone || experience.email) && (
                <div className="mt-6 grid gap-3 rounded-xl bg-secondary/60 p-4 text-sm">
                  {experience.phone && (
                    <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {experience.phone}</div>
                  )}
                  {experience.email && (
                    <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {experience.email}</div>
                  )}
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {experience.town}, Thassos, Greece</div>
                </div>
              )}
              {(experience.phone || experience.email) && (
                <div className="mt-6 flex items-center justify-end">
                  <a
                    href={
                      experience.email
                        ? `mailto:${experience.email}?subject=${encodeURIComponent(experience.name)}`
                        : `tel:${(experience.phone ?? "").replace(/\s+/g, "")}`
                    }
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Get in touch
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
