export type OccupancyRow = {
  id: number;
  start: string;
  end: string;
  type: "hold" | "booked" | "blocked";
  inquiry_id: number | null;
  note: string | null;
};

export type InquiryRow = {
  id: number;
  name: string;
  email: string;
  guests: number;
  start: string;
  end: string;
  transfer: boolean;
  message: string | null;
  locale: string;
  status: string;
  nights: number;
  stay_cents: number;
  cleaning_cents: number;
  transfer_cents: number;
  discount_cents: number;
  total_cents: number;
  deposit_cents: number;
  remainder_cents: number;
  stripe_deposit_id: string | null;
  stripe_remainder_id: string | null;
  note: string | null;
  created_at: string;
};
