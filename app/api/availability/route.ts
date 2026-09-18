import { NextResponse } from "next/server";
import { occupiedDays } from "@/lib/occupancy";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ occupied: await occupiedDays() });
}
