/**
 * Checks for the website intake route (src/app/api/intake/route.ts).
 * Imports the real route and stubs every outside call, so it never reaches
 * Airtable, Resend or Supabase:
 *   - Supabase points at a throwaway local server that accepts the insert.
 *   - Airtable answers 500, to force the failed-CRM path.
 *   - Resend is recorded, never sent.
 *   - Any other host throws.
 * Run: node scripts/intake-route-test.mjs
 */
import assert from "assert";
import http from "http";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const jiti = require("jiti")(import.meta.url, {
  alias: { "@": path.join(root, "src") },
  interopDefault: true,
});

// Fake values only. Never load .env files here.
for (const k of ["TURNSTILE_SECRET_KEY", "NEXT_PUBLIC_TURNSTILE_SITE_KEY", "BAG_NOTIFICATION_EMAIL"]) {
  delete process.env[k];
}
process.env.AIRTABLE_PAT = "test-not-a-token";
process.env.RESEND_API_KEY = "test-not-a-key";
process.env.SUPABASE_ANON_KEY = "test-anon";

const supabase = http.createServer((req, res) => {
  req.resume();
  req.on("end", () => {
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end("[]");
  });
});
await new Promise((r) => supabase.listen(0, "127.0.0.1", r));
process.env.SUPABASE_URL = `http://127.0.0.1:${supabase.address().port}`;

const realFetch = globalThis.fetch;
const emails = [];
let airtableCalls = 0;
globalThis.fetch = async (input, init = {}) => {
  const url = new URL(typeof input === "string" ? input : input.url);
  if (url.hostname === "127.0.0.1") return realFetch(input, init);
  if (url.hostname === "api.airtable.com") {
    airtableCalls += 1;
    return new Response('{"error":"test outage"}', { status: 500 });
  }
  if (url.hostname === "api.resend.com") {
    emails.push(JSON.parse(init.body));
    return new Response('{"id":"test"}', { status: 200 });
  }
  throw new Error(`Test blocked an outside call to ${url.hostname}`);
};

const { POST } = jiti(path.join(root, "src/app/api/intake/route.ts"));
const { NextRequest } = require("next/server");

function post(ip, body) {
  return POST(
    new NextRequest("http://localhost/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify(body),
    }),
  );
}

// (a) Rate limit: honeypot-filled posts touch no network, so a burst is free.
const bot = { bag_hp: "filled" };
for (let i = 1; i <= 10; i++) {
  const res = await post("203.0.113.7", bot);
  assert.strictEqual(res.status, 200, `request ${i} should pass the limit`);
}
const blocked = await post("203.0.113.7", bot);
assert.strictEqual(blocked.status, 429, "11th request from one client is rejected");
assert.strictEqual((await post("203.0.113.8", bot)).status, 200, "another client is not affected");
console.log("PASS (a) burst from one client: 10 accepted, 11th got 429; second client still 200");

// (b) Airtable fails: visitor sees a non-success, Phil gets a flagged email,
// the prospect gets no confirmation.
const lead = {
  contact_name: "Test Person",
  email: "test-person@example.invalid",
  company_name: "Example Test Co",
  annual_revenue_range: "under_1m",
  num_entities: "1",
  ai_question: "Test only.",
  bag_hp: "",
  elapsed_ms: 5000,
};
const res = await post("198.51.100.20", lead);
const data = await res.json();
assert.strictEqual(res.status, 502, "failed CRM save is not a 2xx");
assert.strictEqual(data.crmSaved, false);
assert.match(data.error, /phil@bluegrassadvisorygroup\.com/);
assert.ok(airtableCalls >= 1, "route tried Airtable");
assert.strictEqual(emails.length, 1, "only Phil's notification is sent");
assert.deepStrictEqual(emails[0].to, ["phil@bluegrassadvisorygroup.com"]);
assert.match(emails[0].subject, /^NOT in Airtable: /);
assert.match(emails[0].html, /NOT in Airtable\. This lead did not save to the BAG CRM/);
console.log(`PASS (b) Airtable failure: HTTP ${res.status}, alert subject "${emails[0].subject}", no prospect email`);

globalThis.fetch = realFetch;
supabase.close();
