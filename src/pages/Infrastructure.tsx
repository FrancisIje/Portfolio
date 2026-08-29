import React from 'react';
import { Cloud, Layers, Network, Boxes, Shield, Rocket, Settings, GitBranch, Sparkles } from 'lucide-react';
import PageShell, { Section, SkillGroups } from '../components/PageShell';

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
    title: "Cloud Architecture",
    note: "Setting service boundaries, scaling and failure limits before any code is written",
    skills: ["Service Decomposition", "Managed vs Self-Hosted", "Scaling Strategy", "Failure Domains", "Cost Modelling", "Least Privilege", "Multi-Environment Design"]
  },
  {
    icon: Network,
    title: "Networking",
    note: "Private networks, firewall rules and load balancers routing traffic safely",
    skills: ["VPC Design", "Subnets", "Firewall Rules", "Cloud Load Balancing", "Cloud DNS", "Cloud NAT", "Private Service Connect", "Hybrid Connectivity"]
  },
  {
    icon: Boxes,
    title: "Containers & Platform",
    note: "Packaging services into containers and running them on Kubernetes",
    skills: ["Kubernetes", "Google Kubernetes Engine", "Docker", "Helm", "Apigee X", "Apigee Hybrid", "API Proxy Design", "Autoscaling"]
  },
  {
    icon: Shield,
    title: "Platform & AI Protection",
    note: "Filtering hostile traffic at the edge and unsafe input at the model",
    skills: ["Cloud Armor", "Model Armor", "WAF Policies", "DDoS Mitigation", "Secret Manager", "Prompt Injection Defence", "Audit Logging"]
  },
  {
    icon: Rocket,
    title: "Cloud Deployment",
    note: "Repeatable releases with staged rollouts and a tested way back",
    skills: ["Container Registries", "Blue-Green & Staged Rollouts", "Environment Promotion", "Rollback Strategy", "Zero-Downtime Releases", "Secret Management"]
  },
  {
    icon: Settings,
    title: "Infrastructure Management",
    note: "Defining infrastructure as code, then monitoring and maintaining what it creates",
    skills: ["Infrastructure as Code", "Terraform", "Monitoring & Alerting", "Logging", "Backup & Recovery", "Capacity Planning", "Patching", "Incident Response"]
  },
  {
    icon: GitBranch,
    title: "CI/CD",
    note: "Automated pipelines that test, build and deploy every commit",
    skills: ["Pipeline Design", "Cloud Build", "GitHub Actions", "Automated Testing Gates", "Build Caching", "Artifact Versioning", "Deployment Automation"]
  },
  {
    icon: Sparkles,
    title: "AI & Agentic Systems",
    note: "Connecting models to real tools and data through open agent protocols",
    skills: ["LLM Integration", "Model-Context Protocol (MCP)", "Agent-2-Agent (A2A)", "Gemini Enterprise Agent Platform", "Vertex AI", "RAG Pipelines", "Tool / Function Calling", "Evaluation & Guardrails"]
  }
];

export default function Infrastructure() {
  return (
    <PageShell
      slug="/infrastructure"
      title="Infrastructure Engineering"
      intro="Cloud architecture, deployment and the pipelines around them, across GCP and Azure. From VPC design and GKE through to the AI layer sitting on top."
      tags={["GCP", "Azure", "Kubernetes", "Terraform", "CI/CD"]}
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
