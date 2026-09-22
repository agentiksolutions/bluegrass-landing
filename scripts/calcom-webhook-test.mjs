/**
 * Standalone checks for the Cal.com webhook route.
 * The signature and mapping functions are duplicated here on purpose.
 * This file does not import the Next.js route.
 */
import { createHmac, timingSafeEqual } from "crypto";
import assert from "assert";

function verifyCalSignature(rawBody, header, secret) {
  if (!header || !secret) return false;
  const given = header.trim().replace(/^sha256=/i, "");
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function etDate(iso) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(iso));
  const pick = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

function hoursBetween(startIso, endIso) {
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  if (!Number.isFinite(ms) || ms <= 0) return 0;
  return Math.round((ms / 3600000) * 100) / 100;
}

function eventTitle(payload) {
  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  if (title) return title;
  return typeof payload.type === "string" && payload.type.trim() ? payload.type.trim() : "booking";
}

function firstAttendee(payload) {
  const list = Array.isArray(payload.attendees) ? payload.attendees : [];
  for (const item of list) {
    const email = item && typeof item.email === "string" ? item.email.trim() : "";
    if (email) {
      const name = item && typeof item.name === "string" ? item.name.trim() : "";
      return { name: name || email, email };
    }
  }
  return { name: "", email: "" };
}

function visitName(attendeeName, title, companyName) {
  return `${companyName || attendeeName || "Guest"} - ${title}`;
}

function createdFields(payload, companyName) {
  const attendee = firstAttendee(payload);
  const title = eventTitle(payload);
  const start = payload.startTime;
  const end = payload.endTime;
  return {
    visit: visitName(attendee.name, title, companyName),
    date: etDate(start),
    status: "Planned",
    hours: hoursBetween(start, end),
    email: attendee.email,
    notesStart: `Cal.com ${payload.uid}`,
  };
}

const secret = "test-secret";
const raw = JSON.stringify({ triggerEvent: "BOOKING_CREATED", payload: { uid: "abc" } });
const good = createHmac("sha256", secret).update(raw).digest("hex");
assert.strictEqual(verifyCalSignature(raw, good, secret), true, "valid signature passes");
assert.strictEqual(verifyCalSignature(raw + " ", good, secret), false, "tampered body fails");
assert.strictEqual(verifyCalSignature(raw, null, secret), false, "missing header fails");

const payload = {
  uid: "booking-uid-1",
  title: "Intro call",
  type: "intro",
  startTime: "2026-01-15T04:30:00.000Z",
  endTime: "2026-01-15T05:30:00.000Z",
  attendees: [{ name: "Ada Guest", email: "ada@example.com" }],
  organizer: { name: "Phil", email: "phil@example.com" },
  additionalNotes: "Bring the deck",
};
const mapped = createdFields(payload, "");
assert.strictEqual(mapped.visit, "Ada Guest - Intro call");
assert.strictEqual(mapped.date, "2026-01-14", "UTC evening is the previous ET date");
assert.strictEqual(mapped.status, "Planned");
assert.strictEqual(mapped.hours, 1);
assert.strictEqual(mapped.email, "ada@example.com");
assert.strictEqual(mapped.notesStart, "Cal.com booking-uid-1");
assert.strictEqual(createdFields(payload, "Acme Co").visit, "Acme Co - Intro call");

console.log("calcom webhook test OK");
console.log("et date", mapped.date);
console.log("hours", mapped.hours);
console.log("visit", mapped.visit);
