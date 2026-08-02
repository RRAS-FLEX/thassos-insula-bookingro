import { useEffect, useRef, useState } from "react";

type YTPlayer = { mute: () => void; playVideo: () => void; destroy: () => void };
type YTPlayerState = { data: number; target: YTPlayer };

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
      PlayerState: { PLAYING: number };
    };
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
  // Kept hidden until playback is actually confirmed — the few seconds between
  // the iframe loading and mute()/playVideo() taking effect otherwise show
  // YouTube's own paused-state UI (play button + controls) right over the page.
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!videoId) return;
    setIsPlaying(false);
    let cancelled = false;
    let player: YTPlayer | undefined;
    loadYouTubeApi().then(() => {
      if (cancelled || !iframeRef.current || !window.YT) return;
      player = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e: YTPlayerState) => {
            if (window.YT && e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
          },
        },
      });
    });
    return () => {
      cancelled = true;
      player?.destroy();
    };
  }, [videoId]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      {videoId ? (
        <iframe
          ref={iframeRef}
          key={videoId}
          className={`pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[220vw] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 md:w-[120vw] md:h-[120vh] ${isPlaying ? "opacity-100" : "opacity-0"}`}
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
