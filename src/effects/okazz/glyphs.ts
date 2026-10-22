// Geometric glyphs in the style of Okazz's tile grids: a base shape with a
// motif stamped on top and sometimes a dot in the middle, each in a different
// colour from a small flat palette. Pure Canvas 2D, shared by the intro loader,
// the image loader and the project card that previews the effect.

export const GLYPH_PALETTE = [
  '#1b1b1f', // ink
  '#f5c400', // yellow
  '#ea4b2a', // vermilion
  '#f080b0', // pink
  '#25b4c3', // teal
  '#2f55d4', // blue
  '#1e9a57', // green
  '#9fd0f2', // sky
];

const BASES = ['square', 'circle', 'diamond', 'none'] as const;
const MOTIFS = ['cross', 'plus', 'petals', 'bowtie', 'hourglass', 'ring', 'square', 'diamond'] as const;

export type Glyph = {
  base: (typeof BASES)[number];
  baseColor: string;
  motif: (typeof MOTIFS)[number];
  motifColor: string;
  dot: boolean;
  dotColor: string;
};

const pick = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];

// Three colours that are all different, so a motif never vanishes into its base.
export function randomGlyph(): Glyph {
  const [a, b, c] = [...GLYPH_PALETTE].sort(() => Math.random() - 0.5);
  return {
    base: pick(BASES),
    baseColor: a,
    motif: pick(MOTIFS),
    motifColor: b,
    dot: Math.random() < 0.45,
    dotColor: c,
  };
}

// Draws one glyph centred on (x, y) filling a `size` box, scaled by `scale`
// (0 hidden, 1 full) and turned by `rotation` radians.
export function drawGlyph(
  ctx: CanvasRenderingContext2D,
  glyph: Glyph,
  x: number,
  y: number,
  size: number,
  scale = 1,
  rotation = 0
) {
  if (scale <= 0.001) return;
  const h = (size / 2) * scale;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  ctx.fillStyle = glyph.baseColor;
  if (glyph.base === 'square') {
    ctx.fillRect(-h, -h, h * 2, h * 2);
  } else if (glyph.base === 'circle') {
    circle(ctx, 0, 0, h);
  } else if (glyph.base === 'diamond') {
    poly(ctx, [[0, -h * 1.05], [h * 1.05, 0], [0, h * 1.05], [-h * 1.05, 0]]);
  }

  // A glyph with no base draws its motif at full size, otherwise inset.
  const m = glyph.base === 'none' ? h : h * 0.72;
  ctx.fillStyle = glyph.motifColor;
  ctx.strokeStyle = glyph.motifColor;

  switch (glyph.motif) {
    case 'cross': {
      ctx.lineWidth = m * 0.55;
      ctx.lineCap = 'butt';
      ctx.beginPath();
      ctx.moveTo(-m * 0.8, -m * 0.8); ctx.lineTo(m * 0.8, m * 0.8);
      ctx.moveTo(m * 0.8, -m * 0.8); ctx.lineTo(-m * 0.8, m * 0.8);
      ctx.stroke();
      break;
    }
    case 'plus': {
      const t = m * 0.36;
      ctx.fillRect(-t, -m, t * 2, m * 2);
      ctx.fillRect(-m, -t, m * 2, t * 2);
      break;
    }
    case 'petals': {
      const r = m * 0.46;
      circle(ctx, 0, -m + r, r);
      circle(ctx, m - r, 0, r);
      circle(ctx, 0, m - r, r);
      circle(ctx, -m + r, 0, r);
      break;
    }
    case 'bowtie':
      poly(ctx, [[-m, -m], [0, 0], [-m, m]]);
      poly(ctx, [[m, -m], [0, 0], [m, m]]);
      break;
    case 'hourglass':
      poly(ctx, [[-m, -m], [m, -m], [0, 0]]);
      poly(ctx, [[-m, m], [m, m], [0, 0]]);
      break;
    case 'ring':
      ctx.lineWidth = m * 0.32;
      ctx.beginPath();
      ctx.arc(0, 0, m * 0.78, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'square':
      ctx.fillRect(-m * 0.55, -m * 0.55, m * 1.1, m * 1.1);
      break;
    case 'diamond':
      poly(ctx, [[0, -m], [m, 0], [0, m], [-m, 0]]);
      break;
  }

  if (glyph.dot) {
    ctx.fillStyle = glyph.dotColor;
    circle(ctx, 0, 0, m * 0.24);
  }

  ctx.restore();
}

function circle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function poly(ctx: CanvasRenderingContext2D, points: number[][]) {
  ctx.beginPath();
  points.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
  ctx.closePath();
  ctx.fill();
}

export const easeOutBack = (t: number) => {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

export const easeInBack = (t: number) => {
  const c = 1.70158;
  return (c + 1) * t * t * t - c * t * t;
};

export const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
