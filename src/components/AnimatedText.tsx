import React, { useEffect, useRef, useState } from 'react';

// Character-by-character reveal. Each letter sits in its own overflow-hidden box
// and rises into it, staggered, so a heading types itself into place. Letters
// are grouped per word so a word never breaks across a line, with real space
// characters between words so the text still copies and reads correctly.
// Newlines in `text` become line breaks.
export default function AnimatedText({
  text,
  delay = 0,
  stagger = 28,
  className = '',
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  let index = 0;

  return (
    <span
      ref={ref}
      className={`animated-text${revealed ? ' is-revealed' : ''}${className ? ` ${className}` : ''}`}
    >
      {text.split('\n').map((line, lineIndex) => (
        <span key={lineIndex} className="animated-text__line">
          {line.split(' ').map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              <span className="animated-text__word">
                {Array.from(word).map((character, charIndex) => {
                  const order = index++;
                  return (
                    <span key={charIndex} className="animated-text__char">
                      <span
                        className="animated-text__inner"
                        style={{ transitionDelay: `${delay + order * stagger}ms` }}
                      >
                        {character}
                      </span>
                    </span>
                  );
                })}
              </span>
              {/* A real space, so the text copies and reads as words rather
                  than one run-together string. The gap is not CSS margin. */}
              {wordIndex < line.split(' ').length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </span>
      ))}
    </span>
  );
}

// Shifts an element against the scroll so it drifts at its own rate. Positive
// strength lags the scroll, negative leads it. Writes transform directly rather
// than through state, so it never re-renders on scroll.
export function useParallax<T extends HTMLElement>(strength = 0.12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // A coarse pointer means a touch screen, where this costs a layout read on
    // every scroll frame and the drift is barely legible anyway. Skip it there
    // and let the card carry the motion on its own.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const fromCentre = rect.top + rect.height / 2 - window.innerHeight / 2;
      node.style.transform = `translate3d(0, ${(fromCentre * strength).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      node.style.transform = '';
    };
  }, [strength]);

  return ref;
}
