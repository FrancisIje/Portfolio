import React from 'react';
import { Server, Database, Radio, ShieldCheck, GitBranch } from 'lucide-react';
import PageShell, { Section, SkillGroups } from '../components/PageShell';

const skillGroups = [
  {
    icon: Server,
    title: "Languages & Runtimes",
    note: "Matching the runtime to the workload, from I/O-heavy services to concurrency-heavy ones",
    skills: ["Node.js", "Python", "Go", "Dart", "TypeScript", "C", "Express", "Async / Concurrency"]
  },
  {
    icon: Database,
    title: "Data",
    note: "Relational schemas where the data has a fixed shape, document stores where it doesn't",
    skills: ["PostgreSQL", "MongoDB", "Cloud SQL", "SQLite", "Schema Design", "Indexing", "Migrations", "Caching"]
  },
  {
    icon: Radio,
    title: "APIs & Realtime",
    note: "The contract every client depends on, from request/response to live connections",
    skills: ["REST APIs", "WebSockets", "Webhooks", "Pub/Sub", "Event-Driven Design", "Pagination & Filtering", "Versioning", "OpenAPI"]
  },
  {
    icon: ShieldCheck,
    title: "Security & Reliability",
    note: "Authentication, rate limits and retries designed in from the first version",
    skills: ["Auth & Sessions", "Least Privilege", "Secret Management", "Input Validation", "Rate Limiting", "Idempotency", "Structured Logging", "Monitoring"]
  },
  {
    icon: GitBranch,
    title: "Delivery",
    note: "Containerised builds and automated pipelines carrying code from commit to production",
    skills: ["Docker", "CI/CD", "Cloud Run", "AWS", "Firebase", "Azure Storage", "Infrastructure as Code", "Automated Testing"]
  }
];

export default function Backend() {
  return (
    <PageShell
      slug="/backend"
      title="Backend Engineering"
      intro="APIs, realtime systems and data layers in Node.js, Python, Go and Dart, designed to be operated rather than just deployed."
      tags={["Node.js", "Python", "Go", "PostgreSQL", "WebSockets"]}
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
