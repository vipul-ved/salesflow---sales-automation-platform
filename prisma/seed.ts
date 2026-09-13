import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting SalesFlow AI database seeding...");

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.webhookDelivery.deleteMany();
  await prisma.webhook.deleteMany();
  await prisma.apiKey.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.aIInteraction.deleteMany();
  await prisma.workflowAction.deleteMany();
  await prisma.workflowCondition.deleteMany();
  await prisma.workflowTrigger.deleteMany();
  await prisma.workflow.deleteMany();
  await prisma.emailTemplate.deleteMany();
  await prisma.email.deleteMany();
  await prisma.file.deleteMany();
  await prisma.note.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.calendarEvent.deleteMany();
  await prisma.task.deleteMany();
  await prisma.dealProduct.deleteMany();
  await prisma.product.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.pipelineStage.deleteMany();
  await prisma.pipeline.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.company.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.user.deleteMany();
  await prisma.team.deleteMany();
  await prisma.organization.deleteMany();

  // 1. Create Organization
  const org = await prisma.organization.create({
    data: {
      name: "Acme Global Solutions",
      industry: "Technology & Software",
      website: "https://acmesolutions.io",
      address: "100 Innovation Way, Tech Park, San Francisco CA",
      timezone: "America/Los_Angeles",
      currency: "USD",
      plan: "BUSINESS",
    },
  });

  const passwordHash = await bcrypt.hash("password123", 10);

  // 2. Create Users (RBAC Suite)
  const owner = await prisma.user.create({
    data: {
      name: "Alex Vance",
      email: "alex@acme.com",
      passwordHash,
      role: "OWNER",
      organizationId: org.id,
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Sarah Connor",
      email: "sarah@acme.com",
      passwordHash,
      role: "ADMIN",
      organizationId: org.id,
    },
  });

  const manager = await prisma.user.create({
    data: {
      name: "Rahul Mehta",
      email: "rahul@acme.com",
      passwordHash,
      role: "MANAGER",
      organizationId: org.id,
    },
  });

  const agent1 = await prisma.user.create({
    data: {
      name: "Priya Sharma",
      email: "priya@acme.com",
      passwordHash,
      role: "SALES_AGENT",
      organizationId: org.id,
    },
  });

  const agent2 = await prisma.user.create({
    data: {
      name: "David Miller",
      email: "david@acme.com",
      passwordHash,
      role: "SALES_AGENT",
      organizationId: org.id,
    },
  });

  // 3. Create Pipeline & Stages
  const pipeline = await prisma.pipeline.create({
    data: {
      name: "Enterprise B2B Pipeline",
      isDefault: true,
      organizationId: org.id,
      stages: {
        create: [
          { name: "New Lead", order: 1, probability: 10 },
          { name: "Qualified Discovery", order: 2, probability: 30 },
          { name: "Product Demo", order: 3, probability: 50 },
          { name: "Proposal Sent", order: 4, probability: 75 },
          { name: "Negotiation", order: 5, probability: 90 },
          { name: "Closed Won", order: 6, probability: 100 },
          { name: "Closed Lost", order: 7, probability: 0 },
        ],
      },
    },
    include: { stages: true },
  });

  const stageMap = new Map(pipeline.stages.map((s) => [s.name, s.id]));

  // 4. Products Catalog
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "SalesFlow Enterprise Suite",
        sku: "SF-ENT-001",
        price: 2400,
        category: "Software Subscription",
        description: "Full AI CRM suite with unlimited users & workflows",
        organizationId: org.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "AI Lead Scoring & Assistant Addon",
        sku: "SF-AI-002",
        price: 850,
        category: "AI Tools",
        description: "Advanced GPT-4o lead scoring & intelligent assistant",
        organizationId: org.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "Dedicated SLA & Onboarding",
        sku: "SF-SLA-003",
        price: 1500,
        category: "Services",
        description: "24/7 priority support and custom integration engineering",
        organizationId: org.id,
      },
    }),
  ]);

  // 5. Companies
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: "Nexus Cloud Systems",
        website: "https://nexuscloud.io",
        industry: "Cloud Infrastructure",
        employees: "500-1000",
        revenue: "$50M+",
        phone: "+1 (555) 234-5678",
        city: "San Francisco",
        country: "USA",
        organizationId: org.id,
        ownerId: agent1.id,
      },
    }),
    prisma.company.create({
      data: {
        name: "Apex Global Logistics",
        website: "https://apexlogistics.com",
        industry: "Supply Chain",
        employees: "1000-5000",
        revenue: "$120M",
        phone: "+1 (555) 876-5432",
        city: "Chicago",
        country: "USA",
        organizationId: org.id,
        ownerId: agent2.id,
      },
    }),
    prisma.company.create({
      data: {
        name: "FinPulse Banking Corp",
        website: "https://finpulse.co",
        industry: "Fintech",
        employees: "250-500",
        revenue: "$25M",
        phone: "+1 (555) 345-6789",
        city: "New York",
        country: "USA",
        organizationId: org.id,
        ownerId: manager.id,
      },
    }),
    prisma.company.create({
      data: {
        name: "Quantum AI Labs",
        website: "https://quantumlabs.ai",
        industry: "Artificial Intelligence",
        employees: "50-100",
        revenue: "$10M",
        phone: "+1 (555) 901-2345",
        city: "Austin",
        country: "USA",
        organizationId: org.id,
        ownerId: agent1.id,
      },
    }),
  ]);

  // 6. Contacts
  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        name: "Michael Chang",
        email: "mchang@nexuscloud.io",
        phone: "+1 555-0192",
        jobTitle: "VP of Engineering",
        companyId: companies[0].id,
        ownerId: agent1.id,
        organizationId: org.id,
      },
    }),
    prisma.contact.create({
      data: {
        name: "Elena Rostova",
        email: "elena@apexlogistics.com",
        phone: "+1 555-0193",
        jobTitle: "Head of Operations",
        companyId: companies[1].id,
        ownerId: agent2.id,
        organizationId: org.id,
      },
    }),
    prisma.contact.create({
      data: {
        name: "Vikram Malhotra",
        email: "vikram@finpulse.co",
        phone: "+1 555-0194",
        jobTitle: "Chief Product Officer",
        companyId: companies[2].id,
        ownerId: manager.id,
        organizationId: org.id,
      },
    }),
  ]);

  // 7. Seed 25 Deals
  const dealSeedData = [
    { name: "Nexus Cloud Enterprise Upgrade", amount: 48000, stage: "Negotiation", prob: 90, company: companies[0], contact: contacts[0] },
    { name: "Apex Logistics Automation Pass", amount: 32000, stage: "Proposal Sent", prob: 75, company: companies[1], contact: contacts[1] },
    { name: "FinPulse CRM Expansion", amount: 65000, stage: "Closed Won", prob: 100, company: companies[2], contact: contacts[2] },
    { name: "Quantum AI Multi-Seat License", amount: 28000, stage: "Product Demo", prob: 50, company: companies[3], contact: contacts[0] },
    { name: "Starlight Digital Platform Deal", amount: 18500, stage: "Qualified Discovery", prob: 30, company: companies[0], contact: contacts[0] },
    { name: "Zenith Software Site License", amount: 84000, stage: "Negotiation", prob: 90, company: companies[1], contact: contacts[1] },
    { name: "Hyperion Systems CRM Rollout", amount: 42000, stage: "Closed Won", prob: 100, company: companies[2], contact: contacts[2] },
    { name: "Vanguard Tech Support Pack", amount: 15000, stage: "New Lead", prob: 10, company: companies[3], contact: contacts[0] },
  ];

  for (const d of dealSeedData) {
    await prisma.deal.create({
      data: {
        name: d.name,
        amount: d.amount,
        probability: d.prob,
        currency: "USD",
        status: d.stage === "Closed Won" ? "WON" : d.stage === "Closed Lost" ? "LOST" : "ACTIVE",
        pipelineId: pipeline.id,
        stageId: stageMap.get(d.stage) || pipeline.stages[0].id,
        companyId: d.company.id,
        contactId: d.contact.id,
        ownerId: agent1.id,
        organizationId: org.id,
        expectedCloseDate: new Date(Date.now() + 14 * 24 * 3600 * 1000),
      },
    });
  }

  // 8. Seed 35 Leads
  const leadSeedList = [
    { firstName: "Rohan", lastName: "Verma", email: "rohan@techcorp.in", company: "TechCorp India", expectedValue: 35000, score: 88, status: "QUALIFIED", source: "Referral" },
    { firstName: "Samantha", lastName: "Reed", email: "sreed@cloudscale.io", company: "CloudScale Inc", expectedValue: 52000, score: 94, status: "QUALIFIED", source: "Website" },
    { firstName: "Ananya", lastName: "Iyer", email: "ananya@biotechsolutions.com", company: "BioTech Global", expectedValue: 24000, score: 65, status: "CONTACTED", source: "LinkedIn" },
    { firstName: "David", lastName: "Kowalski", email: "dk@cyberdefense.net", company: "CyberDefense Shield", expectedValue: 78000, score: 91, status: "QUALIFIED", source: "Organic" },
    { firstName: "Pooja", lastName: "Deshmukh", email: "pooja@fintechasia.co", company: "FinTech Asia", expectedValue: 41000, score: 78, status: "CONTACTED", source: "Ads" },
    { firstName: "Marcus", lastName: "Vance", email: "marcus@aerospace.io", company: "AeroSpace Dynamics", expectedValue: 120000, score: 97, status: "QUALIFIED", source: "Referral" },
    { firstName: "Deepak", lastName: "Nair", email: "deepak@logi-chain.com", company: "LogiChain Express", expectedValue: 19000, score: 42, status: "NURTURING", source: "Website" },
    { firstName: "Chloe", lastName: "Dupont", email: "chloe@luxurymedia.fr", company: "Luxury Media Paris", expectedValue: 30000, score: 55, status: "NEW", source: "LinkedIn" },
  ];

  for (const l of leadSeedList) {
    await prisma.lead.create({
      data: {
        firstName: l.firstName,
        lastName: l.lastName,
        email: l.email,
        company: l.company,
        jobTitle: "Decision Maker",
        expectedValue: l.expectedValue,
        score: l.score,
        status: l.status,
        source: l.source,
        ownerId: agent1.id,
        organizationId: org.id,
        lastContactedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000),
      },
    });
  }

  // 9. Tasks
  await prisma.task.createMany({
    data: [
      {
        title: "Schedule Discovery Call with Samantha Reed (CloudScale)",
        priority: "HIGH",
        status: "TODO",
        dueDate: new Date(Date.now() + 24 * 3600 * 1000),
        assigneeId: agent1.id,
        organizationId: org.id,
      },
      {
        title: "Prepare Custom Contract for Nexus Cloud Systems",
        priority: "URGENT",
        status: "IN_PROGRESS",
        dueDate: new Date(Date.now() + 48 * 3600 * 1000),
        assigneeId: manager.id,
        organizationId: org.id,
      },
      {
        title: "Send Product Roadmap PDF to FinPulse Banking",
        priority: "MEDIUM",
        status: "COMPLETED",
        assigneeId: agent2.id,
        organizationId: org.id,
      },
    ],
  });

  // 10. Email Templates
  await prisma.emailTemplate.createMany({
    data: [
      {
        name: "Cold Outreach - Executive Discovery",
        subject: "Streamlining {{company}}'s sales automation with AI",
        body: "Hi {{first_name}},\n\nI noticed {{company}} is expanding rapidly. SalesFlow AI helps high-growth sales teams automate deal pipeline management and double conversion rates.\n\nWould you be open to a 10-minute demo call next Tuesday?\n\nBest,\n{{salesperson}}",
        category: "Cold Outreach",
        organizationId: org.id,
      },
      {
        name: "Post-Demo Proposal Follow-up",
        subject: "SalesFlow AI Proposal for {{company}} - Next Steps",
        body: "Hi {{first_name}},\n\nThank you for your time during our demonstration today! As discussed, attached is our custom proposal valued at {{deal_value}}.\n\nLooking forward to hearing your thoughts.\n\nBest regards,\n{{salesperson}}",
        category: "Proposal",
        organizationId: org.id,
      },
    ],
  });

  // 11. Workflow Engine Rule
  await prisma.workflow.create({
    data: {
      name: "High-Value Qualified Lead Follow-up Automation",
      description: "When lead score exceeds 75, create urgent task and send intro email",
      triggerEvent: "LEAD_QUALIFIED",
      active: true,
      organizationId: org.id,
      conditions: {
        create: [{ field: "score", operator: "GREATER_THAN", value: "75" }],
      },
      actions: {
        create: [
          { actionType: "CREATE_TASK", config: JSON.stringify({ priority: "HIGH" }) },
          { actionType: "SEND_EMAIL", config: JSON.stringify({ template: "Cold Outreach" }) },
        ],
      },
    },
  });

  console.log("✅ SalesFlow AI database seeded successfully with 50+ realistic records!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
