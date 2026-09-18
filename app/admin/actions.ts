"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginAdmin, logoutAdmin, requireAdmin } from "@/lib/auth";
import { saveContent } from "@/lib/content";
import { getInquiry, updateInquiry } from "@/lib/inquiries";
import { notifyOwner, sendMail } from "@/lib/mail";
import {
  addOccupancy,
  clearOccupancyForInquiry,
  deleteOccupancy,
  rangeFree,
  setOccupancyTypeForInquiry,
} from "@/lib/occupancy";
import { getStripe } from "@/lib/stripe";
import { formatEur } from "@/lib/pricing";

export async function actionLogin(formData: FormData): Promise<void> {
  const ok = await loginAdmin(String(formData.get("password") || ""));
  if (!ok) redirect("/admin/login?error=1");
  redirect("/admin");
}

export async function actionLogout() {
  await logoutAdmin();
  redirect("/admin/login");
}

export async function actionSaveTexts(formData: FormData) {
  await requireAdmin();
  const locale = String(formData.get("locale") || "cs");
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "locale" || key === "page") continue;
    values[key] = String(value);
  }
  await saveContent(locale, values);
  revalidatePath("/", "layout");
  revalidatePath("/admin/texty");
}

export async function actionAddBlock(formData: FormData): Promise<void> {
  await requireAdmin();
  const start = String(formData.get("start") || "");
  const end = String(formData.get("end") || "");
  const note = String(formData.get("note") || "");
  if (!start || !end || start >= end) {
    redirect("/admin/kalendar?error=interval");
  }
  if (!(await rangeFree(start, end))) {
    redirect("/admin/kalendar?error=overlap");
  }
  await addOccupancy({ start, end, type: "blocked", note });
  revalidatePath("/admin");
  revalidatePath("/rezervace");
}

export async function actionDeleteBlock(formData: FormData) {
  await requireAdmin();
  await deleteOccupancy(Number(formData.get("id")));
  revalidatePath("/admin");
  revalidatePath("/rezervace");
}

export async function actionCancelInquiry(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  await updateInquiry(id, { status: "cancelled" });
  await clearOccupancyForInquiry(id);
  revalidatePath("/admin");
  revalidatePath("/rezervace");
}

async function originFromEnv() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export async function actionSendDeposit(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const inquiry = await getInquiry(id);
  if (!inquiry) {
    redirect("/admin?error=missing");
  }
  if (!(await rangeFree(inquiry.start, inquiry.end, inquiry.id))) {
    redirect("/admin?error=occupied");
  }

  await clearOccupancyForInquiry(id);
  await addOccupancy({
    start: inquiry.start,
    end: inquiry.end,
    type: "hold",
    inquiryId: id,
    note: inquiry.name,
  });

  const origin = await originFromEnv();
  const stripe = getStripe();
  if (stripe) {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: inquiry.email,
      success_url: `${origin}/${inquiry.locale === "cs" ? "" : inquiry.locale + "/"}platba?result=ok`,
      cancel_url: `${origin}/${inquiry.locale === "cs" ? "" : inquiry.locale + "/"}platba?result=cancel`,
      metadata: { inquiryId: String(id), kind: "deposit" },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: inquiry.deposit_cents,
            product_data: {
              name: `Záloha 50 % · ${inquiry.start} – ${inquiry.end}`,
            },
          },
        },
      ],
      expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    });
    await updateInquiry(id, { status: "awaiting_deposit", stripe_deposit_id: session.id });
    await sendMail({
      to: inquiry.email,
      subject: "Záloha · Residence Santa Pola",
      text: `Dobrý den ${inquiry.name},\n\ntermín ${inquiry.start} – ${inquiry.end} vám držíme. Záloha ${formatEur(inquiry.deposit_cents)}:\n${session.url}\n\nResidence Santa Pola`,
    });
    await notifyOwner(`Odeslána záloha #${id}`, session.url || "");
  } else {
    await updateInquiry(id, { status: "awaiting_deposit" });
    await sendMail({
      to: inquiry.email,
      subject: "Záloha · Residence Santa Pola",
      text: `Dobrý den ${inquiry.name},\n\ntermín ${inquiry.start} – ${inquiry.end} vám držíme. Záloha ${formatEur(inquiry.deposit_cents)}. (Stripe není nastavený — v adminu lze platbu simulovat.)`,
    });
  }
  revalidatePath("/admin");
  revalidatePath("/rezervace");
}

export async function actionSendRemainder(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const inquiry = await getInquiry(id);
  if (!inquiry) {
    redirect("/admin?error=missing");
  }
  const origin = await originFromEnv();
  const stripe = getStripe();
  if (stripe) {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: inquiry.email,
      success_url: `${origin}/${inquiry.locale === "cs" ? "" : inquiry.locale + "/"}platba?result=ok`,
      cancel_url: `${origin}/${inquiry.locale === "cs" ? "" : inquiry.locale + "/"}platba?result=cancel`,
      metadata: { inquiryId: String(id), kind: "remainder" },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: inquiry.remainder_cents,
            product_data: { name: `Doplatek · ${inquiry.start} – ${inquiry.end}` },
          },
        },
      ],
    });
    await updateInquiry(id, { status: "awaiting_remainder", stripe_remainder_id: session.id });
    await sendMail({
      to: inquiry.email,
      subject: "Doplatek · Residence Santa Pola",
      text: `Dobrý den ${inquiry.name},\n\ndoplatek ${formatEur(inquiry.remainder_cents)} za ${inquiry.start} – ${inquiry.end}:\n${session.url}`,
    });
  } else {
    await updateInquiry(id, { status: "awaiting_remainder" });
  }
  revalidatePath("/admin");
}

export async function actionMarkPaid(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const kind = String(formData.get("kind") || "deposit");
  if (kind === "deposit") {
    await updateInquiry(id, { status: "deposit_paid" });
    await setOccupancyTypeForInquiry(id, "booked");
  } else {
    await updateInquiry(id, { status: "paid" });
  }
  revalidatePath("/admin");
  revalidatePath("/rezervace");
}
