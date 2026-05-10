import { NextRequest, NextResponse } from "next/server";

type IntakePayload = {
  contact_name: string;
  contact_role?: string;
  email: string;
  company_name: string;
  company_website?: string;
  annual_revenue_range: string;
  num_entities: string;
  ai_question: string;
  best_call_time?: string;
};

const REVENUE_LABELS: Record<string, string> = {
  under_1m: "Under $1M",
  "1m_to_5m": "$1M – $5M",
  "5m_to_15m": "$5M – $15M",
  "15m_to_50m": "$15M – $50M",
  over_50m: "Over $50M",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return null;
}

async function sendResendEmail(payload: {
  from: string;
  to: string[];
  reply_to?: string;
  subject: string;
  html: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `Resend ${res.status}: ${text}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: `Resend network error: ${String(err)}` };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IntakePayload;

    // Validation
    const required: (keyof IntakePayload)[] = [
      "contact_name",
      "email",
      "company_name",
      "annual_revenue_range",
      "num_entities",
      "ai_question",
    ];
    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    if (!body.email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 },
      );
    }

    // Supabase insert
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error(
        "Supabase env vars missing — intake form cannot save submissions",
      );
      return NextResponse.json(
        { error: "Server configuration error. Please email phil directly." },
        { status: 500 },
      );
    }

    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || null;

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("bag_intakes").insert({
      contact_name: body.contact_name.trim(),
      contact_role: body.contact_role?.trim() || null,
      email: body.email.trim().toLowerCase(),
      company_name: body.company_name.trim(),
      company_website: body.company_website?.trim() || null,
      annual_revenue_range: body.annual_revenue_range,
      num_entities: body.num_entities,
      ai_question: body.ai_question.trim(),
      best_call_time: body.best_call_time?.trim() || null,
      status: "new",
      ip_address: ip,
      user_agent: userAgent,
      source: "website",
    });

    if (dbError) {
      console.error("bag_intakes insert error:", dbError);
      return NextResponse.json(
        {
          error:
            "Could not save your submission. Please email phil@bluegrassadvisorygroup.com directly.",
        },
        { status: 500 },
      );
    }

    // Email — fire and forget. Don't block form success on email send.
    const notificationEmail =
      process.env.BAG_NOTIFICATION_EMAIL || "phil@bluegrassadvisorygroup.com";
    const fromAddress =
      process.env.RESEND_FROM_ADDRESS ||
      "Bluegrass Advisory <onboarding@resend.dev>";
    const calendlyUrl =
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      "https://calendly.com/phil-bluegrassadvisorygroup/30min";

    // Notification to Phil
    const phNotification = sendResendEmail({
      from: fromAddress,
      to: [notificationEmail],
      reply_to: body.email,
      subject: `New BAG intake — ${body.contact_name} @ ${body.company_name}`,
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; line-height: 1.6;">
          <h2 style="color: #1C1C1E; border-bottom: 2px solid #0D7C66; padding-bottom: 8px;">New BAG intake</h2>
          <table cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <tr><td style="font-weight: 600; color: #3A3A3C; width: 180px;">Name</td><td>${escapeHtml(body.contact_name)}</td></tr>
            <tr><td style="font-weight: 600; color: #3A3A3C;">Role</td><td>${escapeHtml(body.contact_role || "(not provided)")}</td></tr>
            <tr><td style="font-weight: 600; color: #3A3A3C;">Email</td><td><a href="mailto:${escapeHtml(body.email)}" style="color: #0D7C66;">${escapeHtml(body.email)}</a></td></tr>
            <tr><td style="font-weight: 600; color: #3A3A3C;">Company</td><td>${escapeHtml(body.company_name)}</td></tr>
            <tr><td style="font-weight: 600; color: #3A3A3C;">Website</td><td>${body.company_website ? `<a href="${escapeHtml(body.company_website)}" style="color: #0D7C66;">${escapeHtml(body.company_website)}</a>` : "(not provided)"}</td></tr>
            <tr><td style="font-weight: 600; color: #3A3A3C;">Revenue</td><td>${escapeHtml(REVENUE_LABELS[body.annual_revenue_range] || body.annual_revenue_range)}</td></tr>
            <tr><td style="font-weight: 600; color: #3A3A3C;">Entities</td><td>${escapeHtml(body.num_entities)}</td></tr>
            <tr><td style="font-weight: 600; color: #3A3A3C;">Best call time</td><td>${escapeHtml(body.best_call_time || "(not provided)")}</td></tr>
          </table>
          <h3 style="color: #1C1C1E; margin-top: 24px;">AI question / need</h3>
          <div style="background: #FAF8F5; padding: 16px; border-left: 3px solid #0D7C66; border-radius: 4px;">
            ${escapeHtml(body.ai_question).replace(/\n/g, "<br>")}
          </div>
          <p style="color: #888; font-size: 13px; margin-top: 24px;">
            Submitted via bluegrassadvisorygroup.com/contact at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET<br>
            Reply to this email to respond directly to ${escapeHtml(body.contact_name)}.
          </p>
        </div>
      `,
    });

    // Auto-confirmation to prospect
    const phConfirmation = sendResendEmail({
      from: fromAddress,
      to: [body.email],
      reply_to: notificationEmail,
      subject: "We received your inquiry — Bluegrass Advisory Group",
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; line-height: 1.6; color: #3A3A3C;">
          <h2 style="color: #1C1C1E;">Thanks, ${escapeHtml(body.contact_name.split(" ")[0])}.</h2>
          <p>We got your submission. Phil will review it personally and reply within 24 hours with a tier recommendation and a one-page scope for what makes sense for your situation.</p>

          ${calendlyUrl ? `
            <p style="margin-top: 24px;"><strong>Want to skip the email back-and-forth?</strong> Book your free 30-min intro call now:</p>
            <p style="text-align: center; margin: 24px 0;">
              <a href="${escapeHtml(calendlyUrl)}" style="display: inline-block; background: #1C1C1E; color: #FAF8F5; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">Book Free 30-Min Call →</a>
            </p>
          ` : ""}

          <h3 style="color: #1C1C1E; margin-top: 24px;">What happens next</h3>
          <ol style="line-height: 1.8;">
            <li>Phil reviews your submission</li>
            <li>You receive a tier recommendation + one-page scope within 24 hours</li>
            <li>Free 30-min intro call to walk through it</li>
            <li>You decide: engage, defer, or skip — no pressure</li>
          </ol>

          <p style="margin-top: 24px;">Questions in the meantime? Reply to this email or write to <a href="mailto:phil@bluegrassadvisorygroup.com" style="color: #0D7C66;">phil@bluegrassadvisorygroup.com</a>.</p>

          <hr style="border: none; border-top: 1px solid #E0E0E0; margin: 32px 0;">

          <p style="font-size: 13px; color: #888;">
            <strong style="color: #1C1C1E;">Bluegrass Advisory Group</strong><br>
            AI Operations Consulting — Lexington, Kentucky<br>
            <a href="https://bluegrassadvisorygroup.com" style="color: #0D7C66;">bluegrassadvisorygroup.com</a> · (859) 314-3051
          </p>
        </div>
      `,
    });

    // Wait on email sends but don't fail the request if they don't work
    const [notif, confirm] = await Promise.all([phNotification, phConfirmation]);
    if (!notif.ok) console.warn("Notification email failed:", notif.error);
    if (!confirm.ok) console.warn("Confirmation email failed:", confirm.error);

    return NextResponse.json({
      ok: true,
      emailsSent: notif.ok && confirm.ok,
    });
  } catch (err) {
    console.error("Intake route error:", err);
    return NextResponse.json(
      {
        error:
          "Server error. Please try again or email phil@bluegrassadvisorygroup.com directly.",
      },
      { status: 500 },
    );
  }
}
