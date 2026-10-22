import React, { useEffect, useRef } from 'react';
import { clamp01, easeInBack, easeOutBack } from './glyphs';

// Site background after Okazz's hexagon sketches: on an invisible pointy-top
// hex lattice, small marks pop up — filled and outlined hexagons, dots, spoked
// stars, dotted rings, linked pairs and little honeycomb clusters — hold for a
// few seconds, then shrink away, in a primary red / yellow / blue / ink palette.
// Kept sparse so it reads as texture behind the copy rather than competing
// with it. Canvas 2D: a few dozen shapes a frame needs nothing heavier.

const COLORS = ['#e8402b', '#f5c400', '#2f55d4', '#1b1b1f'];
const KINDS = ['hex', 'hexOutline', 'dot', 'spokes', 'dashRing', 'link', 'cluster'] as const;
type Kind = (typeof KINDS)[number];

type Mark = {
  kind: Kind;
  col: number;
  row: number;
  color: string;
  accent: string;
  // Cells added to a cluster or the far end of a link, in lattice coordinates
  extra: [number, number][];
  born: number;
  life: number;
  spin: number;
};

const IN_MS = 650;
const OUT_MS = 500;
// Lattice spacing in CSS pixels, before the small-screen reduction
const CELL = 30;

// Neighbour offsets on an odd-row-shifted pointy-top lattice
const NEIGHBOURS_EVEN: [number, number][] = [[1, 0], [-1, 0], [0, -1], [-1, -1], [0, 1], [-1, 1]];
const NEIGHBOURS_ODD: [number, number][] = [[1, 0], [-1, 0], [1, -1], [0, -1], [1, 1], [0, 1]];

const pick = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];

