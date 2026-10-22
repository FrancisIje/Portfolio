import React, { useEffect, useRef } from 'react';
import { GLYPH_PALETTE } from '../effects/okazz/glyphs';

// Page transition: a wave of solid palette squares sweeps diagonally across the
// viewport, each one growing from its centre until the outgoing page is
// covered; the route swaps behind them; then they shrink away along the same
// diagonal to uncover the new page. Drawn on one canvas rather than hundreds of
// DOM tiles, and scaled rather than faded, so no tile is ever half transparent
// over the copy. Durations here are re-exported for main.tsx to schedule the swap.
const TILE_PX = 64;

const COVER_TILE_MS = 200;
const COVER_SPREAD_MS = 260;
const UNCOVER_TILE_MS = 220;
const UNCOVER_SPREAD_MS = 320;
// Random wobble on each tile's place in the wave, as a share of the spread
const JITTER = 0.18;

export const BLOCK_REVEAL_COVER_MS = COVER_TILE_MS + COVER_SPREAD_MS;
export const BLOCK_REVEAL_UNCOVER_MS = UNCOVER_TILE_MS + UNCOVER_SPREAD_MS;

export type BlockRevealPhase = 'idle' | 'cover' | 'reveal';

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;

export default function BlockReveal({ phase }: { phase: BlockRevealPhase }) {
  // Stays mounted from cover through reveal so the canvas, and the colours on
  // it, carry straight across the route swap without a blank frame between.
  if (phase === 'idle') return null;
  return <BlockRevealCanvas phase={phase} />;
}

function BlockRevealCanvas({ phase }: { phase: 'cover' | 'reveal' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<{ cols: number; rows: number; colours: string[]; order: number[] } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // One grid for the whole transition, built on cover
    if (!gridRef.current) {
      const cols = Math.ceil(width / TILE_PX);
      const rows = Math.ceil(height / TILE_PX);
      const colours: string[] = [];
      const order: number[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          colours.push(GLYPH_PALETTE[Math.floor(Math.random() * GLYPH_PALETTE.length)]);
          // 0..1 position along the top-left to bottom-right diagonal, wobbled
          const diagonal = (col + row) / Math.max(1, cols + rows - 2);
          order.push(Math.min(1, Math.max(0, diagonal * (1 - JITTER) + Math.random() * JITTER)));
        }
      }
      gridRef.current = { cols, rows, colours, order };
    }
    const { cols, colours, order } = gridRef.current;

    const tileMs = phase === 'cover' ? COVER_TILE_MS : UNCOVER_TILE_MS;
    const spread = phase === 'cover' ? COVER_SPREAD_MS : UNCOVER_SPREAD_MS;
    const start = performance.now();
    let frame = 0;

    const draw = (now: number) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < colours.length; i++) {
        const t = Math.min(1, Math.max(0, (elapsed - order[i] * spread) / tileMs));
        const scale = phase === 'cover' ? easeOutCubic(t) : 1 - easeInCubic(t);
        if (scale <= 0) continue;
        const col = i % cols;
        const row = (i - col) / cols;
        // Half a pixel of bleed each side so neighbours meet with no seam
        const size = (TILE_PX + 1) * scale;
        const cx = col * TILE_PX + TILE_PX / 2;
        const cy = row * TILE_PX + TILE_PX / 2;
        ctx.fillStyle = colours[i];
        ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
      }
      if (elapsed < spread + tileMs) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(frame);
  }, [phase]);

  return <canvas ref={canvasRef} className="block-reveal" aria-hidden="true" />;
}
