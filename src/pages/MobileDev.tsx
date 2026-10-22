import React from 'react';
import { ArrowUpRight, Smartphone, Lightbulb, Radio, Video, Gauge, Sparkles, Store } from 'lucide-react';
import PageShell, { Section, SkillGroups } from '../components/PageShell';
import { useParallax } from '../components/AnimatedText';
import ImageWithLoader from '../components/ImageWithLoader';
import { projectsFor } from '../data/projects';

const skillGroups = [
  {
    icon: Smartphone,
    title: "Cross-Platform",
    note: "One codebase compiled to native iOS and Android, in React Native or Flutter",
    skills: ["React Native", "Flutter", "Dart", "TypeScript", "Expo", "Native Modules", "Platform Channels", "Responsive Layouts"]
  },
  {
    icon: Lightbulb,
    title: "Product Thinking",
    note: "Scoping what ships first, and deciding what each screen does when things go wrong",
    skills: ["Product Thinking", "Scoping & Trade-offs", "User Flows", "Edge & Empty States", "Iterating on Feedback", "Analytics-Informed Decisions"]
  },
  {
    icon: Radio,
    title: "Realtime",
    note: "WebSockets and SSE keeping the screen in sync with the server as things change",
    skills: ["WebSockets", "Server-Sent Events", "Presence & Sync", "Optimistic Updates", "Reconnection Handling", "Push Notifications", "Offline-First"]
  },
  {
    icon: Video,
    title: "Calls & Media",
    note: "WebRTC voice and video that recovers when the network drops",
    skills: ["WebRTC", "Peer Connections", "Signalling", "Audio Recording", "Camera & Media", "Permissions", "Background Audio"]
  },
  {
    icon: Gauge,
    title: "Performance Optimisation",
    note: "Profiling startup, scrolling and memory so it stays smooth on modest Android phones",
    skills: ["Render Profiling", "List Virtualisation", "Memory & Leak Tracing", "Startup Time", "Bundle & Asset Size", "Image Optimisation", "Jank Diagnosis"]
  },
  {
    icon: Sparkles,
    title: "Animations",
    note: "Motion that follows the gesture at 60 frames a second, showing what changed and where it came from",
    skills: ["Reanimated", "Gesture Handling", "Flutter Animations", "Shared Element Transitions", "Interruptible Motion", "60fps Budgets", "Reduced Motion"]
  },
  {
    icon: Store,
    title: "Release Engineering",
    note: "Signing, store review and staged rollouts that get builds into people's hands",
    skills: ["App Store Connect", "Google Play Console", "Code Signing", "Staged Rollouts", "Crash Reporting", "Firebase", "CI/CD", "Versioning"]
  }
];

// The screenshot drifts against the scroll inside its frame, so the card reads
// with a little depth as it passes.
function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const ref = useParallax<HTMLDivElement>(-0.06);
  return (
    <div className="mb-6 overflow-hidden rounded-xl bg-white/70 flex items-center justify-center p-4">
      <div ref={ref} className="w-full flex items-center justify-center will-change-transform">
        <ImageWithLoader
          src={src}
          alt={alt}
          className="max-w-full max-h-96 object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
}

export default function MobileDev() {
  return (
    <PageShell
      slug="/mobile"
      title="Mobile Development"
      intro="React Native and Flutter apps built end to end, from product thinking through realtime messaging, calls, performance and motion, all the way to the release pipeline."
      tags={["React Native", "Flutter", "Jetpack Compose", "SwiftUI"]}
    >
      <Section
        eyebrow="Selected Work"
        heading="Apps I've built and shipped"
        lede="Production apps, each with a different hard part: live consultations, booking flows, realtime messaging and speech AI."
      >
        <div className="space-y-4">
          {projectsFor('/mobile').map((project, idx) => (
            <div key={idx}
              className="stagger-item group block p-8 bg-white/70 backdrop-blur-sm border border-ink/10 rounded-2xl hover:bg-white">
              {project.image && <ProjectImage src={project.image} alt={project.title} />}
              <div className="flex items-center gap-4 mb-2">
                <h4 className="text-xl font-semibold">{project.title}</h4>
                {project.isLive && (
                  <span className="text-xs px-3 py-1 bg-green-500/10 text-green-700 rounded-full border border-green-500/30">
                    LIVE
                  </span>
                )}
                {project.year && <span className="text-sm text-ink/50">{project.year}</span>}
              </div>
              <p className="text-ink/70 leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-paper border border-ink/10 rounded-full text-ink/60">
                    {tech}
                  </span>
                ))}
              </div>
              {(project.appStoreLink || project.playStoreLink) && (
                <div className="flex gap-3 mt-4">
                  {project.appStoreLink && (
                    <a href={project.appStoreLink} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-4 py-2 bg-ink/10 hover:bg-ink/20 text-ink rounded-full border border-ink/20 transition-all flex items-center gap-2">
                      <span>App Store</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                  {project.playStoreLink && (
                    <a href={project.playStoreLink} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-4 py-2 bg-ink/10 hover:bg-ink/20 text-ink rounded-full border border-ink/20 transition-all flex items-center gap-2">
                      <span>Play Store</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
              {project.link && !project.appStoreLink && !project.playStoreLink && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink mt-4 transition-colors">
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
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
