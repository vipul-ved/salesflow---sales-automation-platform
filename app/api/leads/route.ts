import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/auth";
import { calculateLeadScore } from "@/lib/ai";
import { triggerWorkflows } from "@/lib/automation";
import { logAudit } from "@/lib/audit";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");
    const source = searchParams.get("source");

    const where: any = {
      organizationId: user.organizationId,
    };

    if (status && status !== "ALL") {
      where.status = status;
    }
    if (source && source !== "ALL") {
      where.source = source;
    }
    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { company: { contains: search } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      include: { owner: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const { firstName, lastName, email, phone, company, jobTitle, source, expectedValue, notes } = data;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "First name, last name, and email are required" }, { status: 400 });
    }

    // AI Lead Scoring
    const scoringResult = await calculateLeadScore({
      company,
      expectedValue: Number(expectedValue) || 0,
      source,
      notes,
    });

    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        company: company || null,
        jobTitle: jobTitle || null,
        source: source || "Website",
        status: "NEW",
        score: scoringResult.score,
        expectedValue: Number(expectedValue) || 0,
        notes: notes || null,
        ownerId: user.id,
        organizationId: user.organizationId,
      },
    });

    await logAudit({
      organizationId: user.organizationId,
      userId: user.id,
      action: "CREATE_LEAD",
      entityType: "Lead",
      entityId: lead.id,
      newData: lead,
    });

    // Automation Trigger
    await triggerWorkflows("LEAD_CREATED", user.organizationId, lead);

    return NextResponse.json({ lead, scoreAnalysis: scoringResult });
  } catch (error) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, ...updates } = await req.json();

    const existingLead = await prisma.lead.findFirst({
      where: { id, organizationId: user.organizationId },
    });

    if (!existingLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: updates,
    });

    await logAudit({
      organizationId: user.organizationId,
      userId: user.id,
      action: "UPDATE_LEAD",
      entityType: "Lead",
      entityId: id,
      oldData: existingLead,
      newData: updatedLead,
    });

    if (updates.status === "QUALIFIED") {
      await triggerWorkflows("LEAD_QUALIFIED", user.organizationId, updatedLead);
    }

    return NextResponse.json({ lead: updatedLead });
  } catch (error) {
    console.error("PATCH /api/leads error:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Lead ID required" }, { status: 400 });

    await prisma.lead.deleteMany({
      where: { id, organizationId: user.organizationId },
    });

    await logAudit({
      organizationId: user.organizationId,
      userId: user.id,
      action: "DELETE_LEAD",
      entityType: "Lead",
      entityId: id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/leads error:", error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
