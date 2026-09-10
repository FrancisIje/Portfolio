import React from 'react';
import { Cloud, Layers, Network, Boxes, Shield, Rocket, Settings, GitBranch, Activity, Sparkles } from 'lucide-react';
import PageShell, { Section, SkillGroups, CardGrid } from '../components/PageShell';

const approach = [
  {
    title: "A platform is a product with engineers as users",
    body: "The measure isn't how clever the infrastructure is, it's how long it takes a new service to go from empty repo to production traffic. If that path is undocumented tribal knowledge, there is no platform, just a cloud account."
  },
  {
    title: "Paved paths, not mandates",
    body: "Make the correct route the easy one: a template that already has logging, health checks, secrets and a pipeline wired up. Teams take the paved path because it's faster, not because a policy told them to."
  },
  {
    title: "Boundaries drawn at failure domains",
    body: "Service decomposition, network segments and IAM boundaries are the same question asked three ways: what should be able to fail, or be compromised, without taking the rest down with it. That gets decided before provisioning anything."
  },
  {
    title: "Reproducible or it doesn't exist",
    body: "Anything clicked into a console is a thing nobody can rebuild at 3am. Infrastructure as code, versioned artifacts and environment promotion turn recovery into running a pipeline again instead of an archaeology exercise."
  },
  {
    title: "Cost is an architectural constraint",
    body: "Managed or self-hosted, always on or scaling to zero, egress paths and retention windows are design decisions with a monthly invoice attached. Modelling them up front is cheaper than discovering them in a billing alert."
  },
  {
    title: "Operability designed in, not bolted on",
    body: "Structured logs, metrics that map to real user pain, alerts that page a human only when a human can help, and a tested rollback. Systems get run far longer than they get built."
  }
];

const skillGroups = [
  {
    icon: Cloud,
    title: "Google Cloud Platform",
    note: "Managed compute, storage, messaging and access control across the platform",
    skills: ["GCP", "Cloud Run", "Cloud Functions", "Cloud Build", "Pub/Sub", "Cloud Storage", "Cloud SQL", "IAM & Service Accounts", "Cloud Logging & Monitoring"]
  },
  {
    icon: Cloud,
    title: "Microsoft Azure",
    note: "The same building blocks on a second cloud, and knowing when to pick which",
    skills: ["Azure", "Azure Storage", "Managed Compute", "Identity & Access", "Managed Databases", "Monitoring", "Cross-Cloud Trade-offs"]
  },
  {
    icon: Layers,
    title: "Platform Architecture",
    note: "Setting service boundaries, scaling and failure limits before any code is written",
    skills: ["Service Decomposition", "Managed vs Self-Hosted", "Scaling Strategy", "Failure Domains", "Cost Modelling", "Least Privilege", "Multi-Environment Design", "Tenancy Models"]
  },
  {
    icon: Network,
    title: "Networking",
    note: "Private networks, firewall rules and load balancers routing traffic safely",
    skills: ["VPC Design", "Subnets", "Firewall Rules", "Cloud Load Balancing", "Cloud DNS", "Cloud NAT", "Private Service Connect", "Hybrid Connectivity"]
  },
  {
    icon: Boxes,
    title: "Containers & Orchestration",
    note: "Packaging services into containers and running them on Kubernetes",
    skills: ["Kubernetes", "Google Kubernetes Engine", "Docker", "Helm", "Apigee X", "Apigee Hybrid", "API Proxy Design", "Autoscaling", "Resource Limits & Requests"]
  },
  {
    icon: Shield,
    title: "Platform & AI Protection",
    note: "Filtering hostile traffic at the edge and unsafe input at the model",
    skills: ["Cloud Armor", "Model Armor", "WAF Policies", "DDoS Mitigation", "Secret Manager", "Prompt Injection Defence", "Audit Logging", "Workload Identity"]
  },
  {
    icon: Rocket,
    title: "Release & Deployment",
    note: "Repeatable releases with staged rollouts and a tested way back",
    skills: ["Container Registries", "Blue-Green & Staged Rollouts", "Canary Releases", "Environment Promotion", "Rollback Strategy", "Zero-Downtime Releases", "Secret Rotation"]
  },
  {
    icon: Settings,
    title: "Infrastructure as Code",
    note: "Defining infrastructure in version control, then monitoring what it creates",
    skills: ["Terraform", "Declarative Provisioning", "State Management", "Module Design", "Drift Detection", "Backup & Recovery", "Capacity Planning", "Patching"]
  },
  {
    icon: GitBranch,
    title: "CI/CD",
    note: "Automated pipelines that test, build and deploy every commit",
    skills: ["Pipeline Design", "Cloud Build", "GitHub Actions", "Automated Testing Gates", "Build Caching", "Artifact Versioning", "Deployment Automation", "Ephemeral Environments"]
  },
  {
    icon: Activity,
    title: "Observability & Operations",
    note: "Knowing a system is unhealthy before a user has to tell you",
    skills: ["Structured Logging", "Metrics & Dashboards", "Distributed Tracing", "SLIs & SLOs", "Alert Design", "Incident Response", "Postmortems", "On-Call Runbooks"]
  },
  {
    icon: Sparkles,
    title: "AI Platform & Agentic Systems",
    note: "Connecting models to real tools and data through open agent protocols",
    skills: ["Vertex AI", "Gemini Enterprise Agent Platform", "Model-Context Protocol (MCP)", "Agent-2-Agent (A2A)", "RAG Pipelines", "Tool / Function Calling", "Evaluation & Guardrails", "Inference Cost Control"]
  }
];

export default function PlatformEngineering() {
  return (
    <PageShell
      slug="/platform-engineering"
      title="Platform Engineering"
      intro="The layer other engineers build on: cloud architecture, networking, orchestration and delivery across GCP and Azure. From VPC design and GKE through to the AI platform sitting on top."
      tags={["GCP", "Azure", "Kubernetes", "Terraform", "Networking", "CI/CD"]}
    >
      <Section
        eyebrow="Approach"
        heading="What the platform is for"
        lede="Infrastructure is the substrate. The platform is what turns it into something a team can ship on without asking permission."
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
