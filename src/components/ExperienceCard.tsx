import { Phone, Mail, MapPin, Tag } from "lucide-react";
import type { Experience } from "@/data/experiences";

export function ExperienceCard({
  experience,
  onOpen,
}: {
  experience: Experience;
  onOpen: (e: Experience) => void;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(255,122,26,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={experience.images[0]}
          alt={experience.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold leading-tight">{experience.name}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Tag className="h-3.5 w-3.5" /> {experience.category}
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {experience.town}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{experience.description}</p>
        <div className="mt-3 flex flex-col gap-1 text-xs text-muted-foreground">
          {experience.phone && (
            <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-primary" /> {experience.phone}</span>
          )}
          {experience.email && (
            <span className="flex items-center gap-1.5 truncate"><Mail className="h-3.5 w-3.5 text-primary" /> {experience.email}</span>
          )}
        </div>
        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={() => onOpen(experience)}
            className="rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}
