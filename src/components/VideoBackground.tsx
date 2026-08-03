import { useEffect, useRef, useState } from "react";
import { pickRandomVideoId, loadYouTubeApi, type YTPlayer, type YTPlayerState } from "@/lib/video";

export function VideoBackground({ videoId: initialVideoId }: { videoId: string | null }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Owns playback after the initial (SSR-provided) pick so it can advance to a
  // new random video itself once the current one ends, instead of looping the
  // same clip forever.
  const [videoId, setVideoId] = useState(initialVideoId);
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
            if (!window.YT) return;
            if (e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            if (e.data === window.YT.PlayerState.ENDED) setVideoId((current) => pickRandomVideoId(current));
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
          className={`pointer-events-none absolute left-1/2 top-1/2 h-[150vh] w-[275vw] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 md:h-[120vh] md:w-[120vw] ${isPlaying ? "opacity-100" : "opacity-0"}`}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&disablekb=1&iv_load_policy=3&fs=0`}
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
