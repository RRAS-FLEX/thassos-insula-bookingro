import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, Mail, MapPin, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import type { Experience } from "@/data/experiences";
import { parseVideoId, loadYouTubeApi, type YTPlayer, type YTPlayerState } from "@/lib/video";

const SLIDE_INTERVAL_MS = 4000;

export function ExperienceModal({ experience, onClose }: { experience: Experience | null; onClose: () => void }) {
  const videoId = experience?.video ? parseVideoId(experience.video) : null;
  const [showVideo, setShowVideo] = useState(!!videoId);
  const [slideIdx, setSlideIdx] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset to the video (if this place has one) and the first photo each time a
  // different place is opened.
  useEffect(() => {
    setShowVideo(!!videoId);
    setSlideIdx(0);
  }, [experience?.id, videoId]);

  // Drive the video via the JS API (not just autoplay=1) so we get a reliable
  // ENDED event to hand off to the photo slideshow.
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

  // Auto-advance the photo slideshow once we're past the video (or immediately
  // for places with no video).
  useEffect(() => {
    if (!experience || showVideo || experience.images.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIdx((i) => (i + 1) % experience.images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [experience, showVideo]);

  const prevSlide = () => {
    if (!experience) return;
    setSlideIdx((i) => (i - 1 + experience.images.length) % experience.images.length);
  };
  const nextSlide = () => {
    if (!experience) return;
    setSlideIdx((i) => (i + 1) % experience.images.length);
  };

  return (
    <Dialog open={!!experience} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        {experience && (
          <div>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
              {showVideo && videoId ? (
                <iframe
                  ref={iframeRef}
                  key={videoId}
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&playsinline=1&rel=0`}
                  title={experience.name}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  frameBorder={0}
                />
              ) : (
                <>
                  <img
                    src={experience.images[slideIdx]}
                    alt={experience.name}
                    className="h-full w-full object-cover transition-opacity duration-500"
                  />
                  {experience.images.length > 1 && (
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
                        {experience.images.map((_, i) => (
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
                </>
              )}
            </div>
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{experience.name}</DialogTitle>
              </DialogHeader>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Tag className="h-4 w-4" /> {experience.category}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {experience.town}</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{experience.description}</p>
              {(experience.phone || experience.email) && (
                <div className="mt-6 grid gap-3 rounded-xl bg-secondary/60 p-4 text-sm">
                  {experience.phone && (
                    <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {experience.phone}</div>
                  )}
                  {experience.email && (
                    <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {experience.email}</div>
                  )}
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {experience.town}, Thassos, Greece</div>
                </div>
              )}
              {(experience.phone || experience.email) && (
                <div className="mt-6 flex items-center justify-end">
                  <a
                    href={
                      experience.email
                        ? `mailto:${experience.email}?subject=${encodeURIComponent(experience.name)}`
                        : `tel:${(experience.phone ?? "").replace(/\s+/g, "")}`
                    }
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Get in touch
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
