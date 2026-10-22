import React, { useCallback, useEffect, useState } from 'react';
import GlyphGrid from '../effects/okazz/GlyphGrid';

// Long enough for the grid to bloom and run one reshuffle, so a fast load does
// not just flash the loader at people.
const MIN_VISIBLE_MS = 1700;

// Covers the page on first load with the glyph grid, until fonts, the portrait
// and the window load event are all done. Then the glyphs shrink away and the
// paper behind them fades, uncovering the page.
export default function IntroLoader() {
  const [exiting, setExiting] = useState(false);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
    });
    const fonts = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
    const minimum = new Promise<void>((resolve) => setTimeout(resolve, MIN_VISIBLE_MS));
    // A hung font or image request should never strand someone on the loader
    const cap = new Promise<void>((resolve) => setTimeout(resolve, 6000));

    let cancelled = false;
    Promise.race([Promise.all([loaded, fonts, minimum]), cap]).then(() => {
      if (!cancelled) setExiting(true);
    });
    document.documentElement.classList.add('is-loading');
    return () => {
      cancelled = true;
      document.documentElement.classList.remove('is-loading');
    };
  }, []);

  const handleExited = useCallback(() => {
    setFading(true);
    document.documentElement.classList.remove('is-loading');
    setTimeout(() => setGone(true), 500);
  }, []);

  if (gone) return null;

  return (
    <div className={`intro-loader${fading ? ' is-fading' : ''}`} role="status" aria-live="polite">
      <GlyphGrid
        cols={5}
        rows={5}
        waveEvery={900}
        exiting={exiting}
        onExited={handleExited}
        className="intro-loader__grid"
      />
      <p className="intro-loader__label">
        <span className="sr-only">Loading </span>Francis Ijenebe
      </p>
    </div>
  );
}
