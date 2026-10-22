import React from 'react';
import { Bot, Plug, Terminal, Zap, GitBranch, ShieldCheck, BookOpen, Workflow } from 'lucide-react';
import PageShell, { Section, SkillGroups, CardGrid, ProjectFeatures } from '../components/PageShell';
import { projectsFor } from '../data/projects';

const approach = [
  {
    title: "The feedback loop is the product",
    body: "Everything in developer experience reduces to one number: how long between making a change and knowing whether it worked. Type checks, hot reload, test speed, preview environments and CI queue time are all the same lever pulled at different points."
  },
  {
    title: "Agents need context, not cleverness",
    body: "An AI tool is only as good as what it can see and what it's allowed to do. Most of the work is plumbing: exposing the right repo context, the right tools through MCP, and the right guardrails, so the model is solving the problem rather than guessing at it."
  },
  {
    title: "Automate the path you've walked twice",
    body: "The third time a task is done by hand it becomes a script, the third time the script is run by hand it becomes a pipeline. Internal tooling earns its keep in the hours it stops costing, not in how impressive it looks."
  },
  {
    title: "Generated code still needs a gate",
    body: "Model output moves fast enough that review, types, tests and static analysis stop being hygiene and start being the thing keeping the codebase coherent. The faster the generation, the more the gates matter."
  },
  {
    title: "Make the setup one command",
    body: "A repo that takes a day to run locally taxes every person who touches it, forever. Containerised dev environments, seeded data and a single documented entry point turn onboarding from a ritual into a command."
  },
  {
    title: "Humans in the loop where it counts",
    body: "Automation handles the repetitive middle; a person decides at the edges where a wrong call is expensive. Designing which decisions surface to a human is most of what separates a useful automated workflow from a liability."
  }
];

const skillGroups = [
  {
    icon: Bot,
    title: "AI-Assisted Development",
    note: "Agentic coding tools wired into a real codebase, with the context and permissions to be useful",
    skills: ["Agentic Coding Workflows", "Claude Code", "Context Engineering", "Prompt Design", "Custom Skills & Commands", "Subagent Orchestration", "Hooks & Automation", "Output Evaluation"]
  },
  {
    icon: Plug,
    title: "Agent Infrastructure",
    note: "Giving models real tools and real data through open protocols, safely",
    skills: ["Model-Context Protocol (MCP)", "MCP Server Design", "Agent-2-Agent (A2A)", "Tool / Function Calling", "RAG Pipelines", "Prompt & Output Validation", "Guardrails", "Human-in-the-Loop Review"]
  },
  {
    icon: Terminal,
    title: "Internal Tooling",
    note: "CLIs, generators and small services that delete repeated manual work",
    skills: ["CLI Design", "Code Generation", "Project Scaffolding", "Python", "Node.js", "Scripting & Automation", "Internal Dashboards", "Developer Portals"]
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    note: "Scheduled jobs, queues and webhooks that run without anyone watching them",
    skills: ["Workflow Design", "Webhooks", "Queues & Workers", "Scheduled Jobs", "Retries & Idempotency", "Event-Driven Triggers", "Third-Party Integration", "Failure Notification"]
  },
  {
    icon: Zap,
    title: "Build & Local Loop",
    note: "Keeping the gap between saving a file and seeing the result as close to zero as possible",
    skills: ["Vite", "Hot Module Replacement", "Build Caching", "Incremental Type Checking", "Monorepo Tooling", "Dependency Management", "Containerised Dev Environments", "One-Command Setup"]
  },
  {
    icon: GitBranch,
    title: "CI/CD & Release",
    note: "Pipelines that tell you what broke, quickly, and ship what didn't",
    skills: ["GitHub Actions", "Cloud Build", "Pipeline Design", "Test Parallelisation", "Preview Environments", "Artifact Versioning", "Staged Rollouts", "Release Automation"]
  },
  {
    icon: ShieldCheck,
    title: "Quality Automation",
    note: "The gates that keep velocity from turning into entropy",
    skills: ["Type Safety", "ESLint & Formatting", "Pre-Commit Hooks", "Automated Testing", "Static Analysis", "Automated Code Review", "Dependency Hygiene", "Secret Scanning"]
  },
  {
    icon: BookOpen,
    title: "Docs & Onboarding",
    note: "Written where the work happens, so it stays true long enough to be worth reading",
    skills: ["READMEs as Contracts", "Architecture Decision Records", "Runbooks", "Agent-Readable Repo Docs", "API Documentation", "Changelogs", "Reproducible Environments", "Knowledge Handover"]
  }
];

export default function DevX() {
  return (
    <PageShell
      slug="/devx"
      title="Developer Experience"
      intro="The tooling engineers spend all day inside: AI in the workflow, agent infrastructure, internal tools and the build, test and release loops around them. Measured in how fast the loop closes."
      tags={["AI Tooling", "MCP", "Agents", "Automation", "CI/CD", "Internal Tools"]}
    >
      <Section
        eyebrow="Selected Work"
        heading="Shipped and in use"
      >
        <ProjectFeatures projects={projectsFor('/devx')} slug="/devx" />
      </Section>

      <Section
        eyebrow="Approach"
        heading="Where the field is expanding"
        lede="AI moved developer experience from an optional extra into the place most of the leverage now sits. Tooling is the part of the stack getting rebuilt fastest."
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
