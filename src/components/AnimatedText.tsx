import React, { useEffect, useMemo, useRef } from 'react';

// Character-by-character reveal. Each word is an overflow-hidden box and its
// letters rise into it, staggered, so a heading types itself into place. Words
// never break across a line, and real space characters sit between them so the
// text still copies and reads correctly. Newlines in `text` become line breaks.
//
// One element per letter, built once: the reveal is a class added straight to
// the DOM rather than state, so it never re-renders the letters. Pages carry
// several hundred of them, and in development every element React creates
// costs a stack capture, which is what used to stall page transitions.
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
  // Kept in the className too, so a parent re-render cannot strip it again
  const revealedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => {
      revealedRef.current = true;
      node.classList.add('is-revealed');
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const letters = useMemo(() => {
    let index = 0;
    return text.split('\n').map((line, lineIndex) => {
      const words = line.split(' ');
      return (
        <span key={lineIndex} className="animated-text__line">
          {words.map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              <span className="animated-text__word">
                {Array.from(word).map((character, charIndex) => (
                  <span
                    key={charIndex}
                    className="animated-text__char"
                    style={{ transitionDelay: `${delay + index++ * stagger}ms` }}
                  >
                    {character}
                  </span>
                ))}
              </span>
              {/* A real space, so the text copies and reads as words rather
                  than one run-together string. The gap is not CSS margin. */}
              {wordIndex < words.length - 1 ? ' ' : null}
            </React.Fragment>
          ))}
        </span>
      );
    });
  }, [text, delay, stagger]);

  return (
    <span
      ref={ref}
      className={`animated-text${revealedRef.current ? ' is-revealed' : ''}${className ? ` ${className}` : ''}`}
    >
      {letters}
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
