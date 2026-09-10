import React from 'react';
import { Layers, Database, FileCode, Radio, ShieldCheck, Server } from 'lucide-react';
import PageShell, { Section, SkillGroups, CardGrid } from '../components/PageShell';

const approach = [
  {
    title: "Boundaries before code",
    body: "The expensive decisions are which services exist, what each one owns, and what they're allowed to know about each other. Get those wrong and no amount of clean handler code saves you; get them right and the endpoints are the easy part."
  },
  {
    title: "The schema is the architecture",
    body: "How data is modelled decides what the system can do later far more than the framework does. Normalise where the shape is fixed and the reads are relational, denormalise where the read pattern is known and hot, and be deliberate about which one you're doing."
  },
  {
    title: "Design for the failure case",
    body: "The happy path writes itself. What matters is what happens on a partial write, a duplicate webhook, a third party timing out halfway through a transaction, or the same request arriving twice. Idempotency, retries and timeouts are design decisions, not error handling."
  },
  {
    title: "Contracts outlive implementations",
    body: "An API is a promise to every client already in the field, including the mobile build someone hasn't updated in eight months. Versioning, additive change and explicit deprecation cost a little up front and a lot less later."
  },
  {
    title: "Pick consistency on purpose",
    body: "Strong consistency where money and identity live, eventual where a feed or a counter can lag a second. Making that choice explicitly, per boundary, is most of what distinguishes a system that scales from one that surprises you."
  },
  {
    title: "Built to be operated",
    body: "Structured logs with correlation IDs, metrics tied to real user pain, and a migration path that can be run twice. Most of a backend's life is spent being run by someone who wasn't there when it was written."
  }
];

const skillGroups = [
  {
    icon: Layers,
    title: "System Design",
    note: "Deciding what exists, what owns what, and where it's allowed to fail",
    skills: ["Service Decomposition", "Domain Boundaries", "Consistency Models", "Failure Modes", "Capacity & Load Estimation", "Trade-off Analysis", "Architecture Decision Records", "Migration Strategy"]
  },
  {
    icon: Database,
    title: "Data Architecture",
    note: "Relational schemas where the data has a fixed shape, document stores where it doesn't",
    skills: ["Schema Design", "PostgreSQL", "MongoDB", "Cloud SQL", "Normalisation Trade-offs", "Indexing Strategy", "Query Planning", "Migrations", "Caching Layers"]
  },
  {
    icon: FileCode,
    title: "API & Contract Design",
    note: "The promise every client depends on, designed to survive its own next version",
    skills: ["REST API Design", "Resource Modelling", "Versioning", "OpenAPI", "Pagination & Filtering", "Error Semantics", "Data Contracts", "Backwards Compatibility"]
  },
  {
    icon: Radio,
    title: "Realtime & Event-Driven",
    note: "Live connections and message flow, with the delivery guarantees stated up front",
    skills: ["WebSockets", "Server-Sent Events", "Pub/Sub", "Queues & Workers", "Event-Driven Design", "Webhooks", "Idempotency & Deduplication", "Backpressure", "Ordering Guarantees"]
  },
  {
    icon: ShieldCheck,
    title: "Security & Reliability",
    note: "Authentication, rate limits and retries designed in from the first version",
    skills: ["Auth & Sessions", "Least Privilege", "Secret Management", "Input Validation", "Rate Limiting", "Timeouts & Circuit Breaking", "Structured Logging", "Monitoring & Alerting"]
  },
  {
    icon: Server,
    title: "Languages & Runtimes",
    note: "Matching the runtime to the workload, from services bound by I/O to ones bound by concurrency",
    skills: ["Node.js", "Python", "Go", "Dart", "TypeScript", "C", "Express", "Async / Concurrency", "Docker"]
  }
];

export default function Backend() {
  return (
    <PageShell
      slug="/backend"
      title="Backend Architecture"
      intro="Service boundaries, data models, delivery guarantees and failure modes: the decisions made before the first handler is written, and the ones that are expensive to change afterwards."
      tags={["System Design", "PostgreSQL", "Event-Driven", "Node.js", "Python", "Go"]}
    >
      <Section
        eyebrow="Approach"
        heading="Decisions that are expensive to reverse"
        lede="Endpoints are the visible part. The architecture is what decides whether the next six months of them are cheap or painful."
      >
        <CardGrid cards={approach} />
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
