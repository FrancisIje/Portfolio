import React, { useRef } from 'react';
import { useStaggerReveal } from './useStaggerReveal';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { SiteHeader } from './DisciplineNav';
import SiteFooter from './SiteFooter';
import ImageWithLoader from './ImageWithLoader';
import { projectHref, type Project } from '../data/projects';

const HEADING_FONT = '"Instrument Serif", Georgia, serif';

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

  useStaggerReveal(rootRef, slug);

  return (
    <div ref={rootRef} className="min-h-screen text-ink relative overflow-x-hidden">
      <div className="relative z-10">
        <SiteHeader slug={slug} />

        {/* Hero: mirrors the home hero exactly — same min-height, padding,
            container width, centring and type scale — so a page title lands in
            the same place on screen as "Francis Ijenebe" does. */}
        <section data-hero className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16">
          <div className="w-full max-w-5xl mx-auto px-5 text-center">
            {eyebrow && (
              <span className="text-xs uppercase tracking-[0.2em] text-accent mb-8 block">
                <AnimatedText text={eyebrow} stagger={30} />
              </span>
            )}
            <h1
              className="text-[clamp(2.75rem,7.5vw,5.5rem)] mb-8 tracking-[-0.02em] leading-[0.95]"
              style={{ fontFamily: HEADING_FONT }}
            >
              <AnimatedText text={title} stagger={48} />
            </h1>
            <p className="text-center text-lg md:text-xl text-ink/65 max-w-3xl mx-auto leading-[1.6] mb-10">
              <AnimatedText text={intro} delay={280} stagger={9} />
            </p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center">
                {tags.map((tag, idx) => (
                  <span key={idx} className="text-sm px-4 py-2 bg-white/70 border border-ink/10 rounded-full text-ink/60">
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
        <section className="py-20 px-6 md:px-12 border-t border-ink/10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="stagger-item text-5xl md:text-7xl mb-8 tracking-[-0.02em] leading-[1]" style={{ fontFamily: HEADING_FONT }}>
              <AnimatedText text={"Let's build\nsomething together"} stagger={40} />
            </h2>
            <p className="stagger-item text-xl text-ink/70 mb-12 max-w-2xl mx-auto">
              <AnimatedText
                text="Happy to walk through any of it in detail, whether that's the architecture, the tradeoffs, or the code behind it."
                stagger={8}
              />
            </p>
            <a href="mailto:ijenebefrancis@gmail.com"
               className="stagger-item inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper font-medium rounded-full hover:bg-ink/85 transition-all text-base group">
              <AnimatedText text="Get in Touch" stagger={26} />
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </div>
        </section>

        <SiteFooter />
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
      className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink/40 hover:text-ink transition-colors"
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
    <section className="py-16 px-6 md:px-12 border-t border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="stagger-item">
          <span className="text-xs uppercase tracking-[0.2em] text-accent mb-5 block"><AnimatedText text={eyebrow} stagger={30} /></span>
          <h2 className="text-4xl md:text-6xl mb-4 tracking-[-0.02em] leading-[1.05]" style={{ fontFamily: HEADING_FONT }}>
            {typeof heading === 'string' ? <AnimatedText text={heading} stagger={22} /> : heading}
          </h2>
          {lede && (
            <p className="text-ink/60 max-w-2xl mb-8 leading-relaxed">
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
          <div key={idx} className="stagger-item p-8 bg-white/70 backdrop-blur-sm border border-ink/10 rounded-2xl hover:bg-white">
            <div className="flex items-start gap-4 mb-6">
              <Icon className="w-6 h-6 text-ink/60 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">{group.title}</h3>
                <p className="text-sm text-ink/50 mt-1">{group.note}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, i) => (
                <span key={i} className="text-xs px-3 py-1 bg-paper border border-ink/10 rounded-full text-ink/60">
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
        <div key={idx} className="stagger-item p-8 bg-white/70 backdrop-blur-sm border border-ink/10 rounded-2xl hover:bg-white">
          <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
          <p className="text-ink/70 leading-relaxed">{card.body}</p>
        </div>
      ))}
    </div>
  );
}

// Wide project cards for a discipline page: the screenshot on its tint, then
// what this project shows about this particular discipline.
export function ProjectFeatures({ projects, slug }: { projects: Project[]; slug: string }) {
  return (
    <div className="space-y-6">
      {projects.map((project) => {
        const href = projectHref(project);
        return (
          <article
            key={project.title}
            className="stagger-item grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 md:gap-10 items-center p-4 md:p-5 bg-white/70 backdrop-blur-sm border border-ink/10 rounded-2xl"
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block aspect-[16/10] rounded-xl overflow-hidden flex items-center justify-center p-4 md:p-6"
              style={{ background: project.tint }}
              tabIndex={-1}
              aria-hidden="true"
            >
              <ImageWithLoader
                src={project.image}
                alt=""
                className="max-w-full max-h-full object-contain rounded-md transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </a>
            <div className="px-2 pb-2 md:p-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-serif text-4xl leading-none">{project.title}</h3>
                {project.isLive && (
                  <span className="text-xs px-2.5 py-0.5 bg-green-500/10 text-green-700 rounded-full">Live</span>
                )}
                {project.year && <span className="text-sm text-ink/40">{project.year}</span>}
              </div>
              <p className="text-ink/55 mb-4">{project.tagline}</p>
              <p className="text-ink/75 leading-relaxed mb-6">{project.notes?.[slug] ?? project.description}</p>
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-paper text-sm hover:bg-ink/85 transition-colors group"
                >
                  {href.replace(/^https?:\/\//, '')}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
