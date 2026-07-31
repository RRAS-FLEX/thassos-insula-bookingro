import { createFileRoute, Link } from "@tanstack/react-router";
import { VideoBackground } from "@/components/VideoBackground";
import { Home, BedDouble, Ticket, Images, Phone } from "lucide-react";
import content from "@/data/content.json";
import { pickRandomVideoId } from "@/lib/video";

const copy = content.pages.home;

export const Route = createFileRoute("/")({
  component: Index,
  loader: () => ({ videoId: pickRandomVideoId() }),
  head: () => ({
    meta: [
      { title: copy.meta.title },
      { name: "description", content: copy.meta.description },
      { property: "og:title", content: copy.meta.ogTitle },
      { property: "og:description", content: copy.meta.ogDescription },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const BUTTONS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/accommodation", label: "Thassos Accommodation", icon: BedDouble },
  { to: "/offers", label: "Special Offers", icon: Ticket },
  { to: "/gallery", label: "Photo Gallery", icon: Images },
  { to: "/contact", label: "Contacts", icon: Phone },
] as const;

function Index() {
  const { videoId } = Route.useLoaderData();
  return (
    <section className="relative isolate flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-16 text-center">
      <VideoBackground videoId={videoId} />
      <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
        {copy.badge}
      </span>
      <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-foreground sm:text-6xl md:text-7xl">
        {content.site.brand} <span className="text-primary">{copy.headingAccent}</span>
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
        {copy.tagline} <span className="font-semibold text-foreground">{content.site.brand} {content.site.brandAccent}</span>
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {BUTTONS.map(({ to, label, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            className="group inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
            activeOptions={{ exact: to === "/" }}
            activeProps={{ className: "inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground" }}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-16 grid w-full max-w-xl grid-cols-1 gap-4 text-center">
        <Stat n={copy.stat.value} label={copy.stat.label} />
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur">
      <div className="font-display text-2xl font-bold text-primary sm:text-3xl">{n}</div>
      <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</div>
    </div>
  );
}
