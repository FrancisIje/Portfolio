import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SiteFooter, { CopyEmail } from './src/components/SiteFooter';
import ImageWithLoader from './src/components/ImageWithLoader';
import { SiteHeader } from './src/components/DisciplineNav';
import { useStaggerReveal } from './src/components/useStaggerReveal';
import GlyphGrid from './src/effects/okazz/GlyphGrid';
import { disciplines } from './src/data/disciplines';
import { projects, projectHref, type Project } from './src/data/projects';

type Audience = {
  label: string;
  lead: string;
  mark: string;
  tail: string;
  sub: string;
};

// The hero headline, rewritten for whoever is reading. "Machines" gets the same
// facts as structured data instead.
const audiences: Audience[] = [
  {
    label: 'For everyone',
    lead: "Hi there, I'm Francis. I ",
    mark: 'design and ship software',
    tail: ' end to end, from the app in your hand to the backend behind it.',
    sub: 'Mobile apps, the interfaces around them, the backend architecture underneath, and the developer tooling that keeps it all moving.',
  },
  {
    label: 'Recruiters',
    lead: "I've shipped ",
    mark: 'production apps on both stores',
    tail: ' across healthcare, commerce and wellness, and I own the backend work behind them.',
    sub: 'Flutter and React Native, React and TypeScript, Node.js services, CI/CD. Happy to send a CV: the email is one click below.',
  },
  {
    label: 'Designers',
    lead: 'I work at the seam: ',
    mark: 'designing in the browser',
    tail: ', where motion, type and the last ten percent decide whether a product feels considered.',
    sub: 'Design tokens down to GLSL. The background on this page is generative too; the Design Eng page shows how it is made.',
  },
  {
    label: 'Developers',
    lead: 'I decide ',
    mark: 'service boundaries and failure modes',
    tail: ' before the code is written, then keep the feedback loop around it fast.',
    sub: 'Realtime with WebSockets and WebRTC, typed APIs, one-command setups, and the agent tooling around a codebase.',
  },
  {
    label: 'Founders',
    lead: 'I take a product from ',
    mark: 'idea to the App Store',
    tail: ', and make the scoping calls about what ships first and what waits.',
    sub: 'Rojar, Heala, Bookaleap and juju are live today. I can carry the whole stack or slot into a team.',
  },
  { label: 'Machines', lead: '', mark: '', tail: '', sub: '' },
];

const machineReadable = {
  name: 'Francis Ijenebe',
  role: 'Product & DevX Engineer',
  disciplines: disciplines.map((d) => d.title),
  shipped: projects.filter((p) => p.isLive).map((p) => p.title),
  stack: ['Flutter', 'React Native', 'React', 'TypeScript', 'Node.js', 'WebRTC', 'GLSL'],
  contact: 'ijenebefrancis@gmail.com',
  github: 'https://github.com/FrancisIje',
};

