import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Thassos HORECA" },
      { name: "description", content: "Get in touch with Thassos HORECA for hotel bookings, group rates and ferry inquiries." },
      { property: "og:title", content: "Contact Thassos HORECA" },
      { property: "og:description", content: "Get in touch for bookings and group rates on Thassos Island." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Contacts</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          The Thassos HORECA team is here to help you plan your stay.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Info icon={Phone} title="Phone / WhatsApp" value="+30 25930 00000" href="tel:+302593000000" />
          <Info icon={Mail} title="Email" value="booking@thassos-horeca.gr" href="mailto:booking@thassos-horeca.gr" />
          <Info icon={MapPin} title="Address" value="Limenas, 64004 Thassos, Greece" />
          <Info icon={Clock} title="Hours" value="Mon–Sun · 09:00–21:00 (EET)" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget).entries());
            console.log("Contact form submission:", data);
            setSent(true);
            e.currentTarget.reset();
          }}
          className="rounded-2xl border border-border/60 bg-card p-6"
        >
          <h2 className="font-display text-xl font-semibold">Send us a message</h2>
          <div className="mt-4 grid gap-3">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" />
            <div>
              <label className="block text-xs font-medium text-muted-foreground">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4" /> Send message
            </button>
            {sent && (
              <p className="text-sm text-primary">Thank you! We'll get back to you shortly.</p>
            )}
          </div>
        </form>
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

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground">{label}{required && " *"}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
