import { NextResponse } from "next/server";
import { notifyOwner, sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  const body = await request.json();
  if (body.honey) return NextResponse.json({ ok: true });
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  await notifyOwner(`Zpráva od ${name}`, `${name} <${email}>\n\n${message}`);
  await sendMail({
    to: email,
    subject: "Residence Santa Pola",
    text: `Dobrý den ${name},\n\nděkujeme za zprávu. Ozveme se.\n\nResidence Santa Pola`,
  });
  return NextResponse.json({ ok: true });
}
