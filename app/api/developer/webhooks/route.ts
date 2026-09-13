import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import crypto from "crypto";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const webhooks = await prisma.webhook.findMany({
      where: { organizationId: user.organizationId },
      include: { deliveries: { take: 5, orderBy: { createdAt: "desc" } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ webhooks });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch webhooks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, url, events } = await req.json();
    if (!name || !url) return NextResponse.json({ error: "Name and URL required" }, { status: 400 });

    const secret = `whsec_${crypto.randomBytes(16).toString("hex")}`;

    const webhook = await prisma.webhook.create({
      data: {
        name,
        url,
        events: JSON.stringify(events || ["lead.created", "deal.updated"]),
        secret,
        organizationId: user.organizationId,
      },
    });

    return NextResponse.json({ webhook });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create webhook" }, { status: 500 });
  }
}
