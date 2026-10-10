import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

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
  "1m_to_5m": "$1M to $5M",
  "5m_to_15m": "$5M to $15M",
  "15m_to_50m": "$15M to $50M",
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

// Airtable "BAG CRM" base: one Contact plus one Pipeline row at Stage Lead.
// Email is the dedupe key on Contacts; company name is the key on Pipeline.
const AT_BASE = "appOBDNbuSrxIfpqr";
const AT_CONTACTS = "tblpmoLXuqyLr1Cjd";
const AT_PIPELINE = "tblbx8PVXPHeNKFwF";

async function airtable(path: string, method: string, payload?: unknown) {
  const token = process.env.AIRTABLE_PAT;
  if (!token) throw new Error("AIRTABLE_PAT not configured");
  const res = await fetch(`https://api.airtable.com/v0/${AT_BASE}/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Airtable ${method} ${path} ${res.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

function quote(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function findOne(table: string, formula: string): Promise<string | undefined> {
  const q = new URLSearchParams({ filterByFormula: formula, maxRecords: "1" });
  const data = await airtable(`${table}?${q}`, "GET");
  return data?.records?.[0]?.id;
}

async function pushToAirtable(body: IntakePayload) {
  const email = body.email.trim().toLowerCase();
  const company = body.company_name.trim();
  const revenue = REVENUE_LABELS[body.annual_revenue_range] || body.annual_revenue_range;
  const intake = [
    `Website intake ${new Date().toISOString().slice(0, 10)}`,
    `Website: ${body.company_website?.trim() || "(not provided)"}`,
    `Revenue: ${revenue}`,
    `Entities: ${body.num_entities}`,
    `Best call time: ${body.best_call_time?.trim() || "(not provided)"}`,
    "",
    body.ai_question.trim(),
  ].join("\n");

  // Pipeline row: reuse if the company already exists, else create at Lead.
  let pipelineId = await findOne(AT_PIPELINE, `LOWER({Name})="${quote(company.toLowerCase())}"`);
  if (!pipelineId) {
    const created = await airtable(AT_PIPELINE, "POST", {
      fields: {
        Name: company,
        Type: "Prospect",
        Stage: "Lead",
        Health: "New",
        "Engagement Type": "TBD",
        "Next Action": "Reply to website intake",
        "Next Action Date": new Date().toISOString().slice(0, 10),
        "Intake Contact (raw)": intake,
      },
      typecast: true,
    });
    pipelineId = created.id;
  } else {
    await airtable(`${AT_PIPELINE}/${pipelineId}`, "PATCH", {
      fields: { "Intake Contact (raw)": intake },
    });
  }

  // Contact: match on email, else create; always link to the company.
  const contactId = await findOne(AT_CONTACTS, `LOWER({Email})="${quote(email)}"`);
  const contactFields = {
    Name: body.contact_name.trim(),
    Email: email,
    Role: body.contact_role?.trim() || undefined,
    Company: [pipelineId],
    Notes: intake,
  };
  if (contactId) {
    await airtable(`${AT_CONTACTS}/${contactId}`, "PATCH", { fields: { Company: [pipelineId], Notes: intake } });
  } else {
    await airtable(AT_CONTACTS, "POST", { fields: contactFields, typecast: true });
  }
}

// Bot checks. Turnstile runs only when both keys are set, so a deploy without
// keys still takes real leads (honeypot and timing still apply).
const MIN_FILL_MS = 3000;

async function turnstileOk(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return true;
  if (!token) return false;
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set("remoteip", ip);
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verify failed:", err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  // ponytail: in-memory counter per serverless instance, so best effort only.
  // Move to a shared store (Vercel KV or Upstash) if spam spreads across instances.
  const limit = checkRateLimit(`intake:${getClientIp(request) ?? "unknown"}`);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error:
          "Too many submissions from your network. Please wait an hour or email phil@bluegrassadvisorygroup.com directly.",
      },
      { status: 429 },
    );
  }

  try {
    const raw = (await request.json()) as IntakePayload & {
      bag_hp?: string;
      elapsed_ms?: number;
      turnstile_token?: string;
    };
    const { bag_hp, elapsed_ms, turnstile_token, ...body } = raw;

    // Honeypot: people never see this field. Answer as if it worked.
    if (bag_hp && String(bag_hp).trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    if (typeof elapsed_ms !== "number" || elapsed_ms < MIN_FILL_MS) {
      return NextResponse.json(
        { error: "That was quicker than we expected. Please try again." },
        { status: 400 },
      );
    }

    if (!(await turnstileOk(String(turnstile_token || ""), getClientIp(request)))) {
      return NextResponse.json(
        { error: "We could not confirm you are not a bot. Please try again." },
        { status: 403 },
      );
    }

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
        "Supabase env vars missing: intake form cannot save submissions",
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

    // Airtable CRM: contact plus pipeline row. Awaited, because the function
    // is frozen once the response goes out and a detached write gets cut off.
    // A failed save flags Phil's notification and skips the prospect's
    // confirmation, so neither side reads it as a clean success.
    let crmError: string | null = null;
    try {
      await pushToAirtable(body);
    } catch (err) {
      crmError = String(err instanceof Error ? err.message : err).slice(0, 300);
      console.error("Airtable push failed:", crmError);
    }

    // Email: fire and forget. Don't block form success on email send.
    const notificationEmail =
      process.env.BAG_NOTIFICATION_EMAIL || "phil@bluegrassadvisorygroup.com";
    const fromAddress =
      process.env.RESEND_FROM_ADDRESS ||
      "Bluegrass Advisory <onboarding@resend.dev>";
    const calendlyUrl =
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      "https://cal.com/philip-fifield/intro";

    // Brand: UK blue #0033A0 accent, ink #161B22, body #3B4350, line #D9D8D1.
    const head = "font-family: 'Hanken Grotesk', Arial, sans-serif;";
    const read = "font-family: 'Newsreader', Georgia, serif;";
    const logo = `<img src="https://bluegrassadvisorygroup.com/brand/logo-lockup-600x115.png" width="240" height="46" alt="Bluegrass Advisory Group" style="display: block; border: 0;">`;
    const cell = `style="${head} font-weight: 600; color: #161B22; width: 180px; border-bottom: 1px solid #D9D8D1;"`;
    const val = `style="border-bottom: 1px solid #D9D8D1;"`;

    // Notification to Phil
    const phNotification = sendResendEmail({
      from: fromAddress,
      to: [notificationEmail],
      reply_to: body.email,
      subject: `${crmError ? "NOT in Airtable: " : ""}New BAG intake: ${body.contact_name} @ ${body.company_name}`,
      html: `
        <div style="${read} max-width: 600px; line-height: 1.6; color: #3B4350; background: #FFFFFF;">
          ${logo}
          ${crmError ? `<p style="${head} color: #B42318; font-weight: 700; border: 1px solid #B42318; padding: 12px; margin: 16px 0;">NOT in Airtable. This lead did not save to the BAG CRM, so add it by hand. Error: ${escapeHtml(crmError)}</p>` : ""}
          <h2 style="${head} color: #161B22; border-bottom: 2px solid #0033A0; padding: 16px 0 8px; margin: 0 0 8px;">New website intake</h2>
          <table cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <tr><td ${cell}>Name</td><td ${val}>${escapeHtml(body.contact_name)}</td></tr>
            <tr><td ${cell}>Role</td><td ${val}>${escapeHtml(body.contact_role || "(not provided)")}</td></tr>
            <tr><td ${cell}>Email</td><td ${val}><a href="mailto:${escapeHtml(body.email)}" style="color: #0033A0;">${escapeHtml(body.email)}</a></td></tr>
            <tr><td ${cell}>Company</td><td ${val}>${escapeHtml(body.company_name)}</td></tr>
            <tr><td ${cell}>Website</td><td ${val}>${body.company_website ? `<a href="${escapeHtml(body.company_website)}" style="color: #0033A0;">${escapeHtml(body.company_website)}</a>` : "(not provided)"}</td></tr>
            <tr><td ${cell}>Revenue</td><td ${val}>${escapeHtml(REVENUE_LABELS[body.annual_revenue_range] || body.annual_revenue_range)}</td></tr>
            <tr><td ${cell}>Entities</td><td ${val}>${escapeHtml(body.num_entities)}</td></tr>
            <tr><td ${cell}>Best call time</td><td ${val}>${escapeHtml(body.best_call_time || "(not provided)")}</td></tr>
          </table>
          <h3 style="${head} color: #0033A0; margin-top: 24px;">What they need</h3>
          <div style="padding: 16px; border: 1px solid #D9D8D1; border-radius: 4px;">
            ${escapeHtml(body.ai_question).replace(/\n/g, "<br>")}
          </div>
          <p style="${head} color: #5A6370; font-size: 13px; margin-top: 24px;">
            Submitted via bluegrassadvisorygroup.com/contact at ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET<br>
            Reply to this email to respond directly to ${escapeHtml(body.contact_name)}.
          </p>
        </div>
      `,
    });

    // Auto-confirmation to prospect, only when the lead fully saved.
    const phConfirmation = crmError ? null : sendResendEmail({
      from: fromAddress,
      to: [body.email],
      reply_to: notificationEmail,
      subject: "We received your inquiry",
      html: `
        <div style="${read} max-width: 600px; line-height: 1.6; color: #3B4350; background: #FFFFFF;">
          ${logo}
          <h2 style="${head} color: #161B22; border-bottom: 2px solid #0033A0; padding: 16px 0 8px; margin: 0 0 16px;">Thanks, ${escapeHtml(body.contact_name.split(" ")[0])}.</h2>
          <p>We got your submission. Phil will review it personally and reply with a tier recommendation and a one-page scope for what makes sense for your situation.</p>

          ${calendlyUrl ? `
            <p style="margin-top: 24px;"><strong>Want to skip the email back-and-forth?</strong> Book your free 30-minute intro call now:</p>
            <p style="text-align: center; margin: 24px 0;">
              <a href="${escapeHtml(calendlyUrl)}" style="${head} display: inline-block; background: #0033A0; color: #FFFFFF; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: 600;">Book a 30-minute call</a>
            </p>
          ` : ""}

          <h3 style="${head} color: #0033A0; margin-top: 24px;">What happens next</h3>
          <ol style="line-height: 1.8;">
            <li>Phil reviews your submission</li>
            <li>You receive a tier recommendation and a one-page scope</li>
            <li>A free 30-minute intro call to walk through it</li>
            <li>You decide whether to go ahead, wait, or skip it</li>
          </ol>

          <p style="margin-top: 24px;">Questions in the meantime? Reply to this email or write to <a href="mailto:phil@bluegrassadvisorygroup.com" style="color: #0033A0;">phil@bluegrassadvisorygroup.com</a>.</p>

          <hr style="border: none; border-top: 1px solid #D9D8D1; margin: 32px 0;">

          <p style="${head} font-size: 13px; color: #5A6370;">
            <strong style="color: #161B22;">Bluegrass Advisory Group, LLC</strong><br>
            AI Operations Consulting, Lexington, Kentucky<br>
            <a href="https://bluegrassadvisorygroup.com" style="color: #0033A0;">bluegrassadvisorygroup.com</a> · (859) 314-3051
          </p>
        </div>
      `,
    });

    // Wait on email sends but don't fail the request if they don't work
    const [notif, confirm] = await Promise.all([phNotification, phConfirmation]);
    if (!notif.ok) console.warn("Notification email failed:", notif.error);
    if (confirm && !confirm.ok) console.warn("Confirmation email failed:", confirm.error);

    if (crmError) {
      return NextResponse.json(
        {
          error:
            "We received your details, but they did not save completely on our side. Please also email phil@bluegrassadvisorygroup.com so your request is not missed.",
          crmSaved: false,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      emailsSent: notif.ok && !!confirm?.ok,
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
