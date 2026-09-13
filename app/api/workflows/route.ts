import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const workflows = await prisma.workflow.findMany({
      where: { organizationId: user.organizationId },
      include: { conditions: true, actions: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ workflows });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch workflows" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, description, triggerEvent, field, operator, value, actionType } = await req.json();

    const workflow = await prisma.workflow.create({
      data: {
        name,
        description,
        triggerEvent: triggerEvent || "LEAD_CREATED",
        active: true,
        organizationId: user.organizationId,
        conditions: {
          create: [{ field: field || "score", operator: operator || "GREATER_THAN", value: String(value || "50") }],
        },
        actions: {
          create: [{ actionType: actionType || "CREATE_TASK", config: "{}" }],
        },
      },
      include: { conditions: true, actions: true },
    });

    return NextResponse.json({ workflow });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create workflow" }, { status: 500 });
  }
}
