import { Facebook, Instagram, MessageCircle } from "lucide-react";
import content from "@/data/content.json";

const SOCIAL_LINKS = [
  { key: "facebook", icon: Facebook, label: "Facebook" },
  { key: "instagram", icon: Instagram, label: "Instagram" },
  { key: "whatsapp", icon: MessageCircle, label: "WhatsApp" },
] as const;

export function FloatingSocial() {
  const activeSocialLinks = SOCIAL_LINKS.filter(({ key }) => content.social[key]);
  if (activeSocialLinks.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {activeSocialLinks.map(({ key, icon: Icon, label }) => (
        <a
          key={key}
          href={content.social[key]}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-110"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
