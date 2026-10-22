import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { disciplines } from '../data/disciplines';

// The discipline index. Inline in the header from lg up; below that the strip
// runs along the bottom of the header bar, styled to match the inline links.

export function DisciplineStrip({ slug }: { slug?: string }) {
  return (
    <div
      // Same width and side padding as the header row, so the strip lines up
      // with the wordmark and icons instead of running edge to edge. Phones
      // split the width into equal columns so all four fit; from sm there is
      // room to group them in the middle with even gaps, as the inline nav does.
      className="max-w-6xl mx-auto px-5 md:px-8 grid sm:flex sm:justify-center sm:gap-10"
      style={{ gridTemplateColumns: `repeat(${disciplines.length}, minmax(0, 1fr))` }}
    >
      {disciplines.map((discipline) => {
        const isActive = discipline.slug === slug;
        return (
          <a
            key={discipline.slug}
            href={discipline.slug}
            aria-current={isActive ? 'page' : undefined}
            // Each label is centred in an equal share of the width. At 320px a
            // share is ~70px, which still fits the longest label ("Design Eng")
            // on one line at this size.
            className={`relative min-w-0 py-2.5 text-center text-[13px] sm:text-[14px] whitespace-nowrap transition-colors ${
              isActive ? 'text-accent' : 'text-ink/55 hover:text-ink'
            }`}
          >
            {discipline.label}
            {/* A short bar under the current page in place of a filled cell */}
            {isActive && (
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-6 rounded-full bg-accent" aria-hidden="true" />
            )}
          </a>
        );
      })}
    </div>
  );
}

// The header: a quiet bar across the top, wordmark on the left as on a
// letterhead. It frosts the page behind it only once you have scrolled.

export function SiteHeader({ slug }: { slug?: string }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      data-site-header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-paper/85 backdrop-blur-md border-b border-ink/10'
          // Unscrolled it stays open, but fades the background field out
          // behind the wordmark and links so no mark lands on them
          : 'bg-gradient-to-b from-paper via-paper/90 to-paper/0 border-b border-transparent'
      }`}
    >
      {/* From lg the bar is three columns with equal outer tracks, so the links
          sit on the true centre however wide the wordmark and icons are. */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] px-5 md:px-8 py-4">
        <a href="/" className="font-serif text-[28px] leading-none text-accent hover:opacity-80 transition-opacity shrink-0 justify-self-start">
          francis
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {disciplines.map((discipline) => {
            const isActive = discipline.slug === slug;
            return (
              <a
                key={discipline.slug}
                href={discipline.slug}
                aria-current={isActive ? 'page' : undefined}
                className={`text-[14px] whitespace-nowrap transition-colors ${
                  isActive ? 'text-accent' : 'text-ink/55 hover:text-ink'
                }`}
              >
                {discipline.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-4 shrink-0 justify-self-end">
          <a href="https://github.com/FrancisIje" target="_blank" rel="noopener noreferrer"
             aria-label="GitHub" className="text-ink/50 hover:text-ink transition-colors">
            <Github className="w-[18px] h-[18px]" />
          </a>
          <a href="https://www.linkedin.com/in/francis-ijenebe/" target="_blank" rel="noopener noreferrer"
             aria-label="LinkedIn" className="text-ink/50 hover:text-ink transition-colors">
            <Linkedin className="w-[18px] h-[18px]" />
          </a>
          <a href="mailto:ijenebefrancis@gmail.com"
             aria-label="Email" className="text-ink/50 hover:text-ink transition-colors">
            <Mail className="w-[18px] h-[18px]" />
          </a>
        </div>
      </div>

      {/* Below lg there is no room for the links inline, so they run along the
          bottom of the same bar. */}
      <div className={`lg:hidden border-t ${scrolled ? 'border-ink/10' : 'border-transparent'}`}>
        <DisciplineStrip slug={slug} />
      </div>
    </nav>
  );
}
