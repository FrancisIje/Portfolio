import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { disciplines } from '../data/disciplines';

// The discipline index. Inline in the header from lg up; below that the strip
// runs along the bottom of the header bar.

const INDEX = (idx: number) => String(idx + 1).padStart(2, '0');

export function DisciplineStrip({ slug }: { slug?: string }) {
  return (
    <div className="grid grid-cols-5 divide-x divide-white/10">
      {disciplines.map((discipline, idx) => {
        const isActive = discipline.slug === slug;
        return (
          <a
            key={discipline.slug}
            href={discipline.slug}
            aria-current={isActive ? 'page' : undefined}
            // Five columns share the width at every size, so on a 320px phone a
            // column is only ~64px. The padding has to stay small there or the
            // longest label ("Platform") no longer has room on one line.
            className={`group relative min-w-0 px-1 py-2 md:px-4 md:py-3 transition-colors ${
              isActive ? 'bg-white/[0.06]' : 'hover:bg-white/[0.06]'
            }`}
          >
            <span
              className={`block text-[clamp(8px,2.2vw,10px)] leading-none tabular-nums mb-1 md:mb-2 ${
                isActive ? 'text-white/60' : 'text-white/30'
              }`}
            >
              {INDEX(idx)}
            </span>
            <span
              // Wraps rather than running off the side, and the letterspacing
              // that gives the strip its look is only affordable once there is
              // width for it — at 320px it is what pushes "Platform" over.
              className={`block text-[clamp(9px,2.6vw,11px)] uppercase leading-[1.3] tracking-[0.02em] md:tracking-[0.12em] transition-colors ${
                isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
              }`}
            >
              {discipline.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

// The header: a centred bar attached to the top edge, square where it meets the
// top and rounded along the bottom.

export function SiteHeader({ slug }: { slug?: string }) {
  return (
    <nav
      data-site-header
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl"
    >
      <div className="overflow-hidden rounded-b-2xl border border-t-0 border-white/20 bg-black shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between gap-4 px-3 py-3">
          <a href="/" className="flex items-center gap-2.5 pl-2 shrink-0 hover:opacity-80 transition-opacity">
            <img src="/favicon.svg" alt="" className="h-7 w-7 rounded-md" />
            <span className="text-[15px] font-semibold tracking-tight">Francis</span>
          </a>

          <div className="hidden lg:flex items-center gap-5">
            {disciplines.map((discipline) => {
              const isActive = discipline.slug === slug;
              return (
                <a
                  key={discipline.slug}
                  href={discipline.slug}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-[14px] whitespace-nowrap transition-colors ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {discipline.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4 shrink-0 pr-2">
            <a href="https://github.com/FrancisIje" target="_blank" rel="noopener noreferrer"
               aria-label="GitHub" className="text-white/60 hover:text-white transition-colors">
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.linkedin.com/in/francis-ijenebe/" target="_blank" rel="noopener noreferrer"
               aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors">
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a href="mailto:ijenebefrancis@gmail.com"
               aria-label="Email" className="text-white/60 hover:text-white transition-colors">
              <Mail className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>

        {/* Below lg there is no room for the links inline, so they run along the
            bottom of the same bar. At xl the left rail takes over from both. */}
        <div className="lg:hidden border-t border-white/10">
          <DisciplineStrip slug={slug} />
        </div>
      </div>
    </nav>
  );
}
