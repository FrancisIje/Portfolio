import React, { useEffect, useRef } from 'react';
import { clamp01, drawGlyph, easeInBack, easeOutBack, randomGlyph, type Glyph } from './glyphs';

type Cell = {
  col: number;
  row: number;
  glyph: Glyph | null;
  // The glyph waiting to replace this one while a swap wave passes through
  next: Glyph | null;
  // -1 when idle, otherwise when this cell's part of the wave begins
  swapStart: number;
  swapped: boolean;
  turn: number;
};

const APPEAR_MS = 520;
const SWAP_OUT_MS = 220;
const SWAP_IN_MS = 360;
// Delay per cell of distance as a wave travels across the grid
const WAVE_STEP_MS = 70;
const BLANK_CHANCE = 0.14;


// A grid of Okazz-style glyphs that pops in from the centre, then keeps
// reshuffling in waves that ripple out from a random cell. When `exiting` turns
// true every glyph shrinks away, centre last, and `onExited` fires.
export default function GlyphGrid({
  cols,
  rows,
  gap = 0.28,
  waveEvery = 1500,
  exiting = false,
  onExited,
  className = '',
  label,
}: {
  cols: number;
  rows: number;
  // Space between glyphs as a fraction of a cell
  gap?: number;
  waveEvery?: number;
  exiting?: boolean;
  onExited?: () => void;
  className?: string;
  label?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const exitRef = useRef<{ at: number; done: boolean; onExited?: () => void } | null>(null);

  useEffect(() => {
    if (!exiting || exitRef.current) return;
    // With reduced motion the grid is drawn once and never animates, so there
    // is no exit sequence to wait for.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      exitRef.current = { at: 0, done: true };
      onExited?.();
      return;
    }
    exitRef.current = { at: performance.now(), done: false, onExited };
  }, [exiting, onExited]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    const cx = (cols - 1) / 2;
    const cy = (rows - 1) / 2;
    const maxDist = Math.hypot(cx, cy);
    // Gaps read as rhythm in a grid, but a lone tile going blank looks broken
    const blankChance = cols * rows > 1 ? BLANK_CHANCE : 0;
    const glyphOrBlank = () => (Math.random() < blankChance ? null : randomGlyph());

    const cells: Cell[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        cells.push({ col, row, glyph: glyphOrBlank(), next: null, swapStart: -1, swapped: false, turn: 0 });
      }
    }

    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let lastWave = start + APPEAR_MS + maxDist * WAVE_STEP_MS;
    let frame = 0;

    const draw = (now: number) => {
      const exit = exitRef.current;

      // Kick off a reshuffle wave from a random cell
      if (!reduced && !exit && now - lastWave > waveEvery) {
        lastWave = now;
        const origin = cells[Math.floor(Math.random() * cells.length)];
        for (const cell of cells) {
          const d = Math.hypot(cell.col - origin.col, cell.row - origin.row);
          // Not every cell takes part, so the grid never changes all at once
          if (Math.random() < 0.7) {
            cell.next = glyphOrBlank();
            cell.swapStart = now + d * WAVE_STEP_MS;
            cell.swapped = false;
          }
        }
      }

      const cellW = width / cols;
      const cellH = height / rows;
      const size = Math.min(cellW, cellH) * (1 - gap);
      ctx.clearRect(0, 0, width, height);

      let remaining = 0;
      for (const cell of cells) {
        const dist = Math.hypot(cell.col - cx, cell.row - cy);
        let scale = reduced ? 1 : easeOutBack(clamp01((now - start - dist * WAVE_STEP_MS) / APPEAR_MS));
        let rotation = cell.turn;

        if (cell.swapStart >= 0 && now >= cell.swapStart) {
          const t = now - cell.swapStart;
          if (t < SWAP_OUT_MS) {
            scale *= 1 - easeInBack(t / SWAP_OUT_MS);
          } else {
            // Shrunk to nothing: trade in the new glyph and turn a quarter
            if (!cell.swapped) {
              cell.glyph = cell.next;
              cell.next = null;
              cell.turn += Math.PI / 2;
              cell.swapped = true;
            }
            const tin = clamp01((t - SWAP_OUT_MS) / SWAP_IN_MS);
            scale *= easeOutBack(tin);
            rotation = cell.turn - (Math.PI / 2) * (1 - tin);
            if (tin >= 1) cell.swapStart = -1;
          }
        }

        if (exit) {
          // Outside in: the edge goes first and the centre closes the loader
          const delay = (maxDist - dist) * 55;
          const t = clamp01((now - exit.at - delay) / 300);
          scale *= 1 - easeInBack(t);
          if (t < 1) remaining++;
        }

        if (cell.glyph) {
          drawGlyph(ctx, cell.glyph, (cell.col + 0.5) * cellW, (cell.row + 0.5) * cellH, size, scale, rotation);
        }
      }

      if (exit && !exit.done && remaining === 0) {
        exit.done = true;
        exit.onExited?.();
      }

      if (reduced) return;
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [cols, rows, gap, waveEvery]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ aspectRatio: `${cols} / ${rows}` }}
    />
  );
}
