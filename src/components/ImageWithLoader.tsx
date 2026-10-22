import React, { useState } from 'react';
import GlyphGrid from '../effects/okazz/GlyphGrid';

// An image that shows a small glyph grid while it loads, then fades in.
export default function ImageWithLoader({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    // Add artificial delay in development to see the loading animation
    const delay = import.meta.env.DEV ? 1200 : 0;
    setTimeout(() => setIsLoading(false), delay);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <GlyphGrid cols={3} rows={3} waveEvery={700} className="w-20" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${className ?? ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        onLoad={handleLoad}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-ink/50 text-sm">
          <span>Image failed to load</span>
        </div>
      )}
    </div>
  );
}
