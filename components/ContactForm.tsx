"use client";

import { useState } from "react";
import { t } from "@/lib/copy";

export function ContactForm({ content }: { content: Record<string, string> }) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        message: form.get("message"),
        honey: form.get("honey"),
      }),
    });
    setStatus(res.ok ? "ok" : "error");
  }

  if (status === "ok") {
    return <p className="font-serif text-2xl text-sea">{t(content, "contact.success")}</p>;
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block text-sm">
        {t(content, "booking.name")}
        <input
          required
          name="name"
          className="mt-1 w-full rounded-md border border-sea/15 bg-white px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        {t(content, "booking.email")}
        <input
          required
          type="email"
          name="email"
          className="mt-1 w-full rounded-md border border-sea/15 bg-white px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        {t(content, "booking.message")}
        <textarea
          required
          name="message"
          rows={5}
          className="mt-1 w-full rounded-md border border-sea/15 bg-white px-3 py-2"
        />
      </label>
      <input name="honey" className="hidden" tabIndex={-1} autoComplete="off" />
      {status === "error" && <p className="text-sm text-coral">{t(content, "booking.error")}</p>}
      <button className="rounded-md bg-sea px-6 py-3 text-sand">{t(content, "contact.submit")}</button>
    </form>
  );
}
