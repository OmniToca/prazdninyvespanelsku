import { eachDayOfInterval, format, parseISO } from "date-fns";
import { getContent } from "./content";

export type Quote = {
  nights: number;
  minNights: number;
  stayCents: number;
  cleaningCents: number;
  transferCents: number;
  discountCents: number;
  totalCents: number;
  depositCents: number;
  remainderCents: number;
  ok: boolean;
  error?: "min-nights" | "range";
};

function num(content: Record<string, string>, key: string) {
  return Number(content[key] || 0);
}

export async function getPricing() {
  const content = await getContent("cs");
  const rate: number[] = [];
  const min: number[] = [];
  for (let m = 1; m <= 12; m++) {
    rate[m] = num(content, `rates.${m}`);
    min[m] = num(content, `rates.min.${m}`);
  }
  return {
    rate,
    min,
    cleaning: num(content, "rates.cleaning"),
    transfer: num(content, "rates.transfer"),
    longStayDiscount: num(content, "rates.longStayDiscount"),
  };
}

export async function quoteStay(start: string, end: string, transfer: boolean): Promise<Quote> {
  const pricing = await getPricing();
  const from = parseISO(start);
  const to = parseISO(end);
  if (!(from < to)) {
    return {
      nights: 0,
      minNights: 0,
      stayCents: 0,
      cleaningCents: 0,
      transferCents: 0,
      discountCents: 0,
      totalCents: 0,
      depositCents: 0,
      remainderCents: 0,
      ok: false,
      error: "range",
    };
  }

  const nightsDates = eachDayOfInterval({ start: from, end: new Date(to.getTime() - 86400000) });
  let stay = 0;
  let minNights = 1;
  for (const day of nightsDates) {
    const month = day.getMonth() + 1;
    stay += pricing.rate[month] ?? 0;
    minNights = Math.max(minNights, pricing.min[month] ?? 1);
  }
  const nights = nightsDates.length;
  const cleaning = pricing.cleaning;
  const transferFee = transfer ? pricing.transfer : 0;
  let discount = 0;
  if (nights >= 30 && pricing.longStayDiscount > 0) {
    discount = Math.round((stay * pricing.longStayDiscount) / 100);
  }
  const total = stay + cleaning + transferFee - discount;
  const stayCents = Math.round(stay * 100);
  const cleaningCents = Math.round(cleaning * 100);
  const transferCents = Math.round(transferFee * 100);
  const discountCents = Math.round(discount * 100);
  const totalCents = Math.round(total * 100);
  const depositCents = Math.round(totalCents / 2);
  const remainderCents = totalCents - depositCents;

  if (nights < minNights) {
    return {
      nights,
      minNights,
      stayCents,
      cleaningCents,
      transferCents,
      discountCents,
      totalCents,
      depositCents,
      remainderCents,
      ok: false,
      error: "min-nights",
    };
  }

  return {
    nights,
    minNights,
    stayCents,
    cleaningCents,
    transferCents,
    discountCents,
    totalCents,
    depositCents,
    remainderCents,
    ok: true,
  };
}

export function formatEur(cents: number, locale = "cs") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function isoDay(date: Date) {
  return format(date, "yyyy-MM-dd");
}
