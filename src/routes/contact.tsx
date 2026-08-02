import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react";
import content from "@/data/content.json";

const copy = content.pages.contact;

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: copy.meta.title },
      { name: "description", content: copy.meta.description },
      { property: "og:title", content: copy.meta.ogTitle },
      { property: "og:description", content: copy.meta.ogDescription },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const SOCIAL_LINKS = [
  { key: "facebook", icon: Facebook, label: "Facebook" },
  { key: "instagram", icon: Instagram, label: "Instagram" },
  { key: "whatsapp", icon: MessageCircle, label: "WhatsApp" },
] as const;

function ContactPage() {
  const activeSocialLinks = SOCIAL_LINKS.filter(({ key }) => content.social[key]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{copy.heading}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {copy.description}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Info icon={Phone} title="Phone / WhatsApp" value={content.contact.phone} href={content.contact.phoneHref} />
          <Info icon={Mail} title="Email" value={content.contact.email} href={content.contact.emailHref} />
          <Info icon={MapPin} title="Address" value={content.contact.address} />
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
            <iframe
              title={copy.mapHeading}
              src={`https://www.google.com/maps?q=${encodeURIComponent(content.contact.address)}&z=15&output=embed`}
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {activeSocialLinks.length > 0 && (
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="font-display text-xl font-semibold">{copy.socialHeading}</h2>
              <div className="mt-4 flex gap-3">
                {activeSocialLinks.map(({ key, icon: Icon, label }) => (
                  <a
                    key={key}
                    href={content.social[key]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, title, value, href }: { icon: typeof Phone; title: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary"><Icon className="h-5 w-5" /></div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
        <div className="mt-0.5 font-medium">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:border-primary">{inner}</a> : inner;
}
