import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/inquiries";
import { notifyOwner, sendMail } from "@/lib/mail";
import { rangeFree } from "@/lib/occupancy";
import { quoteStay } from "@/lib/pricing";

export async function POST(request: Request) {
  const body = await request.json();
  if (body.honey) return NextResponse.json({ ok: true });

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const start = String(body.start || "");
  const end = String(body.end || "");
  const guests = Number(body.guests || 0);
  const transfer = Boolean(body.transfer);
  const message = String(body.message || "").trim();
  const locale = String(body.locale || "cs");

  if (!name || !email || !start || !end || guests < 1 || guests > 8) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  if (!(await rangeFree(start, end))) {
    return NextResponse.json({ error: "occupied" }, { status: 409 });
  }
  const quote = await quoteStay(start, end, transfer);
  if (!quote.ok) {
    return NextResponse.json({ error: quote.error, minNights: quote.minNights }, { status: 400 });
  }

  const id = await createInquiry({
    name,
    email,
    guests,
    start,
    end,
    transfer,
    message,
    locale,
    nights: quote.nights,
    stayCents: quote.stayCents,
    cleaningCents: quote.cleaningCents,
    transferCents: quote.transferCents,
    discountCents: quote.discountCents,
    totalCents: quote.totalCents,
    depositCents: quote.depositCents,
    remainderCents: quote.remainderCents,
  });

  const text = `Nová poptávka #${id}
${name} <${email}>
${start} → ${end}
osob: ${guests}
transfer: ${transfer ? "ano" : "ne"}
celkem: ${(quote.totalCents / 100).toFixed(0)} EUR
záloha: ${(quote.depositCents / 100).toFixed(0)} EUR

${message}`;

  await notifyOwner(`Poptávka #${id} ${start}–${end}`, text);
  await sendMail({
    to: email,
    subject: "Residence Santa Pola",
    text: `Dobrý den ${name},\n\ndostali jsme vaši poptávku na ${start} – ${end}. Ozveme se e-mailem.\n\nResidence Santa Pola`,
  });

  return NextResponse.json({ ok: true, id });
}
