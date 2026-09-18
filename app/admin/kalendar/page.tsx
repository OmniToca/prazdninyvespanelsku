import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { listOccupancy } from "@/lib/occupancy";
import { actionAddBlock, actionDeleteBlock } from "../actions";

export default async function AdminCalendarPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const rows = await listOccupancy();
  return (
    <div>
      <h1 className="font-serif text-3xl text-sea">Kalendář obsazenosti</h1>
      <form action={actionAddBlock} className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
        <label className="text-sm">
          Od
          <input type="date" name="start" required className="mt-1 w-full rounded-xl border border-sea/15 px-3 py-2" />
        </label>
        <label className="text-sm">
          Do
          <input type="date" name="end" required className="mt-1 w-full rounded-xl border border-sea/15 px-3 py-2" />
        </label>
        <label className="sm:col-span-2 text-sm">
          Poznámka (jen interně)
          <input name="note" className="mt-1 w-full rounded-xl border border-sea/15 px-3 py-2" />
        </label>
        <button className="rounded-full bg-sea px-4 py-2 text-sand sm:col-span-2">Přidat blokaci</button>
      </form>
      <ul className="mt-10 space-y-3">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
            <div>
              <p>
                {row.start} → {row.end}{" "}
                <span className="text-muted">
                  {row.type === "blocked" ? "blokace" : row.type === "hold" ? "držení" : "obsazeno"}
                </span>
              </p>
              {row.note && <p className="text-sm text-muted">{row.note}</p>}
            </div>
            <form action={actionDeleteBlock}>
              <input type="hidden" name="id" value={row.id} />
              <button className="text-coral">Smazat</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
