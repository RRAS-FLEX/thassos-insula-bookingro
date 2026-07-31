import content from "@/data/content.json";

export function parseVideoId(url: string): string | null {
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

export function pickRandomVideoId(): string | null {
  const urls = content.site.videoUrls;
  if (!urls || urls.length === 0) return null;
  const url = urls[Math.floor(Math.random() * urls.length)];
  return parseVideoId(url);
}
