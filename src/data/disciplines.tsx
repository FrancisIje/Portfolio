import { Palette, Smartphone, Server, Terminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Discipline = {
  slug: string;
  hue: number;
  icon: LucideIcon;
  label: string;
  title: string;
  blurb: string;
};

// Single source of truth for the discipline pages. Drives the home page
// nav grid, the cross-page switcher in PageShell, and each page's background hue.
export const disciplines: Discipline[] = [
  {
    slug: '/design-engineering',
    hue: 265,
    icon: Palette,
    label: 'Design Eng',
    title: 'Design Engineering',
    blurb: 'Interface craft, motion and realtime graphics, from design tokens down to GLSL.',
  },
  {
    slug: '/mobile',
    hue: 0,
    icon: Smartphone,
    label: 'Mobile',
    title: 'Mobile Development',
    blurb: 'React Native and Flutter apps, shipped to the App Store and Play Store.',
  },
  {
    slug: '/backend',
    hue: 145,
    icon: Server,
    label: 'Backend',
    title: 'Backend Architecture',
    blurb: 'Service boundaries, data models and failure modes, decided before the code is written.',
  },
  {
    slug: '/devx',
    hue: 40,
    icon: Terminal,
    label: 'DevX',
    title: 'Developer Experience',
    blurb: 'Tooling built on AI, agent infrastructure and the feedback loops around a codebase.',
  },
];

// Slugs that used to exist, mapped to where their content lives now. Old links
// and bookmarks land on the right page instead of the home hero.
export const legacyRedirects: Record<string, string> = {
  '/frontend': '/design-engineering',
  '/webgl': '/design-engineering',
  // Platform Engineering was retired outright; its old links land on the home page
  '/platform-engineering': '/',
  '/infrastructure': '/',
  '/gtm-engineering': '/devx',
};
