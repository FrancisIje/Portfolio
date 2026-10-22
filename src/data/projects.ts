export type Project = {
  title: string;
  // One line for the home page card
  tagline: string;
  description: string;
  tech: string[];
  image: string;
  // Fill behind the screenshot on the home page card
  tint: string;
  year?: string;
  isLive?: boolean;
  appStoreLink?: string;
  playStoreLink?: string;
  link?: string;
  // Discipline pages that list this project, by slug
  disciplines: string[];
  // What the project shows on a given discipline page, by slug
  notes?: Record<string, string>;
  // Spans the full width of the home page grid
  featured?: boolean;
};

// Shipped work. Drives the home page grid and the Selected work sections on
// the discipline pages.
export const projects: Project[] = [
  {
    title: "juju",
    tagline: "Errors from your apps, grouped, with the line that caused them.",
    description: "An error tracker for the apps you ship. Every crash comes in, is grouped with the others like it, and is traced back to the line of code that caused it, so a flood of reports reads as a short list of problems to fix.",
    tech: [],
    year: "2026",
    isLive: true,
    image: "/juju.jpg",
    tint: "#141418",
    link: "https://myjuju.dev",
    featured: true,
    disciplines: ["/design-engineering", "/backend", "/devx"],
    notes: {
      "/design-engineering": "The web app end to end: the sign-in flow, the views that turn a stream of crashes into a readable list, and the generative pixel field on the landing screen.",
      "/backend": "The pipeline behind it: crashes reported from apps are ingested, grouped with the ones like them, and traced back to the line that threw.",
      "/devx": "A developer tool first: it shortens the loop between something breaking in production and knowing which line to open."
    }
  },
  {
    title: "Rojar",
    tagline: "Social commerce marketplace where selling starts in minutes.",
    description: "A social commerce marketplace where selling starts in minutes and buyers discover products through content. It has a social feed of posts and stories, seller storefronts, chat with voice notes for negotiating an order, and order tracking with secure payments.",
    tech: ["Flutter", "WebSockets", "REST APIs", "Audio Recording", "Payments", "Push Notifications"],
    isLive: true,
    image: "/rojar.jpg",
    tint: "#fde9e4",
    disciplines: ["/mobile"],
    appStoreLink: "https://apps.apple.com/ng/app/rojar/id6762018052",
    playStoreLink: "https://play.google.com/store/apps/details?id=ng.com.rojar.app"
  },
  {
    title: "Heala",
    tagline: "Chat, voice and video consultations with doctors.",
    description: "An integrated healthcare platform that connects patients to doctors through chat, voice and video consultations. It also includes a symptom checker that ranks likely conditions, plus a personal health profile with daily activity tracking.",
    tech: ["Flutter", "WebRTC", "WebSockets", "REST APIs", "Push Notifications"],
    isLive: true,
    image: "/heala.jpg",
    tint: "#e3ecfd",
    disciplines: ["/mobile"],
    appStoreLink: "https://apps.apple.com/ng/app/heala-integrated-healthcare/id1610943837",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.heala.patient"
  },
  {
    title: "Bookaleap",
    tagline: "Book trainers, nutrition coaches and physios in a few taps.",
    description: "Easily find and book top personal trainers, nutrition coaches, physiotherapists, and more wellness professionals with just a few clicks.",
    tech: ["Flutter", "Dart", "Firebase", "REST APIs"],
    year: "2024",
    isLive: true,
    image: "/bookaleap.jpg",
    tint: "#fdf3d6",
    disciplines: ["/mobile"],
    appStoreLink: "https://apps.apple.com/tr/app/bookaleap/id6447549852?platform=iphone",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.vebbuilders.bookleap&hl=en_US"
  },
  {
    title: "Deeply",
    tagline: "Dating app with realtime messaging and profile matching.",
    description: "A complete mobile dating application with realtime messaging, profile matching, and media storage capabilities.",
    tech: ["Flutter", "WebSockets", "Node.js", "MongoDB", "Azure Storage"],
    link: "https://drive.google.com/file/d/1RwmrTLIgRK6eUPNO9wGL_7vjRrexRFFJ/view",
    year: "2024",
    image: "/dating-app.png",
    tint: "#fde4ef",
    disciplines: ["/mobile"]
  },
  {
    title: "SpeakUp",
    tagline: "AI language coach with pronunciation assessment.",
    description: "A language coach built on the ChatGPT API, with voice recording, transcribing and pronunciation assessment to help users improve their language skills.",
    tech: ["Flutter", "ChatGPT API", "Firebase", "Speech Recognition", "AI/ML"],
    link: "https://drive.google.com/file/d/13bxZW8b5wFYTXoJLsIQQJRh-1YZa2dvT/view",
    year: "2024",
    image: "/speakup-banner.jpg",
    tint: "#dcf3ef",
    disciplines: ["/mobile"]
  }
];

// Where a project card should take you: the App Store first, then any demo link
export const projectHref = (project: Project) =>
  project.appStoreLink ?? project.playStoreLink ?? project.link;

export const projectsFor = (slug: string) => projects.filter((p) => p.disciplines.includes(slug));
