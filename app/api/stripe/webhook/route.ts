import { NextResponse } from "next/server";
import { getInquiry, updateInquiry } from "@/lib/inquiries";
import { sendMail, notifyOwner } from "@/lib/mail";
import { setOccupancyTypeForInquiry } from "@/lib/occupancy";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "stripe-disabled" }, { status: 400 });
  }
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "no-signature" }, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const inquiryId = Number(session.metadata?.inquiryId);
    const kind = session.metadata?.kind;
    if (!inquiryId) return NextResponse.json({ received: true });
    const inquiry = await getInquiry(inquiryId);
    if (!inquiry) return NextResponse.json({ received: true });

    if (kind === "deposit") {
      await updateInquiry(inquiryId, { status: "deposit_paid" });
      await setOccupancyTypeForInquiry(inquiryId, "booked");
      await sendMail({
        to: inquiry.email,
        subject: "Záloha přijata · Residence Santa Pola",
        text: `Dobrý den ${inquiry.name},\n\nzáloha za pobyt ${inquiry.start} – ${inquiry.end} je zaplacená. Termín je rezervovaný.\n\nResidence Santa Pola`,
      });
      await notifyOwner(
        `Záloha zaplacena #${inquiry.id}`,
        `${inquiry.name} zaplatil zálohu za ${inquiry.start}–${inquiry.end}.`,
      );
    }
    if (kind === "remainder") {
      await updateInquiry(inquiryId, { status: "paid" });
      await sendMail({
        to: inquiry.email,
        subject: "Pobyt doplacen · Residence Santa Pola",
        text: `Dobrý den ${inquiry.name},\n\ndoplatek za pobyt ${inquiry.start} – ${inquiry.end} je zaplacený. Těšíme se na vás.\n\nResidence Santa Pola`,
      });
      await notifyOwner(`Doplatek zaplacen #${inquiry.id}`, `${inquiry.name} doplatil pobyt.`);
    }
  }

  return NextResponse.json({ received: true });
}
