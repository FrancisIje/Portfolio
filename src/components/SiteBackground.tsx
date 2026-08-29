import React, { useEffect, useRef, useState } from 'react';
import { RibbonFieldBackground } from '../effects/ribbon-field/RibbonFieldBackground';

// How far behind the cursor the field trails. The renderer eases its internal
// pointer toward the target by this fraction each frame, so smaller is slower:
// at 0.012 the field covers most of the distance over roughly a second and a
// half, drifting after the cursor rather than tracking it.
const FOLLOW_SMOOTHING = 0.012;

// Site-wide background. The renderer fills whatever box it is given, so the
// .shader-frame wrapper is the sized, overflow-controlled parent it needs:
// a fixed full-viewport layer sitting behind the page content (z-10).
export default function SiteBackground({ baseHue = 0 }: { baseHue?: number }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // The renderer tracks pointermove on its own host element. As a full-page
  // background that host sits under the content, so it never sees the pointer.
  // Forward window pointermove to it rather than editing the renderer.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || reducedMotion) return;

    const forward = (event: PointerEvent) => {
      const host = frame.querySelector('.threeui-background');
      if (!host) return;
      host.dispatchEvent(new PointerEvent('pointermove', {
        clientX: event.clientX,
        clientY: event.clientY,
        bubbles: false,
      }));
    };

    window.addEventListener('pointermove', forward, { passive: true });
    return () => window.removeEventListener('pointermove', forward);
  }, [reducedMotion]);

  return (
    <div ref={frameRef} className="shader-frame">
      <RibbonFieldBackground
        speed={reducedMotion ? 0.15 : 1.00}
        pointerAmount={reducedMotion ? 0 : 1.00}
        smoothing={FOLLOW_SMOOTHING}
        hue={baseHue}
        saturation={1.00}
        brightness={1.00}
        opacity={1.00}
      />
    </div>
  );
}
