import { Smartphone, TrendingUp, Cloud, Server, Layout, Orbit } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Discipline = {
  slug: string;
  hue: number;
  icon: LucideIcon;
  label: string;
  title: string;
  blurb: string;
};

// Single source of truth for the six discipline pages. Drives the home page
// nav grid, the cross-page switcher in PageShell, and each page's background hue.
export const disciplines: Discipline[] = [
  {
    slug: '/mobile',
    hue: 0,
    icon: Smartphone,
    label: 'Mobile Dev',
    title: 'Mobile Development',
    blurb: 'React Native and Flutter apps, shipped to the App Store and Play Store.',
  },
  {
    slug: '/gtm-engineering',
    hue: 40,
    icon: TrendingUp,
    label: 'GTM Engineering',
    title: 'GTM Engineering',
    blurb: 'Automation, AI-powered workflows, growth tooling and the analytics behind them.',
  },
  {
    slug: '/infrastructure',
    hue: 190,
    icon: Cloud,
    label: 'Infrastructure',
    title: 'Infrastructure Engineering',
    blurb: 'Cloud architecture and deployment on GCP and Azure, with the CI/CD to match.',
  },
  {
    slug: '/backend',
    hue: 145,
    icon: Server,
    label: 'Backend',
    title: 'Backend Engineering',
    blurb: 'APIs, real-time systems and data layers in Node, Python, Go and Dart.',
  },
  {
    slug: '/frontend',
    hue: 265,
    icon: Layout,
    label: 'Frontend',
    title: 'Frontend Engineering',
    blurb: 'React and TypeScript interfaces built for speed, clarity and accessibility.',
  },
  {
    slug: '/webgl',
    hue: 305,
    icon: Orbit,
    label: 'WebGL',
    title: 'WebGL & Shaders',
    blurb: 'GLSL, Three.js and real-time graphics on the open web.',
  },
];
