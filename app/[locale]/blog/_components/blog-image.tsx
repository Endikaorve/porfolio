'use client';

import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function BlogImage({ src, alt, caption }: BlogImageProps) {
  return (
    <figure className="my-10">
      <div className="relative border border-white/10 overflow-hidden bg-surface-darkest">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-white/50 font-mono text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
