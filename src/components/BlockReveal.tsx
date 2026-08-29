import React, { useMemo } from 'react';

// A grid of small tiles that fill the viewport. On cover they pop in one by one
// in random order until the outgoing page is hidden; the route swaps behind
// them; on reveal they drop away in a fresh random order, slowly uncovering the
// new page. Durations here are re-exported for main.tsx to schedule the swap.
const TILE_PX = 48;

const COVER_TILE_MS = 260;
const COVER_SPREAD_MS = 620;
const UNCOVER_TILE_MS = 300;
const UNCOVER_SPREAD_MS = 980;

export const BLOCK_REVEAL_COVER_MS = COVER_TILE_MS + COVER_SPREAD_MS;
export const BLOCK_REVEAL_UNCOVER_MS = UNCOVER_TILE_MS + UNCOVER_SPREAD_MS;

export type BlockRevealPhase = 'idle' | 'cover' | 'reveal';

export default function BlockReveal({ phase }: { phase: BlockRevealPhase }) {
  if (phase === 'idle') return null;
  // Keyed by phase so each phase remounts: the animation replays from the start
  // and the tile order is reshuffled, so no two sweeps look the same.
  return <BlockRevealGrid key={phase} phase={phase} />;
}

function BlockRevealGrid({ phase }: { phase: 'cover' | 'reveal' }) {
  const { columns, rows, position, headerHeight } = useMemo(() => {
    // The header is translucent, so tiles behind it would still show through.
    // Start the grid underneath it instead and leave it out of the transition.
    const header = document.querySelector('[data-site-header]');
    const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : 0;

    const columns = Math.max(1, Math.ceil(window.innerWidth / TILE_PX));
    const rows = Math.max(1, Math.ceil((window.innerHeight - headerHeight) / TILE_PX));
    const total = columns * rows;

    // Fisher-Yates: position[tile] is where that tile falls in the sequence,
    // which becomes its delay. Random order, every tile used exactly once.
    const shuffled = Array.from({ length: total }, (_, i) => i);
    for (let i = total - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const position = new Array<number>(total);
    shuffled.forEach((tile, order) => {
      position[tile] = order;
    });

    return { columns, rows, position, headerHeight };
  }, []);

  const total = columns * rows;
  const spread = phase === 'cover' ? COVER_SPREAD_MS : UNCOVER_SPREAD_MS;

  return (
    <div
      className="block-reveal"
      aria-hidden="true"
      style={{
        top: headerHeight,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`block-reveal__tile block-reveal__tile--${phase}`}
          style={{ animationDelay: `${(position[i] / total) * spread}ms` }}
        />
      ))}
    </div>
  );
}
