import React from 'react';
import { Layout, Palette, Gauge, Accessibility, Package } from 'lucide-react';
import PageShell, { Section, SkillGroups } from '../components/PageShell';

const skillGroups = [
  {
    icon: Layout,
    title: "Core Stack",
    note: "React and TypeScript, with types describing every state a screen can be in",
    skills: ["React", "TypeScript", "JavaScript", "Vite", "React Native", "Hooks & Composition", "Client Routing", "State Management"]
  },
  {
    icon: Palette,
    title: "Styling & Motion",
    note: "A token-based design system that stays consistent as the product grows",
    skills: ["Tailwind CSS", "CSS Architecture", "Responsive Layouts", "Design Tokens", "Dark Mode", "CSS Animation", "Scroll-Driven Effects", "Typography"]
  },
  {
    icon: Gauge,
    title: "Performance",
    note: "Code splitting and lazy loading, so pages stay fast on mid-range phones",
    skills: ["Code Splitting", "Lazy Loading", "Bundle Analysis", "Image Optimisation", "Core Web Vitals", "Render Profiling", "Memoisation", "Caching"]
  },
  {
    icon: Accessibility,
    title: "Accessibility & UX",
    note: "Semantic markup and keyboard navigation, so the interface works for everyone",
    skills: ["Semantic HTML", "ARIA", "Keyboard Navigation", "Focus Management", "Reduced Motion", "Colour Contrast", "Progressive Enhancement", "Form UX"]
  },
  {
    icon: Package,
    title: "Tooling",
    note: "Type checks, linting and tests that catch mistakes before users do",
    skills: ["Vite", "ESLint", "Type Safety", "Component Testing", "Storybook-style Isolation", "CI/CD", "Vercel", "Firebase Hosting"]
  }
];

export default function Frontend() {
  return (
    <PageShell
      slug="/frontend"
      title="Frontend Engineering"
      intro="React and TypeScript interfaces built for speed, clarity and accessibility, including the one you're reading right now."
      tags={["React", "TypeScript", "Tailwind", "Vite", "Accessibility"]}
    >

      <Section
        eyebrow="Skills"
        heading="Experience gained from building real projects"
      >
        <SkillGroups groups={skillGroups} />
      </Section>
    </PageShell>
  );
}
