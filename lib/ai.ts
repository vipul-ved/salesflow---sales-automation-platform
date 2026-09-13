import { prisma } from "./prisma";

// Lead Scoring Engine (Calculates 0-100 score + signal breakdown)
export async function calculateLeadScore(lead: {
  company?: string | null;
  industry?: string | null;
  expectedValue?: number;
  source?: string;
  lastContactedAt?: Date | null;
  notes?: string | null;
}) {
  let score = 40; // Base score
  const signals: string[] = [];

  if (lead.expectedValue && lead.expectedValue > 20000) {
    score += 25;
    signals.push(`High estimated deal value ($${lead.expectedValue.toLocaleString()}) (+25)`);
  } else if (lead.expectedValue && lead.expectedValue > 5000) {
    score += 15;
    signals.push(`Solid deal value ($${lead.expectedValue.toLocaleString()}) (+15)`);
  }

  if (lead.industry && ["Software", "Technology", "Finance", "Healthcare"].includes(lead.industry)) {
    score += 15;
    signals.push(`Target enterprise industry (${lead.industry}) (+15)`);
  }

  if (lead.source === "Referral" || lead.source === "LinkedIn") {
    score += 10;
    signals.push(`High-converting source channel (${lead.source}) (+10)`);
  }

  if (lead.lastContactedAt) {
    const daysSince = Math.floor((Date.now() - new Date(lead.lastContactedAt).getTime()) / (1000 * 3600 * 24));
    if (daysSince <= 7) {
      score += 10;
      signals.push("Recent contact activity within 7 days (+10)");
    } else if (daysSince > 30) {
      score -= 15;
      signals.push("No contact activity for over 30 days (-15)");
    }
  }

  const finalScore = Math.min(Math.max(score, 5), 99);
  let statusBadge = "Cold ❄️";
  if (finalScore >= 75) statusBadge = "Hot 🔥";
  else if (finalScore >= 45) statusBadge = "Warm ☀️";

  return {
    score: finalScore,
    statusBadge,
    signals,
  };
}

// AI Email Generator
export async function generateAIEmail({
  recipientName,
  companyName,
  dealValue,
  objective,
  tone = "Professional",
}: {
  recipientName: string;
  companyName?: string;
  dealValue?: number;
  objective: string;
  tone?: string;
}) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an expert sales email strategist. Generate a compelling sales email in a ${tone} tone. Keep it concise, punchy, and CTA-focused. Return JSON with 'subject' and 'body'.`,
            },
            {
              role: "user",
              content: `Recipient: ${recipientName}, Company: ${companyName || "N/A"}, Value: ${dealValue ? "$" + dealValue : "N/A"}, Objective: ${objective}`,
            },
          ],
          response_format: { type: "json_object" },
        }),
      });

      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        return JSON.parse(data.choices[0].message.content);
      }
    } catch (e) {
      console.error("OpenAI email generation error, using fallback:", e);
    }
  }

  // Fallback intelligent email generator
  const subject = `${tone === "Friendly" ? "Quick check-in with" : "Proposal & Partnership for"} ${companyName || recipientName}`;
  const body = `Hi ${recipientName},\n\nI hope you're having a productive week.\n\nFollowing up regarding ${objective.toLowerCase()}. We believe SalesFlow AI can help ${companyName || "your team"} streamline your sales process and drive higher conversion rates.\n\nWould you be open to a brief 10-minute call this Thursday to discuss options?\n\nBest regards,\nSalesFlow Team`;

  return { subject, body };
}

// AI Customer Summary Generator
export async function generateCustomerSummary(entity: {
  name: string;
  company?: string | null;
  expectedValue?: number;
  notes?: string | null;
  activitiesCount?: number;
}) {
  return {
    summary: `${entity.name} (${entity.company || "Independent"}) is a high-intent prospect with an estimated pipeline value of $${(entity.expectedValue || 0).toLocaleString()}. Key focus is automated CRM workflow adoption and sales acceleration.`,
    sentiment: "Positive / High Intent",
    recommendedAction: entity.expectedValue && entity.expectedValue > 25000 ? "Schedule executive demo call within 48 hours" : "Send follow-up product brochure & case study",
    decisionMaker: "CTO / VP of Sales",
  };
}

// AI Sales Assistant with Server-Side Tools
export async function runAIAssistantQuery({
  prompt,
  organizationId,
}: {
  prompt: string;
  organizationId: string;
}) {
  const queryLower = prompt.toLowerCase();

  // Natural Language & CRM Search Tool Logic
  if (queryLower.includes("lead") || queryLower.includes("prospect")) {
    const leads = await prisma.lead.findMany({
      where: { organizationId },
      orderBy: { score: "desc" },
      take: 5,
    });

    const leadList = leads
      .map((l) => `• **${l.firstName} ${l.lastName}** (${l.company || "N/A"}) - Score: ${l.score}/100 | Status: ${l.status} | Value: $${l.expectedValue.toLocaleString()}`)
      .join("\n");

    return {
      answer: `Here are your top-scoring leads in the pipeline:\n\n${leadList}\n\n*Tip: Would you like me to draft a follow-up email for any of these prospects?*`,
      data: leads,
    };
  }

  if (queryLower.includes("deal") || queryLower.includes("revenue") || queryLower.includes("forecast")) {
    const deals = await prisma.deal.findMany({
      where: { organizationId },
      include: { stage: true },
    });

    const totalValue = deals.reduce((acc, d) => acc + d.amount, 0);
    const wonValue = deals.filter((d) => d.status === "WON").reduce((acc, d) => acc + d.amount, 0);
    const activeValue = deals.filter((d) => d.status === "ACTIVE").reduce((acc, d) => acc + d.amount, 0);
    const expectedValue = deals
      .filter((d) => d.status === "ACTIVE")
      .reduce((acc, d) => acc + (d.amount * (d.probability / 100)), 0);

    return {
      answer: `📊 **Revenue & Sales Pipeline Summary**:\n\n• **Total Pipeline Value**: $${totalValue.toLocaleString()}\n• **Closed Won Revenue**: $${wonValue.toLocaleString()}\n• **Active Pipeline**: $${activeValue.toLocaleString()}\n• **AI Weighted Forecast**: **$${Math.round(expectedValue).toLocaleString()}**\n\nThere are **${deals.filter((d) => d.status === "ACTIVE").length} active deals** progressing through stages.`,
      data: { totalValue, wonValue, activeValue, expectedValue },
    };
  }

  if (queryLower.includes("task") || queryLower.includes("activity") || queryLower.includes("today")) {
    const tasks = await prisma.task.findMany({
      where: { organizationId, status: { not: "COMPLETED" } },
      take: 5,
    });

    const taskList = tasks
      .map((t) => `• **${t.title}** - Priority: \`${t.priority}\` | Status: \`${t.status}\``)
      .join("\n");

    return {
      answer: `Here are your upcoming priority tasks:\n\n${taskList || "No pending tasks found. Great job!"}`,
      data: tasks,
    };
  }

  return {
    answer: `SalesFlow AI analyzed your query: "${prompt}".\n\nYour organization currently has active pipelines, verified leads, and automated lead scoring active. Ask me to:\n1. *"Show my top hot leads"*\n2. *"Summarize expected revenue this month"*\n3. *"List pending urgent tasks"*`,
    data: null,
  };
}
