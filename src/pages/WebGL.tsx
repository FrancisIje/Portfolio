import React from 'react';
import { Orbit, Code2, Boxes, Gauge } from 'lucide-react';
import PageShell, { Section, SkillGroups, CardGrid } from '../components/PageShell';

const skillGroups = [
  {
    icon: Code2,
    title: "Shaders",
    note: "Small GPU programs that calculate every pixel instead of loading an image",
    skills: ["GLSL", "Fragment Shaders", "Vertex Shaders", "Raymarching", "Noise & FBM", "Signed Distance Fields", "Uniforms & Attributes", "Colour Spaces"]
  },
  {
    icon: Orbit,
    title: "Raw WebGL",
    note: "Talking to the browser's graphics API directly, managing buffers and draw calls by hand",
    skills: ["WebGL Context", "Buffers & VAOs", "Textures", "Framebuffers", "Render Passes", "Program Linking", "Context Loss Recovery", "Pixel Ratio Handling"]
  },
  {
    icon: Boxes,
    title: "Scene Frameworks",
    note: "Three.js, for when a scene needs cameras, geometry and materials",
    skills: ["Three.js", "Geometry & Materials", "Point Fields", "Instancing", "Post-Processing", "Camera Control", "Canvas 2D", "requestAnimationFrame Loops"]
  },
  {
    icon: Gauge,
    title: "Realtime Performance",
    note: "Holding 60 frames a second by capping resolution and pausing when off-screen",
    skills: ["Adaptive Pixel Ratio", "IntersectionObserver Gating", "ResizeObserver", "Reduced Motion", "GPU Profiling", "Draw Call Reduction", "Resource Teardown", "Mobile Fallbacks"]
  }
];

const work = [
  {
    title: "The background on this site",
    body: "A raw-WebGL fragment shader running organic blob motion behind every page. No library, no video, just one full-screen quad and a GLSL program. It resizes with the window and costs a fraction of what an equivalent looping video would."
  },
  {
    title: "Procedural over asset-heavy",
    body: "A shader that generates its imagery ships as a few kilobytes of text. Replacing decorative video and large image sequences with procedural graphics is usually the single biggest page-weight win available."
  },
  {
    title: "Graphics that respect the device",
    body: "Effects gate on visibility, clamp their pixel ratio, honour prefers-reduced-motion and release every frame, buffer and program on teardown. A background should never be the reason a laptop fan spins up."
  },
  {
    title: "Canvas 2D when WebGL is overkill",
    body: "Not every effect needs the GPU. Plenty of arc, signal and particle work is cleaner and more portable as a plain Canvas 2D render loop, and I'll pick that when it wins."
  }
];

export default function WebGL() {
  return (
    <PageShell
      slug="/webgl"
      title="WebGL & Shaders"
      intro="GLSL, raw WebGL and Three.js. Realtime graphics on the open web, written to be light, procedural and kind to the device running them."
      tags={["GLSL", "WebGL", "Three.js", "Canvas 2D"]}
    >
      <Section
        eyebrow="Work"
        heading="Graphics in production"
        lede="Realtime graphics used as interface, not as a demo reel."
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
