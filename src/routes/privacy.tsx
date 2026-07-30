import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import content from "@/data/content.json";

const copy = content.pages.privacy;

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: copy.meta.title },
      { name: "description", content: copy.meta.description },
      { property: "og:title", content: copy.meta.ogTitle },
      { property: "og:description", content: copy.meta.ogDescription },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function PrivacyPage() {
  return <LegalPage heading={copy.heading} updated={copy.updated} intro={copy.intro} sections={copy.sections} />;
}
