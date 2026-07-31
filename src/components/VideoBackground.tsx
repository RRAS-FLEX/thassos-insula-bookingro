import { useEffect, useRef } from "react";

type YTPlayer = { mute: () => void; playVideo: () => void };

declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (window.YT) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function VideoBackground({ videoId }: { videoId: string | null }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // URL params alone (autoplay=1&mute=1) aren't reliably honored across every
  // browser — when blocked, YouTube falls back to its paused-state UI (play
  // button + controls). Driving mute/play explicitly via the JS API avoids that.
  useEffect(() => {
    if (!videoId) return;
    let cancelled = false;
    loadYouTubeApi().then(() => {
      if (cancelled || !iframeRef.current || !window.YT) return;
      new window.YT.Player(iframeRef.current, {
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute();
            e.target.playVideo();
          },
        },
      });
    });
    return () => {
      cancelled = true;
    };
  }, [videoId]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      {videoId ? (
        <iframe
          ref={iframeRef}
          key={videoId}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[220vw] -translate-x-1/2 -translate-y-1/2 md:w-[120vw] md:h-[120vh]"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&disablekb=1&iv_load_policy=3&fs=0&playlist=${videoId}`}
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
