import React from 'react';
import { Workflow, Sparkles, TrendingUp, LineChart, Users } from 'lucide-react';
import PageShell, { Section, SkillGroups } from '../components/PageShell';

const skillGroups = [
  {
    icon: Workflow,
    title: "Automation & Workflow Engineering",
    note: "Scheduled jobs, queues and webhooks that replace repeated manual work",
    skills: ["Workflow Design", "Python", "Node.js", "Webhooks", "Queues & Workers", "Scheduled Jobs", "Retries & Idempotency", "Internal Tooling"]
  },
  {
    icon: Sparkles,
    title: "AI-Powered Workflows",
    note: "Language models handling enrichment, classification and summarising, with a human reviewing",
    skills: ["LLM Integration", "Enrichment & Classification", "Summarisation", "Model-Context Protocol (MCP)", "Agent-2-Agent (A2A)", "Prompt & Output Validation", "Human-in-the-Loop Review", "Evaluation"]
  },
  {
    icon: TrendingUp,
    title: "Growth Automation",
    note: "Onboarding, routing and messaging triggered by what a customer actually does",
    skills: ["Lifecycle Triggers", "Onboarding Flows", "Lead Routing & Scoring", "Segmentation", "Email & Messaging Automation", "Referral Mechanics", "Churn Signals"]
  },
  {
    icon: LineChart,
    title: "Analytics & Experimentation",
    note: "Event tracking and A/B tests that produce numbers you can defend",
    skills: ["Event Tracking", "Funnel Instrumentation", "A/B Testing", "Feature Flags", "Cohort Analysis", "Attribution", "Dashboarding", "Data Quality Checks"]
  },
  {
    icon: Users,
    title: "CRM & Sales Tooling",
    note: "Two-way syncs keeping one accurate customer record across every system",
    skills: ["CRM Integration", "REST APIs", "OAuth", "Bi-Directional Sync", "Deduplication", "Pipeline Automation", "Sales Reporting", "Data Contracts"]
  }
];

export default function GtmEngineering() {
  return (
    <PageShell
      slug="/gtm-engineering"
      title="GTM Engineering"
      intro="Automation and workflow engineering for go-to-market, covering AI-powered workflows, growth automation, experimentation, and the CRM and sales tooling underneath it all."
      tags={["Automation", "AI workflows", "Growth", "Analytics", "CRM tooling"]}
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
