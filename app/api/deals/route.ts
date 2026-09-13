import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/auth";
import { triggerWorkflows } from "@/lib/automation";
import { logAudit } from "@/lib/audit";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const pipeline = await prisma.pipeline.findFirst({
      where: { organizationId: user.organizationId, isDefault: true },
      include: {
        stages: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!pipeline) {
      return NextResponse.json({ pipeline: null, deals: [] });
    }

    const deals = await prisma.deal.findMany({
      where: { organizationId: user.organizationId, pipelineId: pipeline.id },
      include: {
        company: true,
        contact: true,
        owner: true,
        stage: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ pipeline, deals });
  } catch (error) {
    console.error("GET /api/deals error:", error);
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, amount, companyId, contactId, stageId, pipelineId, probability, expectedCloseDate, notes } = await req.json();

    if (!name || !amount || !stageId) {
      return NextResponse.json({ error: "Name, amount, and stage are required" }, { status: 400 });
    }

    const defaultPipeline = await prisma.pipeline.findFirst({
      where: { organizationId: user.organizationId, isDefault: true },
    });

    const deal = await prisma.deal.create({
      data: {
        name,
        amount: Number(amount),
        currency: "USD",
        probability: Number(probability) || 50,
        expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : null,
        companyId: companyId || null,
        contactId: contactId || null,
        pipelineId: pipelineId || defaultPipeline?.id || "",
        stageId,
        ownerId: user.id,
        organizationId: user.organizationId,
        notes: notes || null,
        status: "ACTIVE",
      },
      include: {
        company: true,
        contact: true,
        owner: true,
        stage: true,
      },
    });

    await logAudit({
      organizationId: user.organizationId,
      userId: user.id,
      action: "CREATE_DEAL",
      entityType: "Deal",
      entityId: deal.id,
      newData: deal,
    });

    await triggerWorkflows("DEAL_CREATED", user.organizationId, deal);

    return NextResponse.json({ deal });
  } catch (error) {
    console.error("POST /api/deals error:", error);
    return NextResponse.json({ error: "Failed to create deal" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, stageId, status, amount, name } = await req.json();

    const existingDeal = await prisma.deal.findFirst({
      where: { id, organizationId: user.organizationId },
    });

    if (!existingDeal) {
      return NextResponse.json({ error: "Deal not found" }, { status: 404 });
    }

    const updates: any = {};
    if (stageId) updates.stageId = stageId;
    if (status) updates.status = status;
    if (amount !== undefined) updates.amount = Number(amount);
    if (name) updates.name = name;

    const updatedDeal = await prisma.deal.update({
      where: { id },
      data: updates,
      include: { stage: true, company: true, contact: true, owner: true },
    });

    await logAudit({
      organizationId: user.organizationId,
      userId: user.id,
      action: "UPDATE_DEAL_STAGE",
      entityType: "Deal",
      entityId: id,
      oldData: existingDeal,
      newData: updatedDeal,
    });

    if (stageId && stageId !== existingDeal.stageId) {
      await triggerWorkflows("DEAL_STAGE_CHANGED", user.organizationId, updatedDeal);
    }
    if (status === "WON") {
      await triggerWorkflows("DEAL_WON", user.organizationId, updatedDeal);
    }

    return NextResponse.json({ deal: updatedDeal });
  } catch (error) {
    console.error("PATCH /api/deals error:", error);
    return NextResponse.json({ error: "Failed to update deal" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Deal ID required" }, { status: 400 });

    await prisma.deal.deleteMany({
      where: { id, organizationId: user.organizationId },
    });

    await logAudit({
      organizationId: user.organizationId,
      userId: user.id,
      action: "DELETE_DEAL",
      entityType: "Deal",
      entityId: id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/deals error:", error);
    return NextResponse.json({ error: "Failed to delete deal" }, { status: 500 });
  }
}
