import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { logAudit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const { name, email, password, organizationName, industry } = await req.json();

    if (!name || !email || !password || !organizationName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 400 });
    }

    // 1. Create Organization
    const organization = await prisma.organization.create({
      data: {
        name: organizationName,
        industry: industry || "Software & Technology",
        plan: "PRO",
      },
    });

    // 2. Create Default Sales Pipeline
    const pipeline = await prisma.pipeline.create({
      data: {
        name: "Standard Sales Pipeline",
        isDefault: true,
        organizationId: organization.id,
        stages: {
          create: [
            { name: "New Lead", order: 1, probability: 10 },
            { name: "Qualified", order: 2, probability: 30 },
            { name: "Demo Completed", order: 3, probability: 50 },
            { name: "Proposal Sent", order: 4, probability: 75 },
            { name: "Negotiation", order: 5, probability: 90 },
            { name: "Closed Won", order: 6, probability: 100 },
            { name: "Closed Lost", order: 7, probability: 0 },
          ],
        },
      },
    });

    // 3. Create User as OWNER
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "OWNER",
        organizationId: organization.id,
      },
    });

    // 4. Set Session Cookie
    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationId: organization.id,
      organizationName: organization.name,
      teamId: null,
    };

    await setSessionCookie(sessionData);
    await logAudit({
      organizationId: organization.id,
      userId: user.id,
      action: "REGISTER_ORGANIZATION",
      entityType: "Organization",
      entityId: organization.id,
    });

    return NextResponse.json({ success: true, user: sessionData });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
