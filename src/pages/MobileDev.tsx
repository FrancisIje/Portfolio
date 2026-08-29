import React from 'react';
import { ArrowUpRight, Smartphone, Lightbulb, Radio, Video, Gauge, Sparkles, Store } from 'lucide-react';
import PageShell, { Section, SkillGroups } from '../components/PageShell';
import AnimatedText, { useParallax } from '../components/AnimatedText';
import { ImageWithLoader } from '../../francis-portfolio';

const projects = [
  {
    title: "Rojar",
    description: "A social commerce marketplace where selling starts in minutes and buyers discover products through content. It has a social feed of posts and stories, seller storefronts, in-app chat with voice notes for negotiating an order, and order tracking with secure payments.",
    tech: ["Flutter", "WebSockets", "REST APIs", "Audio Recording", "Payments", "Push Notifications"],
    isLive: true,
    image: "/rojar.png",
    appStoreLink: "https://apps.apple.com/ng/app/rojar/id6762018052",
    playStoreLink: "https://play.google.com/store/apps/details?id=ng.com.rojar.app"
  },
  {
    title: "Heala",
    description: "An integrated healthcare platform that connects patients to doctors through in-app chat, voice and video consultations. It also includes a symptom checker that ranks likely conditions, plus a personal health profile with daily activity tracking.",
    tech: ["Flutter", "WebRTC", "WebSockets", "REST APIs", "Push Notifications"],
    isLive: true,
    image: "/heala.png",
    appStoreLink: "https://apps.apple.com/ng/app/heala-integrated-healthcare/id1610943837",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.heala.patient"
  },
  {
    title: "Bookaleap",
    description: "Easily find and book top personal trainers, nutrition coaches, physiotherapists, and more wellness professionals with just a few clicks.",
    tech: ["Flutter", "Dart", "Firebase", "REST APIs"],
    year: "2024",
    isLive: true,
    image: "/bookaleap.png",
    appStoreLink: "https://apps.apple.com/tr/app/bookaleap/id6447549852?platform=iphone",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.vebbuilders.bookleap&hl=en_US"
  },
  {
    title: "Deeply Dating App",
    description: "A full-featured mobile dating application with real-time messaging, profile matching, and media storage capabilities.",
    tech: ["Flutter", "WebSockets", "Node.js", "MongoDB", "Azure Storage"],
    link: "https://drive.google.com/file/d/1RwmrTLIgRK6eUPNO9wGL_7vjRrexRFFJ/view",
    year: "2024",
    image: "/dating-app.png"
  },
  {
    title: "SpeakUp",
    description: "An AI-powered language coach using ChatGPT API with voice recording, transcribing, and pronunciation assessment features to help users improve their language skills.",
    tech: ["Flutter", "ChatGPT API", "Firebase", "Speech Recognition", "AI/ML"],
    link: "https://drive.google.com/file/d/13bxZW8b5wFYTXoJLsIQQJRh-1YZa2dvT/view",
    year: "2024",
    image: "/speakup banner.png"
  }
];

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
    note: "Profiling startup, scrolling and memory so it stays smooth on mid-range Android",
    skills: ["Render Profiling", "List Virtualisation", "Memory & Leak Tracing", "Startup Time", "Bundle & Asset Size", "Image Optimisation", "Jank Diagnosis"]
  },
  {
    icon: Sparkles,
    title: "Animations",
    note: "Gesture-driven motion at 60 frames a second, showing what changed and where it came from",
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
    <div className="mb-6 overflow-hidden rounded-xl bg-white/5 flex items-center justify-center p-4">
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
      tags={["React Native", "Flutter"]}
    >
      <Section
        eyebrow="Selected Work"
        heading="Apps I've built and shipped"
        lede="Production apps, each with a different hard part: live consultations, booking flows, realtime messaging and speech AI."
      >
        <div className="space-y-4">
          {projects.map((project, idx) => (
            <div key={idx}
              className="stagger-item group block p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              {project.image && <ProjectImage src={project.image} alt={project.title} />}
              <div className="flex items-center gap-4 mb-2">
                <h4 className="text-2xl font-bold"><AnimatedText text={project.title} stagger={34} /></h4>
                {project.isLive && (
                  <span className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                    LIVE
                  </span>
                )}
                {project.year && <span className="text-sm text-white/50">{project.year}</span>}
              </div>
              <p className="text-white/70 leading-relaxed mb-4"><AnimatedText text={project.description} delay={200} stagger={6} /></p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-black/60 border border-white/10 rounded-full text-white/60">
                    {tech}
                  </span>
                ))}
              </div>
              {(project.appStoreLink || project.playStoreLink) && (
                <div className="flex gap-3 mt-4">
                  {project.appStoreLink && (
                    <a href={project.appStoreLink} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-all flex items-center gap-2">
                      <span>App Store</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                  {project.playStoreLink && (
                    <a href={project.playStoreLink} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20 transition-all flex items-center gap-2">
                      <span>Play Store</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
              {project.link && !project.appStoreLink && !project.playStoreLink && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mt-4 transition-colors">
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
