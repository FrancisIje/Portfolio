import React from 'react';
import { Layout, Palette, Sparkles, Code2, Orbit, Gauge, Accessibility, Package } from 'lucide-react';
import PageShell, { Section, SkillGroups, CardGrid } from '../components/PageShell';

const approach = [
  {
    title: "Design in the browser",
    body: "A mock can't tell you how a transition feels at 60fps, how a layout breaks at 380px, or what happens while the data is still loading. I get the real thing on screen early and make the decisions where they actually land."
  },
  {
    title: "Tokens over one-offs",
    body: "Spacing, colour, type scale and motion timing live in one place and everything reads from it. It's what keeps the twentieth screen looking like the first, and it's the difference between a design system and a folder of components."
  },
  {
    title: "Motion has to mean something",
    body: "Every transition should answer where a thing came from or what just changed. Motion that doesn't carry information is latency with extra steps, so it gets cut, gated behind prefers-reduced-motion, or made interruptible."
  },
  {
    title: "The last ten percent is the product",
    body: "Focus rings, empty states, the loading skeleton, the moment a button is held down. None of it shows up in a spec, all of it is what people mean when they say something feels good."
  }
];

const work = [
  {
    title: "The background on this site",
    body: "A raw WebGL fragment shader running organic blob motion behind every page. No library, no video, just one fullscreen quad and a GLSL program. It resizes with the window and costs a fraction of what an equivalent looping video would."
  },
  {
    title: "Procedural over asset-heavy",
    body: "A shader that generates its imagery ships as a few kilobytes of text. Replacing decorative video and large image sequences with procedural graphics is usually the single biggest win available on page weight."
  },
  {
    title: "Type and layout that hold up",
    body: "Fluid type scales with clamp(), a container that keeps line length readable at any width, and headings that land in the same place on every page. Consistency you notice only when it's missing."
  },
  {
    title: "Graphics that respect the device",
    body: "Effects gate on visibility, clamp their pixel ratio, honour prefers-reduced-motion and release every frame, buffer and program on teardown. A background should never be the reason a laptop fan spins up."
  },
  {
    title: "Canvas 2D when WebGL is overkill",
    body: "Not every effect needs the GPU. Plenty of arc, signal and particle work is cleaner and more portable as a plain Canvas 2D render loop, and I'll pick that when it wins."
  },
  {
    title: "Accessible by construction",
    body: "Semantic elements before ARIA, keyboard paths tested alongside pointer ones, contrast checked against the actual background rather than a swatch. Retrofitting access costs more than building with it."
  }
];

const skillGroups = [
  {
    icon: Layout,
    title: "Interface Foundations",
    note: "React and TypeScript, with types describing every state a screen can be in",
    skills: ["React", "TypeScript", "Vite", "Component API Design", "Hooks & Composition", "State Management", "Client Routing", "Suspense & Loading States"]
  },
  {
    icon: Palette,
    title: "Design Systems & Styling",
    note: "A system built on tokens, so it stays consistent as the product grows",
    skills: ["Design Tokens", "Tailwind CSS", "CSS Architecture", "Fluid Type Scales", "Responsive Layouts", "Dark Mode", "Theming", "Typography"]
  },
  {
    icon: Sparkles,
    title: "Motion & Interaction",
    note: "Interruptible motion that follows the gesture and shows what changed and where it came from",
    skills: ["CSS Animation", "Scroll-Driven Effects", "Parallax", "Shared Element Transitions", "Interruptible Motion", "Gesture Handling", "Easing & Timing", "Reduced Motion"]
  },
  {
    icon: Code2,
    title: "Shaders",
    note: "Small GPU programs that calculate every pixel instead of loading an image",
    skills: ["GLSL", "Fragment Shaders", "Vertex Shaders", "Raymarching", "Noise & FBM", "Signed Distance Fields", "Uniforms & Attributes", "Colour Spaces"]
  },
  {
    icon: Orbit,
    title: "Realtime Graphics",
    note: "Raw WebGL when the effect is one quad, Three.js when a scene needs cameras and materials",
    skills: ["WebGL Context", "Buffers & VAOs", "Textures", "Framebuffers", "Render Passes", "Three.js", "Instancing", "Post-Processing", "Canvas 2D"]
  },
  {
    icon: Gauge,
    title: "Performance",
    note: "Budgets held on modest phones and integrated GPUs, not just the machine it was built on",
    skills: ["Core Web Vitals", "Code Splitting", "Lazy Loading", "Bundle Analysis", "Render Profiling", "Memoisation", "Adaptive Pixel Ratio", "GPU Profiling", "Draw Call Reduction"]
  },
  {
    icon: Accessibility,
    title: "Accessibility & UX",
    note: "Semantic markup and keyboard navigation, so the interface works for everyone",
    skills: ["Semantic HTML", "ARIA", "Keyboard Navigation", "Focus Management", "Colour Contrast", "Progressive Enhancement", "Form UX", "Edge & Empty States"]
  },
  {
    icon: Package,
    title: "Tooling & Delivery",
    note: "Type checks, linting and tests that catch mistakes before users do",
    skills: ["Vite", "ESLint", "Type Safety", "Component Testing", "Isolated Component Development", "Visual Regression", "CI/CD", "Vercel", "Firebase Hosting"]
  }
];

export default function DesignEngineering() {
  return (
    <PageShell
      slug="/design-engineering"
      title="Design Engineering"
      intro="The seam between design and engineering: interface systems, motion and realtime graphics, built in the browser rather than handed over it. Including the page you're reading right now."
      tags={["React", "TypeScript", "Design Systems", "Motion", "GLSL", "WebGL"]}
    >
      <Section
        eyebrow="Approach"
        heading="How I work at the seam"
        lede="Design engineering is the part nobody owns by default: the decisions that only exist once the design is running code."
      >
        <CardGrid cards={approach} />
      </Section>

      <Section
        eyebrow="Work"
        heading="Craft in production"
        lede="Interface and realtime graphics used as product, not as a demo reel."
      >
        <CardGrid cards={work} />
      </Section>

      <Section
        eyebrow="Skills"
        heading="Experience gained from building real projects"
      >
        <SkillGroups groups={skillGroups} />
      </Section>
    </PageShell>
  );
}
