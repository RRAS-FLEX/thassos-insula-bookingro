export function VideoBackground({ videoId }: { videoId: string | null }) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-background">
      {videoId ? (
        <iframe
          key={videoId}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[220vw] -translate-x-1/2 -translate-y-1/2 md:w-[120vw] md:h-[120vh]"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&disablekb=1&iv_load_policy=3&fs=0&playlist=${videoId}`}
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
