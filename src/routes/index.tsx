import { createFileRoute, Link } from "@tanstack/react-router";
import { VideoBackground } from "@/components/VideoBackground";
import { Home, BedDouble, Ticket, Images, Phone } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Thassos Accommodation by Thassos HORECA" },
      { name: "description", content: "Hotels on Thassos Island. Free ferry tickets with every booking. Curated accommodation by Thassos HORECA." },
      { property: "og:title", content: "Thassos Accommodation by Thassos HORECA" },
      { property: "og:description", content: "Hotels on Thassos Island. Free ferry tickets with every booking." },
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
  return (
    <section className="relative isolate flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-16 text-center">
      <VideoBackground />
      <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
        Thassos Island · Greece
      </span>
      <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-foreground sm:text-6xl md:text-7xl">
        Thassos <span className="text-primary">Accommodation</span>
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
        Thassos accommodation by <span className="font-semibold text-foreground">Thassos HORECA</span>
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
        <Stat n="Free" label="Ferry tickets" />
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