// One key per line with arrays kept inline, so it fits the hero
const machineJson = `{\n${Object.entries(machineReadable)
  .map(([key, value]) => `  "${key}": ${JSON.stringify(value).replace(/","/g, '", "')}`)
  .join(',\n')}\n}`;

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  useStaggerReveal(rootRef, '/');

  return (
    <div ref={rootRef} className="min-h-screen text-ink relative overflow-x-hidden">
      <div className="relative z-10">
        <SiteHeader />

        <main className="max-w-6xl mx-auto px-5 md:px-8">
          <Hero />
          <SelectWork />
          <Disciplines />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

function Hero() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const audience = audiences[active];

  // Arrow keys move between tabs, as in any tablist
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (active + (e.key === 'ArrowRight' ? 1 : audiences.length - 1)) % audiences.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="pt-36 md:pt-44 pb-20 md:pb-28 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-10 md:gap-16">
      <div className="stagger-item flex md:flex-col items-center md:items-start gap-5 md:gap-6">
        <div className="relative shrink-0">
          <img
            src="/francis.jpg"
            alt="Francis Ijenebe"
            width={900}
            height={900}
            className="w-24 h-24 md:w-56 md:h-64 rounded-2xl object-cover object-[50%_30%] shadow-[0_18px_40px_-20px_rgba(25,25,28,0.45)] ring-1 ring-ink/10"
          />
          {/* A single glyph tile stuck to the corner like a sticker */}
          <span className="absolute -right-3 -bottom-3 md:-right-4 md:-bottom-4 w-9 md:w-12 rotate-12 rounded-lg bg-paper p-1 shadow-sm ring-1 ring-ink/10">
            <GlyphGrid cols={1} rows={1} gap={0.08} waveEvery={2400} className="w-full block" />
          </span>
        </div>
        <div>
          <p className="font-serif text-accent text-[34px] md:text-[40px] leading-none tracking-[-0.01em]">Francis Ijenebe</p>
          <p className="mt-2 text-[15px] text-ink/55">Product &amp; DevX Engineer</p>
        </div>
      </div>

      <div>
        <div
          role="tablist"
          aria-label="Who is reading"
          onKeyDown={onKeyDown}
          className="stagger-item flex flex-wrap gap-x-5 gap-y-2 mb-6 text-[14px]"
        >
          {audiences.map((a, i) => (
            <button
              key={a.label}
              ref={(node) => { tabRefs.current[i] = node; }}
              type="button"
              role="tab"
              id={`aud-tab-${i}`}
              aria-selected={i === active}
              aria-controls="aud-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`transition-colors ${i === active ? 'text-accent font-medium' : 'text-ink/45 hover:text-ink'}`}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div id="aud-panel" role="tabpanel" aria-labelledby={`aud-tab-${active}`} className="stagger-item min-h-[15rem] md:min-h-[17rem]">
          {audience.label === 'Machines' ? (
            <pre key="machines" className="swap-in font-mono text-[12px] md:text-[13px] leading-relaxed text-ink/80 bg-white/75 ring-1 ring-ink/10 rounded-xl p-5 whitespace-pre-wrap break-words">
              {machineJson}
            </pre>
          ) : (
            <div key={active} className="swap-in">
              <h1 className="font-serif text-[clamp(2.1rem,4.2vw,3.1rem)] leading-[1.12] tracking-[-0.015em]">
                {audience.lead}
                <span className="mark">{audience.mark}</span>
                <InlineGlyph />
                {audience.tail}
              </h1>
              <p className="mt-6 text-[16px] md:text-[17px] leading-relaxed text-ink/60 max-w-xl">{audience.sub}</p>
            </div>
          )}
        </div>

        <div className="stagger-item mt-8 flex flex-wrap items-center gap-3">
          <CopyEmail />
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-ink/60 hover:text-ink transition-colors"
          >
            See the work <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// A glyph set into the line of type, the way the reference puts a little sun
// in its headline. It keeps reshuffling, so the sentence never sits still.
function InlineGlyph() {
  return (
    <span className="inline-block align-[-0.08em] w-[0.78em] mx-[0.12em]" aria-hidden="true">
      <GlyphGrid cols={1} rows={1} gap={0} waveEvery={2000} className="w-full block" />
    </span>
  );
}

function SelectWork() {
  return (
    <section id="work" className="pb-24 scroll-mt-28">
      <h2 className="stagger-item font-serif text-[32px] md:text-[36px] tracking-[-0.01em] mb-8">Select work</h2>
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
        <ThisSiteCard />
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const href = projectHref(project);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`stagger-item group block ${project.featured ? 'md:col-span-2' : ''}`}
    >
      <div
        className={`${project.featured ? 'aspect-[16/10] md:aspect-[2/1]' : 'aspect-[16/10]'} rounded-xl overflow-hidden ring-1 ring-ink/[0.06] flex items-center justify-center p-5 md:p-8`}
        style={{ background: project.tint }}
      >
        <ImageWithLoader
          src={project.image}
          alt={`${project.title} screenshots`}
          className="max-w-full max-h-full object-contain rounded-md transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
        />
      </div>
      <CardCaption
        title={project.title}
        tagline={project.tagline}
        badge={project.isLive ? 'Live' : project.year}
      />
    </a>
  );
}

// The sixth tile is the site itself: the loader's glyph grid, running live.
function ThisSiteCard() {
  return (
    <a href="/design-engineering" className="stagger-item group block">
      <div className="aspect-[16/10] rounded-xl overflow-hidden ring-1 ring-ink/[0.06] bg-[#eceaf6] flex items-center justify-center p-6">
        <GlyphGrid cols={8} rows={5} gap={0.3} waveEvery={1300} className="h-full max-w-full" label="Live generative glyph grid" />
      </div>
      <CardCaption
        title="This site"
        tagline="Generative background and loader after Okazz, in plain Canvas 2D."
        badge="2026"
        internal
      />
    </a>
  );
}

function CardCaption({ title, tagline, badge, internal = false }: {
  title: string;
  tagline: string;
  badge?: string;
  internal?: boolean;
}) {
  return (
    <div className="mt-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-[15px] font-medium flex items-center gap-2">
          {title}
          {!internal && <span className="sr-only">(opens in a new tab)</span>}
          {badge && (
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              badge === 'Live' ? 'bg-green-500/10 text-green-700' : 'bg-ink/[0.05] text-ink/50'
            }`}>
              {badge}
            </span>
          )}
        </h3>
        <p className="mt-1 text-[14px] text-ink/55 leading-snug">{tagline}</p>
      </div>
      <ArrowUpRight
        className="w-4 h-4 mt-1 shrink-0 text-ink/35 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        aria-hidden="true"
      />
    </div>
  );
}

function Disciplines() {
  return (
    <section className="pb-24">
      <h2 className="stagger-item font-serif text-[32px] md:text-[36px] tracking-[-0.01em] mb-3">What I do</h2>
      <p className="stagger-item text-ink/55 max-w-xl mb-8">Four disciplines, one person. Each has its own page with the detail.</p>
      <ul className="border-t border-ink/10">
        {disciplines.map((d, idx) => (
          <li key={d.slug} className="stagger-item border-b border-ink/10">
            <a href={d.slug} className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] md:grid-cols-[3rem_16rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-5 md:py-6">
              <span className="text-[12px] tabular-nums text-ink/35">{String(idx + 1).padStart(2, '0')}</span>
              <span className="font-serif text-[24px] md:text-[28px] leading-tight group-hover:text-accent transition-colors">{d.title}</span>
              <span className="hidden md:block text-[15px] text-ink/55">{d.blurb}</span>
              <ArrowUpRight className="w-4 h-4 text-ink/35 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              <span className="md:hidden col-start-2 col-span-2 mt-1 text-[14px] text-ink/55">{d.blurb}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
