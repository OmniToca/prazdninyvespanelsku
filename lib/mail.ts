import { social } from "@/content/social";

type Mail = { to: string; subject: string; text: string };

export async function sendMail({ to, subject, text }: Mail) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || `Residence Santa Pola <${social.email}>`;
  if (!key) {
    console.info("[mail:dev]", { to, subject, text });
    return { ok: true, dev: true as const };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error("[mail]", res.status, body);
    return { ok: false };
  }
  return { ok: true };
}

export async function notifyOwner(subject: string, text: string) {
  return sendMail({ to: social.email, subject, text });
}
