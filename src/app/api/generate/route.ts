import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const reportPrompt = (formData: {
  businessName: string;
  industry: string;
  locations: string;
  employees: string;
  painPoint: string;
}) => `You are an AI business consultant for Bluegrass Advisory Group, a tech consulting firm in Lexington, KY. A prospect just entered their info into our demo tool. Generate a SHORT, specific, actionable AI opportunity report for them. Be direct, no fluff, no generic advice. Sound like a real operator who knows their industry.

Business: ${formData.businessName}
Industry: ${formData.industry}
Locations: ${formData.locations}
Employees: ${formData.employees || "Not specified"}
Biggest pain point: ${formData.painPoint}

Respond ONLY in this exact JSON format, no markdown, no backticks:
{"headline":"One punchy line about their biggest opportunity","opportunities":[{"title":"Short title","impact":"High/Medium","description":"2-3 sentences, specific to their industry and pain point. What it does and why it matters.","savings":"Estimated time or money saved per month"},{"title":"Short title","impact":"High/Medium","description":"2-3 sentences","savings":"Estimate"},{"title":"Short title","impact":"Medium","description":"2-3 sentences","savings":"Estimate"}],"quickWin":"One thing they could do THIS WEEK with free tools to see immediate results. Be specific.","bottomLine":"One honest sentence about whether AI makes sense for them right now."}`;

const websitePrompt = (formData: {
  businessName: string;
  whatYouDo: string;
  location: string;
  vibe: string;
}) => `You are a web designer for Bluegrass Advisory Group. Generate website content for a small business. Be specific to their actual business — no generic filler. Write like a human, not a marketing bot.

Business: ${formData.businessName}
What they do: ${formData.whatYouDo}
Location: ${formData.location || "Not specified"}
Design vibe: ${formData.vibe}

Respond ONLY in this exact JSON format, no markdown, no backticks:
{"tagline":"A short punchy headline for their hero section, 8 words max","subtext":"One sentence that explains what the business does and why someone should care. Specific to them.","sections":[{"title":"Section heading","content":"2-3 sentences of real copy for this section. Make it specific to what they actually do."},{"title":"Section heading","content":"2-3 sentences"},{"title":"Section heading","content":"2-3 sentences"}],"cta":"Call to action button text, 3-4 words max","colorPrimary":"A hex color that fits the vibe and industry","colorAccent":"A complementary accent hex color","fontVibe":"serif or sans-serif"}`;

export async function POST(request: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { allowed, remaining } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429, headers: { "X-RateLimit-Remaining": "0" } }
    );
  }

  try {
    const body = await request.json();
    const { type, formData } = body;

    if (!type || !formData) {
      return NextResponse.json(
        { error: "Missing type or formData" },
        { status: 400 }
      );
    }

    const prompt =
      type === "report" ? reportPrompt(formData) : websitePrompt(formData);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json(
        { error: "Generation failed" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.content
      .map((i: { text?: string }) => i.text || "")
      .join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json(parsed, {
      headers: { "X-RateLimit-Remaining": String(remaining) },
    });
  } catch (err) {
    console.error("Generate route error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
