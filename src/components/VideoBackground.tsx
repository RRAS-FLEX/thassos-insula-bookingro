import { useEffect, useState } from "react";
import { Settings, X } from "lucide-react";

const STORAGE_KEY = "home_video_url";
const DEFAULT_URL = "https://www.youtube.com/watch?v=8Kn-r-3vNPY"; // Thassos aerial b-roll

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

export function VideoBackground() {
  const [url, setUrl] = useState<string>(DEFAULT_URL);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved) setUrl(saved);
  }, []);

  const videoId = parseVideoId(url);

  function save() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (!parseVideoId(trimmed)) {
      alert("Please paste a valid YouTube URL (youtube.com/watch?v=... or youtu.be/...).");
      return;
    }
    localStorage.setItem(STORAGE_KEY, trimmed);
    setUrl(trimmed);
    setOpen(false);
  }

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

      <button
        onClick={() => { setDraft(url); setOpen(true); }}
        className="pointer-events-auto absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-2 text-xs text-muted-foreground backdrop-blur hover:text-primary"
      >
        <Settings className="h-3.5 w-3.5" /> Change background video
      </button>

      {open && (
        <div className="pointer-events-auto absolute inset-0 z-30 flex items-center justify-center bg-background/80 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">Background video</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Paste any YouTube URL. It saves on this device.</p>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="mt-4 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
              <button onClick={save} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
