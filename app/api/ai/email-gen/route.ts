import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
import { generateAIEmail } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { recipientName, companyName, dealValue, objective, tone } = await req.json();

    const emailDraft = await generateAIEmail({
      recipientName: recipientName || "Prospect",
      companyName,
      dealValue,
      objective: objective || "Introduce SalesFlow AI CRM automation",
      tone: tone || "Professional",
    });

    return NextResponse.json(emailDraft);
  } catch (error) {
    console.error("AI Email Generation error:", error);
    return NextResponse.json({ error: "Failed to generate email" }, { status: 500 });
  }
}