export default function HexField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let r = CELL;
    let cols = 0;
    let rows = 0;
    let target = 0;
    const marks: Mark[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      r = width < 640 ? CELL * 0.8 : CELL;
      cols = Math.ceil(width / (Math.sqrt(3) * r)) + 1;
      rows = Math.ceil(height / (1.5 * r)) + 1;
      // Roughly one mark per 26k square pixels: a handful on a phone, a few
      // dozen on a desktop monitor.
      target = Math.max(10, Math.round((width * height) / 26000));
    };

    const toPixel = (col: number, row: number): [number, number] => {
      const w = Math.sqrt(3) * r;
      return [col * w + (row & 1 ? w / 2 : 0), row * 1.5 * r];
    };

    const occupied = (col: number, row: number) =>
      marks.some((m) => (m.col === col && m.row === row) || m.extra.some(([c, rr]) => c === col && rr === row));

    const spawn = (now: number, at?: [number, number]) => {
      for (let tries = 0; tries < 8; tries++) {
        const col = at ? at[0] : Math.floor(Math.random() * cols);
        const row = at ? at[1] : Math.floor(Math.random() * rows);
        if (occupied(col, row)) {
          if (at) return;
          continue;
        }
        const kind: Kind = at ? pick(['dot', 'hex', 'hexOutline'] as const) : pick(KINDS);
        const color = pick(COLORS);
        const extra: [number, number][] = [];

        if (kind === 'cluster' || kind === 'link') {
          let [c, rr] = [col, row];
          const length = kind === 'link' ? 1 + Math.floor(Math.random() * 2) : 1 + Math.floor(Math.random() * 3);
          for (let i = 0; i < length; i++) {
            const [dc, dr] = pick(rr & 1 ? NEIGHBOURS_ODD : NEIGHBOURS_EVEN);
            c += dc;
            rr += dr;
            if (kind === 'link') {
              // Links skip a cell so the connecting line has some length to it
              const [dc2, dr2] = pick(rr & 1 ? NEIGHBOURS_ODD : NEIGHBOURS_EVEN);
              c += dc2;
              rr += dr2;
            }
            extra.push([c, rr]);
          }
        }

        marks.push({
          kind,
          col,
          row,
          color,
          accent: pick(COLORS.filter((x) => x !== color)),
          extra,
          // Staggered on first fill so the field does not all bloom at once
          born: now,
          life: 3200 + Math.random() * 5200,
          spin: (Math.random() - 0.5) * 0.0006,
        });
        return;
      }
    };

    const hexPath = (x: number, y: number, radius: number, rot = 0) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = rot + Math.PI / 6 + (i * Math.PI) / 3;
        const px = x + Math.cos(a) * radius;
        const py = y + Math.sin(a) * radius;
        if (i) ctx.lineTo(px, py);
        else ctx.moveTo(px, py);
      }
      ctx.closePath();
    };

    const drawMark = (m: Mark, now: number) => {
      const age = now - m.born;
      const appear = reduced ? 1 : easeOutBack(clamp01(age / IN_MS));
      const vanish = reduced ? 0 : easeInBack(clamp01((age - m.life) / OUT_MS));
      const s = Math.max(0, appear * (1 - vanish));
      if (s <= 0.001) return;

      const [x, y] = toPixel(m.col, m.row);
      const size = r * 0.48 * s;
      const rot = m.spin * age;

      ctx.fillStyle = m.color;
      ctx.strokeStyle = m.color;
      ctx.lineWidth = Math.max(1.2, r * 0.07);

      switch (m.kind) {
        case 'hex':
          hexPath(x, y, size);
          ctx.fill();
          ctx.fillStyle = m.accent;
          hexPath(x, y, size * 0.32);
          ctx.fill();
          break;
        case 'hexOutline':
          ctx.lineWidth = Math.max(1.5, r * 0.09);
          hexPath(x, y, size * 0.9);
          ctx.stroke();
          break;
        case 'dot':
          ctx.beginPath();
          ctx.arc(x, y, size * 0.36, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'spokes':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = rot + (i * Math.PI) / 3;
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(a) * size, y + Math.sin(a) * size);
          }
          ctx.stroke();
          hexPath(x, y, size, rot);
          ctx.stroke();
          break;
        case 'dashRing':
          for (let i = 0; i < 8; i++) {
            const a = rot * 3 + (i * Math.PI) / 4;
            ctx.beginPath();
            ctx.arc(x + Math.cos(a) * size * 0.8, y + Math.sin(a) * size * 0.8, Math.max(1, size * 0.1), 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        case 'link': {
          let [px, py] = [x, y];
          ctx.lineWidth = Math.max(1, r * 0.05);
          for (const [c, rr] of m.extra) {
            const [nx, ny] = toPixel(c, rr);
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + (nx - px) * s, py + (ny - py) * s);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(px + (nx - px) * s, py + (ny - py) * s, size * 0.3, 0, Math.PI * 2);
            ctx.fill();
            [px, py] = [nx, ny];
          }
          ctx.beginPath();
          ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
        case 'cluster': {
          // Each cell of the honeycomb arrives a beat after the last
          const cells: [number, number][] = [[m.col, m.row], ...m.extra];
          cells.forEach(([c, rr], i) => {
            const local = reduced ? 1 : easeOutBack(clamp01((age - i * 160) / IN_MS)) * (1 - vanish);
            if (local <= 0.001) return;
            const [cx, cy] = toPixel(c, rr);
            ctx.fillStyle = i % 2 ? m.accent : m.color;
            hexPath(cx, cy, r * 0.5 * local);
            ctx.fill();
          });
          break;
        }
      }
    };

    resize();
    const now0 = performance.now();
    for (let i = 0; i < target; i++) {
      spawn(now0 - Math.random() * 3000);
    }

    // The cursor leaves the odd small mark behind it as it moves
    let lastTrail = 0;
    const onPointer = (e: PointerEvent) => {
      if (reduced || e.pointerType !== 'mouse') return;
      const now = performance.now();
      if (now - lastTrail < 140) return;
      lastTrail = now;
      const row = Math.round(e.clientY / (1.5 * r));
      const col = Math.round((e.clientX - (row & 1 ? (Math.sqrt(3) * r) / 2 : 0)) / (Math.sqrt(3) * r));
      spawn(now, [col, row]);
      const last = marks[marks.length - 1];
      if (last && last.col === col && last.row === row) last.life = 900 + Math.random() * 900;
    };

    let frame = 0;
    const tick = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      for (let i = marks.length - 1; i >= 0; i--) {
        const m = marks[i];
        if (now - m.born > m.life + OUT_MS) marks.splice(i, 1);
      }
      // Top back up a little at a time rather than in bursts
      if (marks.length < target && Math.random() < 0.08) spawn(now);
      for (const m of marks) drawMark(m, now);
      if (!reduced) frame = requestAnimationFrame(tick);
    };

    const onResize = () => {
      resize();
      if (reduced) tick(performance.now());
    };

    // Nothing to animate in a background tab
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduced) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
