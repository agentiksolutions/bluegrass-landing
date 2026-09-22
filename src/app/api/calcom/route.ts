import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_BASE = "appOBDNbuSrxIfpqr"; // gitleaks:allow
const VISITS_TABLE = "tblYVmmItBZ0VmdpX"; // gitleaks:allow
const CONTACTS_TABLE = "tblpmoLXuqyLr1Cjd"; // gitleaks:allow
const PIPELINE_TABLE = "tblbx8PVXPHeNKFwF"; // gitleaks:allow
const STATUS_PLANNED = "Planned";
const STATUS_CANCELLED = "Cancelled";

type Json = Record<string, unknown>;

function verifyCalSignature(
  rawBody: string,
  header: string | null,
  secret: string
): boolean {
  if (!header || !secret) return false;
  const given = header.trim().replace(/^sha256=/i, "");
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function etDate(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(iso));
  const pick = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

function etStamp(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function hoursBetween(startIso: string, endIso: string): number {
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  if (!Number.isFinite(ms) || ms <= 0) return 0;
  return Math.round((ms / 3600000) * 100) / 100;
}

function asRecord(value: unknown): Json {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Json) : {};
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function eventTitle(payload: Json): string {
  const title = text(payload.title);
  if (title) return title;
  const eventType = asRecord(payload.eventType);
  const fromType = text(eventType.title) || text(eventType.slug);
  if (fromType) return fromType;
  return text(payload.type) || "booking";
}

function firstAttendee(payload: Json): { name: string; email: string } {
  const list = Array.isArray(payload.attendees) ? payload.attendees : [];
  for (const item of list) {
    const row = asRecord(item);
    const email = text(row.email);
    if (email) return { name: text(row.name) || email, email };
  }
  return { name: "", email: "" };
}

function responseLines(payload: Json): string {
  const lines: string[] = [];
  const notes = text(payload.additionalNotes);
  const description = text(payload.description);
  if (notes) lines.push(notes);
  if (description && description !== notes) lines.push(description);
  const bags = [payload.responses, payload.userFieldsResponses, payload.customInputs];
  for (const bag of bags) {
    const record = asRecord(bag);
    for (const [key, raw] of Object.entries(record)) {
      const wrapped = asRecord(raw);
      const value = "value" in wrapped ? wrapped.value : raw;
      if (value == null || value === "") continue;
      const rendered = Array.isArray(value) ? value.map((v) => String(v)).join(", ") : String(value);
      if (rendered.trim()) lines.push(`${key}: ${rendered.trim()}`);
    }
  }
  return lines.join("\n");
}

function visitName(attendeeName: string, title: string, companyName: string): string {
  const who = companyName || attendeeName || "Guest";
  return `${who} - ${title}`;
}

function notesBody(
  uid: string,
  attendeeName: string,
  email: string,
  startIso: string,
  payload: Json,
  alsoUid?: string
): string {
  const lines = [`Cal.com ${uid}`];
  if (alsoUid && alsoUid !== uid) lines.push(`Cal.com ${alsoUid}`);
  if (attendeeName) lines.push(attendeeName);
  if (email) lines.push(email);
  if (startIso) lines.push(etStamp(startIso));
  const extra = responseLines(payload);
  if (extra) lines.push(extra);
  return lines.join("\n");
}

function createdFields(
  payload: Json,
  companyName: string
): { visit: string; date: string; status: string; hours: number; notes: string; email: string } {
  const attendee = firstAttendee(payload);
  const title = eventTitle(payload);
  const start = text(payload.startTime);
  const end = text(payload.endTime);
  const uid = text(payload.uid);
  return {
    visit: visitName(attendee.name, title, companyName),
    date: start ? etDate(start) : "",
    status: STATUS_PLANNED,
    hours: start && end ? hoursBetween(start, end) : 0,
    notes: notesBody(uid, attendee.name, attendee.email, start, payload),
    email: attendee.email,
  };
}

function formulaQuote(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function airtable(
  pat: string,
  path: string,
  init: RequestInit = {}
): Promise<{ status: number; body: Json }> {
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${pat}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const textBody = await res.text();
  let body: Json = {};
  if (textBody) {
    try {
      body = JSON.parse(textBody) as Json;
    } catch {
      body = { raw: "unparsed" };
    }
  }
  return { status: res.status, body };
}

async function findVisit(pat: string, markers: string[]): Promise<string | null> {
  for (const marker of markers) {
    if (!marker) continue;
    const formula = `FIND("${formulaQuote("Cal.com " + marker)}", {Notes})`;
    const query = new URLSearchParams({
      filterByFormula: formula,
      maxRecords: "1",
      "fields[]": "Notes",
    });
    const found = await airtable(pat, `${VISITS_TABLE}?${query.toString()}`);
    const records = Array.isArray(found.body.records) ? found.body.records : [];
    const first = asRecord(records[0]);
    const id = text(first.id);
    if (id) return id;
  }
  return null;
}

async function companyForEmail(pat: string, email: string): Promise<{ id: string; name: string }> {
  if (!email) return { id: "", name: "" };
  const formula = `LOWER({Email})="${formulaQuote(email.toLowerCase())}"`;
  const query = new URLSearchParams({
    filterByFormula: formula,
    maxRecords: "1",
  });
  const found = await airtable(pat, `${CONTACTS_TABLE}?${query.toString()}`);
  const records = Array.isArray(found.body.records) ? found.body.records : [];
  const fields = asRecord(asRecord(records[0]).fields);
  const links = fields.Company;
  const companyId = Array.isArray(links) && typeof links[0] === "string" ? links[0] : "";
  if (!companyId) return { id: "", name: "" };
  const company = await airtable(pat, `${PIPELINE_TABLE}/${companyId}`);
  const name = text(asRecord(company.body.fields).Name);
  return { id: companyId, name };
}

async function writeVisit(
  pat: string,
  id: string | null,
  fields: Json
): Promise<{ status: number; id: string }> {
  if (id) {
    const updated = await airtable(pat, `${VISITS_TABLE}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ fields }),
    });
    return { status: updated.status, id: text(asRecord(updated.body).id) || id };
  }
  const created = await airtable(pat, VISITS_TABLE, {
    method: "POST",
    body: JSON.stringify({ fields }),
  });
  return { status: created.status, id: text(asRecord(created.body).id) };
}

export async function POST(request: NextRequest) {
  const raw = await request.text();
  const secret = process.env.CALCOM_WEBHOOK_SECRET || "";
  if (!secret) {
    return NextResponse.json({ error: "webhook secret is not configured" }, { status: 500 });
  }
  const header = request.headers.get("x-cal-signature-256");
  if (!verifyCalSignature(raw, header, secret)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let body: Json;
  try {
    body = JSON.parse(raw) as Json;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const trigger = text(body.triggerEvent);
  const payload = asRecord(body.payload);
  if (!["BOOKING_CREATED", "BOOKING_RESCHEDULED", "BOOKING_CANCELLED"].includes(trigger)) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const pat = process.env.AIRTABLE_PAT || "";
  if (!pat) {
    return NextResponse.json({ error: "airtable is not configured" }, { status: 500 });
  }

  const uid = text(payload.uid);
  const priorUid = text(payload.rescheduleUid);
  if (!uid && !priorUid) {
    return NextResponse.json({ error: "missing booking uid" }, { status: 400 });
  }

  try {
    if (trigger === "BOOKING_CANCELLED") {
      const id = await findVisit(pat, [uid, priorUid]);
      if (!id) return NextResponse.json({ ok: true, missing: true });
      const result = await writeVisit(pat, id, { Status: STATUS_CANCELLED });
      if (result.status >= 300) {
        return NextResponse.json({ error: "airtable write failed" }, { status: 502 });
      }
      return NextResponse.json({ ok: true, id: result.id });
    }

    const attendee = firstAttendee(payload);
    const company = await companyForEmail(pat, attendee.email);
    const mapped = createdFields(payload, company.name);
    const markers = trigger === "BOOKING_RESCHEDULED" ? [uid, priorUid] : [uid];
    const existing = await findVisit(pat, markers);
    const notes = notesBody(
      uid || priorUid,
      attendee.name,
      attendee.email,
      text(payload.startTime),
      payload,
      priorUid
    );
    const fields: Json = {
      Visit: mapped.visit,
      Date: mapped.date,
      Hours: mapped.hours,
      Notes: notes,
    };
    if (company.id) fields.Client = [company.id];
    if (!existing) fields.Status = STATUS_PLANNED;
    const result = await writeVisit(pat, existing, fields);
    if (result.status >= 300) {
      return NextResponse.json({ error: "airtable write failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, id: result.id });
  } catch {
    return NextResponse.json({ error: "airtable write failed" }, { status: 502 });
  }
}
