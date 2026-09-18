import { NextResponse } from "next/server";
import { quoteStay } from "@/lib/pricing";

export async function POST(request: Request) {
  const body = await request.json();
  const start = String(body.start || "");
  const end = String(body.end || "");
  const transfer = Boolean(body.transfer);
  if (!start || !end) {
    return NextResponse.json({ ok: false, error: "range" }, { status: 400 });
  }
  return NextResponse.json(await quoteStay(start, end, transfer));
}
