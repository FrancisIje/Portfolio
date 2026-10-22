import { useEffect, type RefObject } from 'react';

// Scroll reveal for every `.stagger-item` inside `rootRef`, re-run when `key`
// changes (the route).
export function useStaggerReveal(rootRef: RefObject<HTMLElement | null>, key: string) {
  // Scroll reveal. Every card and heading block is watched individually and
  // lifts into place the first time it nears the viewport, then is unobserved:
  // the reveal is one-way. The previous version watched whole sections and
  // stripped the class again on the way out, which faded entire sections back
  // to transparent as you scrolled past them — on a phone, where a section is
  // barely taller than the viewport, that read as the background flashing
  // through the page.
  useEffect(() => {
    window.scrollTo(0, 0);

    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>('.stagger-item');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('animate-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Cards that cross the line in the same batch — a row of a grid, say —
        // cascade instead of all arriving at once.
        let order = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target as HTMLElement;
          item.style.transitionDelay = `${order++ * 70}ms`;
          item.classList.add('animate-in');
          observer.unobserve(item);
        });
      },
      // Trips a little before the item is fully on screen, so its motion has
      // settled by the time it reaches a comfortable reading position.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [rootRef, key]);
}
