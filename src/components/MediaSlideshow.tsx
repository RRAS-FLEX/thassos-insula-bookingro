import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { parseVideoId, loadYouTubeApi, type YTPlayer, type YTPlayerState } from "@/lib/video";

/**
 * Plays `video` first (if set) via the YouTube JS API, with a button to jump
 * to the photo slideshow at any time (also happens automatically once the
 * video ends) — or goes straight to the manually-navigated photo slideshow
 * when there's no video. Used by both the hotel and local-experience detail
 * modals so this logic lives in exactly one place.
 */
export function MediaSlideshow({ images, video, title }: { images: string[]; video?: string; title: string }) {
  const videoId = video ? parseVideoId(video) : null;
  const [showVideo, setShowVideo] = useState(!!videoId);
  const [slideIdx, setSlideIdx] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset whenever a different place's media is shown (key on identity via title+video).
  useEffect(() => {
    setShowVideo(!!videoId);
    setSlideIdx(0);
  }, [title, videoId]);

  useEffect(() => {
    if (!showVideo || !videoId) return;
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
            if (window.YT && e.data === window.YT.PlayerState.ENDED) setShowVideo(false);
          },
        },
      });
    });
    return () => {
      cancelled = true;
      player?.destroy();
    };
  }, [showVideo, videoId]);

  const prevSlide = () => setSlideIdx((i) => (i - 1 + images.length) % images.length);
  const nextSlide = () => setSlideIdx((i) => (i + 1) % images.length);

  if (showVideo && videoId) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
        <iframe
          ref={iframeRef}
          key={videoId}
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&playsinline=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          frameBorder={0}
        />
        {images.length > 0 && (
          <button
            onClick={() => setShowVideo(false)}
            className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur"
          >
            <Images className="h-3.5 w-3.5" />
            View photos
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
      <img
        src={images[slideIdx]}
        alt={title}
        className="h-full w-full object-cover transition-opacity duration-500"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-1.5 text-foreground backdrop-blur"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-1.5 text-foreground backdrop-blur"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === slideIdx ? "w-4 bg-primary" : "w-1.5 bg-background/70"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
