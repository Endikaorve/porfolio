'use client';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <figure className="my-10">
      <div className="relative aspect-video border border-white/10 overflow-hidden bg-surface-darkest">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title || 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {title && (
        <figcaption className="mt-3 text-sm text-white/50 font-mono text-center">
          {title}
        </figcaption>
      )}
    </figure>
  );
}
