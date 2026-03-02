import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, businessName, source } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase not configured — lead not saved");
      return NextResponse.json({ ok: true });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("prospects").insert({
      email,
      business_name: businessName || null,
      source: source || "website",
      org_id: "bag",
    });

    if (error) {
      console.error("Supabase lead insert error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
