import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SiteBackground from './SiteBackground';
import AnimatedText from './AnimatedText';
import { SiteHeader } from './DisciplineNav';
import { disciplines } from '../data/disciplines';

const HEADING_FONT = '"Space Grotesk", "Inter", system-ui, sans-serif';

export type SkillGroup = {
  icon: LucideIcon;
  title: string;
  note: string;
  skills: string[];
};

export type Card = {
  title: string;
  body: string;
};

type PageShellProps = {
  slug: string;
  eyebrow?: string;
  title: string;
  intro: string;
  tags?: string[];
  children: React.ReactNode;
};

// Shared chrome for every discipline page: background, nav, hero, the
// cross-page switcher, contact CTA and footer. Pages supply only their
// own sections as children.
export default function PageShell({ slug, eyebrow, title, intro, tags = [], children }: PageShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);

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
  }, [slug]);

  return (
    <div ref={rootRef} className="min-h-screen bg-black text-white relative overflow-x-hidden" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
      <SiteBackground baseHue={disciplines.find((d) => d.slug === slug)?.hue ?? 0} />

      <div className="relative z-10">
        <SiteHeader slug={slug} />

        {/* Hero: mirrors the home hero exactly — same min-height, padding,
            container width, centring and type scale — so a page title lands in
            the same place on screen as "Francis Ijenebe" does. */}
        <section data-hero className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16">
          <div className="w-full max-w-5xl mx-auto px-5 text-center">
            {eyebrow && (
              <span className="text-sm uppercase tracking-widest text-white/60 mb-8 block">
                <AnimatedText text={eyebrow} stagger={30} />
              </span>
            )}
            <h1
              className="text-[clamp(2.5rem,6.6vw,4.75rem)] font-bold mb-10 tracking-[-0.045em] leading-[0.95]"
              style={{ fontFamily: HEADING_FONT }}
            >
              <AnimatedText text={title} stagger={48} />
            </h1>
            <p className="text-center text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-[1.6] mb-10">
              <AnimatedText text={intro} delay={280} stagger={9} />
            </p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center">
                {tags.map((tag, idx) => (
                  <span key={idx} className="text-base px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/60 uppercase tracking-wider">
                    <AnimatedText text={tag} delay={600 + idx * 90} stagger={16} />
                  </span>
                ))}
              </div>
            )}
          </div>

          <ScrollCue />
        </section>

        {children}


        {/* Contact CTA */}
        <section className="py-20 px-6 md:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="stagger-item text-4xl md:text-6xl font-semibold mb-8 tracking-[-0.03em] leading-tight" style={{ fontFamily: HEADING_FONT }}>
              <AnimatedText text={"Let's build\nsomething together"} stagger={40} />
            </h2>
            <p className="stagger-item text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              <AnimatedText
                text="Happy to walk through any of it in detail, whether that's the architecture, the tradeoffs, or the code behind it."
                stagger={8}
              />
            </p>
            <a href="mailto:ijenebefrancis@gmail.com"
               className="stagger-item inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all text-lg group">
              <AnimatedText text="Get in Touch" stagger={26} />
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/60"><AnimatedText text="© 2026 Francis Ije. All rights reserved." stagger={12} /></p>
            <a href="/" className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider">
              Back to Portfolio
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Bouncing arrow at the foot of the hero: signals there is more below, and
// scrolls to it when clicked.
function ScrollCue() {
  return (
    <button
      type="button"
      onClick={() => {
        const hero = document.querySelector('[data-hero]');
        const top = hero
          ? hero.getBoundingClientRect().bottom + window.scrollY
          : window.innerHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }}
      aria-label="Scroll to content"
      className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 hover:text-white transition-colors"
    >
      <ArrowDown className="scroll-cue w-6 h-6" />
    </button>
  );
}

// Section wrapper with the eyebrow / heading / lede pattern used across pages.
export function Section({ eyebrow, heading, lede, children }: {
  eyebrow: string;
  heading: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="stagger-item">
          <span className="text-sm uppercase tracking-widest text-white/60 mb-5 block"><AnimatedText text={eyebrow} stagger={30} /></span>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 tracking-[-0.025em]" style={{ fontFamily: HEADING_FONT }}>
            {typeof heading === 'string' ? <AnimatedText text={heading} stagger={22} /> : heading}
          </h2>
          {lede && (
            <p className="text-white/60 max-w-2xl mb-8 leading-relaxed">
              {typeof lede === 'string' ? <AnimatedText text={lede} delay={200} stagger={8} /> : lede}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

// Icon + title + note + skill pills. Same shape as the GCP page's skill groups.
export function SkillGroups({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="space-y-4">
      {groups.map((group, idx) => {
        const Icon = group.icon;
        return (
          <div key={idx} className="stagger-item p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10">
            <div className="flex items-start gap-4 mb-6">
              <Icon className="w-6 h-6 text-white/60 shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold">{group.title}</h3>
                <p className="text-sm text-white/50 mt-1">{group.note}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, i) => (
                <span key={i} className="text-xs px-3 py-1 bg-black/60 border border-white/10 rounded-full text-white/60">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Plain title/body cards in a responsive grid.
export function CardGrid({ cards, columns = 2 }: { cards: Card[]; columns?: 2 | 3 }) {
  const gridClass = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
  return (
    <div className={`grid ${gridClass} gap-4`}>
      {cards.map((card, idx) => (
        <div key={idx} className="stagger-item p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10">
          <h3 className="text-xl font-bold mb-3">{card.title}</h3>
          <p className="text-white/70 leading-relaxed">{card.body}</p>
        </div>
      ))}
    </div>
  );
}
