import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { runAIAssistantQuery } from "@/lib/ai";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    const result = await runAIAssistantQuery({
      prompt,
      organizationId: user.organizationId,
    });

    // Save interaction
    await prisma.aIInteraction.create({
      data: {
        prompt,
        response: result.answer,
        userId: user.id,
        organizationId: user.organizationId,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Chat error:", error);
    return NextResponse.json({ error: "AI Assistant failed to process prompt" }, { status: 500 });
  }
}
