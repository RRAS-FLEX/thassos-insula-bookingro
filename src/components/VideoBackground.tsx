import { useEffect, useState } from "react";
import content from "@/data/content.json";

function parseVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const parts = u.pathname.split("/");
      const idx = parts.findIndex((p) => p === "embed" || p === "shorts");
      if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
    }
    return null;
  } catch {
    return null;
  }
}

function pickRandomVideoId(): string | null {
  const urls = content.site.videoUrls;
  if (!urls || urls.length === 0) return null;
  const url = urls[Math.floor(Math.random() * urls.length)];
  return parseVideoId(url);
}

export function VideoBackground() {
  // Picked client-side only (not during SSR) so every visitor's server-rendered
  // HTML matches its own hydration pass — a server-side random pick would mismatch
  // the client's independent pick and trigger a hydration warning.
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    setVideoId(pickRandomVideoId());
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      {videoId ? (
        <iframe
          key={videoId}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[220vw] -translate-x-1/2 -translate-y-1/2 md:w-[120vw] md:h-[120vh]"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&playlist=${videoId}`}
          title="Thassos background video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen={false}
          frameBorder={0}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,11,9,0.85)_90%)]" />
    </div>
  );
}
