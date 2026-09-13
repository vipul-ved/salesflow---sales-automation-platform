import { prisma } from "./prisma";

export type WorkflowTriggerEvent = "LEAD_CREATED" | "LEAD_QUALIFIED" | "DEAL_CREATED" | "DEAL_STAGE_CHANGED" | "DEAL_WON" | "DEAL_LOST" | "TASK_COMPLETED";

export async function triggerWorkflows(
  event: WorkflowTriggerEvent,
  organizationId: string,
  payload: Record<string, any>
) {
  try {
    const activeWorkflows = await prisma.workflow.findMany({
      where: {
        organizationId,
        triggerEvent: event,
        active: true,
      },
      include: {
        conditions: true,
        actions: true,
      },
    });

    for (const workflow of activeWorkflows) {
      // Evaluate Conditions
      let conditionsMet = true;
      for (const cond of workflow.conditions) {
        const payloadVal = payload[cond.field];
        if (cond.operator === "EQUALS" && String(payloadVal) !== String(cond.value)) {
          conditionsMet = false;
        } else if (cond.operator === "GREATER_THAN" && Number(payloadVal) <= Number(cond.value)) {
          conditionsMet = false;
        } else if (cond.operator === "LESS_THAN" && Number(payloadVal) >= Number(cond.value)) {
          conditionsMet = false;
        }
      }

      if (conditionsMet) {
        // Execute Actions
        for (const action of workflow.actions) {
          if (action.actionType === "CREATE_TASK") {
            await prisma.task.create({
              data: {
                organizationId,
                title: `Automated Task: Follow up on ${payload.name || payload.firstName || "new event"}`,
                description: `Created automatically by workflow "${workflow.name}"`,
                priority: "HIGH",
                leadId: payload.leadId || payload.id,
                dealId: payload.dealId,
              },
            });
          } else if (action.actionType === "SEND_EMAIL") {
            await prisma.email.create({
              data: {
                organizationId,
                subject: `Welcome / Follow Up for ${payload.firstName || payload.name || "Valued Prospect"}`,
                body: `Automated workflow email sent via ${workflow.name}`,
                fromEmail: "sales@salesflow.ai",
                toEmail: payload.email || "prospect@example.com",
                leadId: payload.leadId || payload.id,
                status: "SENT",
              },
            });
          }
        }
      }
    }
  } catch (error) {
    console.error("Workflow trigger execution failed:", error);
  }
}
