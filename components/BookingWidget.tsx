"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { cs, de, enUS, es, fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { t } from "@/lib/copy";
import type { Quote } from "@/lib/pricing";

const dateLocales = { cs, en: enUS, es, de, fr };

function iso(d: Date) {
  return format(d, "yyyy-MM-dd");
}

function Month({
  month,
  occupied,
  from,
  to,
  onPick,
  locale,
}: {
  month: Date;
  occupied: Set<string>;
  from: string;
  to: string;
  onPick: (day: string) => void;
  locale: Locale;
}) {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const days = eachDayOfInterval({ start, end });
  const pad = (start.getDay() + 6) % 7;
  const today = startOfDay(new Date());
  const labels = eachDayOfInterval({
    start: new Date(2026, 0, 5),
    end: new Date(2026, 0, 11),
  });

  return (
    <div>
      <p className="mb-3 font-serif text-xl text-sea">
        {format(month, "LLLL yyyy", { locale: dateLocales[locale] })}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wide text-muted">
        {labels.map((d) => (
          <span key={d.toISOString()}>{format(d, "EEEEE", { locale: dateLocales[locale] })}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: pad }).map((_, i) => (
          <span key={`p${i}`} />
        ))}
        {days.map((day) => {
          const key = iso(day);
          const busy = occupied.has(key);
          const past = isBefore(day, today);
          const selected =
            (from && to && key >= from && key < to) ||
            (from && !to && key === from) ||
            (from && to && key === to);
          const disabled = busy || past;
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => onPick(key)}
              className={`aspect-square rounded-full text-sm ${
                disabled
                  ? "cursor-not-allowed bg-coral/20 text-coral line-through"
                  : selected
                    ? "bg-sea text-sand"
                    : isSameDay(day, today)
                      ? "ring-1 ring-sun"
                      : "hover:bg-sand-deep"
              }`}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BookingWidget({
  content,
  locale,
  occupied,
}: {
  content: Record<string, string>;
  locale: Locale;
  occupied: string[];
}) {
  const occupiedSet = useMemo(() => new Set(occupied), [occupied]);
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [guests, setGuests] = useState(4);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [transfer, setTransfer] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function refreshQuote(nextFrom = from, nextTo = to, nextTransfer = transfer) {
    if (!nextFrom || !nextTo) {
      setQuote(null);
      return;
    }
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start: nextFrom, end: nextTo, transfer: nextTransfer }),
    });
    const data = (await res.json()) as Quote;
    setQuote(data);
  }

  function pick(day: string) {
    if (!from || (from && to)) {
      setFrom(day);
      setTo("");
      setQuote(null);
      return;
    }
    if (day <= from) {
      setFrom(day);
      setTo("");
      setQuote(null);
      return;
    }
    setTo(day);
    void refreshQuote(from, day, transfer);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        start: from,
        end: to,
        guests,
        name,
        email,
        message,
        transfer,
        locale,
        honey: "",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setStatus("error");
      setError(
        data.error === "occupied"
          ? t(content, "booking.occupied")
          : data.error === "min-nights"
            ? t(content, "booking.minNightsError", { n: data.minNights ?? 3 })
            : t(content, "booking.error"),
      );
      return;
    }
    setStatus("ok");
  }

  const eur = (cents: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
      cents / 100,
    );

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-sm bg-white p-5 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <button type="button" onClick={() => setCursor((c) => addMonths(c, -1))} aria-label="Prev">
            <ChevronLeft />
          </button>
          <button type="button" onClick={() => setCursor((c) => addMonths(c, 1))} aria-label="Next">
            <ChevronRight />
          </button>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Month month={cursor} occupied={occupiedSet} from={from} to={to} onPick={pick} locale={locale} />
          <Month
            month={addMonths(cursor, 1)}
            occupied={occupiedSet}
            from={from}
            to={to}
            onPick={pick}
            locale={locale}
          />
        </div>
        <div className="mt-6 flex gap-4 text-sm text-muted">
          <span className="flex items-center gap-2">
            <i className="inline-block size-3 rounded-full bg-sand-deep" /> {t(content, "booking.legendFree")}
          </span>
          <span className="flex items-center gap-2">
            <i className="inline-block size-3 rounded-full bg-coral/40" /> {t(content, "booking.legendBusy")}
          </span>
        </div>
      </div>

      <form onSubmit={submit} className="rounded-sm bg-white p-5 sm:p-8">
        {status === "ok" ? (
          <p className="font-serif text-2xl text-sea">{t(content, "booking.success")}</p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                {t(content, "booking.from")}
                <input
                  required
                  type="date"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    if (to) void refreshQuote(e.target.value, to, transfer);
                  }}
                  className="mt-1 w-full rounded-md border border-sea/15 bg-sand px-3 py-2"
                />
              </label>
              <label className="text-sm">
                {t(content, "booking.to")}
                <input
                  required
                  type="date"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    if (from) void refreshQuote(from, e.target.value, transfer);
                  }}
                  className="mt-1 w-full rounded-md border border-sea/15 bg-sand px-3 py-2"
                />
              </label>
            </div>
            <label className="mt-4 block text-sm">
              {t(content, "booking.guests")}
              <input
                type="number"
                min={1}
                max={8}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-sea/15 bg-sand px-3 py-2"
              />
            </label>
            <label className="mt-4 block text-sm">
              {t(content, "booking.name")}
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-sea/15 bg-sand px-3 py-2"
              />
            </label>
            <label className="mt-4 block text-sm">
              {t(content, "booking.email")}
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-sea/15 bg-sand px-3 py-2"
              />
            </label>
            <label className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={transfer}
                onChange={(e) => {
                  setTransfer(e.target.checked);
                  if (from && to) void refreshQuote(from, to, e.target.checked);
                }}
              />
              {t(content, "booking.transfer")}
            </label>
            <label className="mt-4 block text-sm">
              {t(content, "booking.message")}
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 w-full rounded-md border border-sea/15 bg-sand px-3 py-2"
              />
            </label>
            <input type="text" name="honey" className="hidden" tabIndex={-1} autoComplete="off" />

            {quote && quote.ok && (
              <div className="mt-5 space-y-1 rounded-md bg-sand p-4 text-sm">
                <p>
                  {quote.nights} {t(content, "booking.nights")} · {t(content, "booking.stay")}{" "}
                  {eur(quote.stayCents)}
                </p>
                <p>
                  {t(content, "pricing.cleaningLabel")} {eur(quote.cleaningCents)}
                </p>
                {quote.transferCents > 0 && (
                  <p>
                    {t(content, "pricing.extrasTitle")}: {eur(quote.transferCents)}
                  </p>
                )}
                <p className="pt-2 font-medium">
                  {t(content, "booking.total")} {eur(quote.totalCents)}
                </p>
                <p className="text-muted">
                  {t(content, "booking.deposit")} {eur(quote.depositCents)}
                </p>
              </div>
            )}
            {quote && !quote.ok && quote.error === "min-nights" && (
              <p className="mt-3 text-sm text-coral">
                {t(content, "booking.minNightsError", { n: quote.minNights })}
              </p>
            )}
            {error && <p className="mt-3 text-sm text-coral">{error}</p>}

            <button
              disabled={status === "sending"}
              className="mt-6 w-full rounded-md bg-sea py-3 text-sand disabled:opacity-60"
            >
              {t(content, "booking.submit")}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
