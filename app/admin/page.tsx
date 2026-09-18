import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { listInquiries } from "@/lib/inquiries";
import { formatEur } from "@/lib/pricing";
import { stripeEnabled } from "@/lib/stripe";
import {
  actionCancelInquiry,
  actionMarkPaid,
  actionSendDeposit,
  actionSendRemainder,
} from "./actions";

const labels: Record<string, string> = {
  new: "Nová",
  awaiting_deposit: "Čeká na zálohu",
  deposit_paid: "Záloha zaplacena",
  awaiting_remainder: "Čeká na doplatek",
  paid: "Zaplaceno",
  cancelled: "Zrušeno",
};

export default async function AdminHome() {
  if (!(await isAdmin())) redirect("/admin/login");
  const inquiries = await listInquiries();
  const stripeOn = stripeEnabled();

  return (
    <div>
      <h1 className="font-serif text-3xl text-sea">Poptávky</h1>
      {!stripeOn && (
        <p className="mt-3 rounded-xl bg-sun/20 px-4 py-2 text-sm">
          Stripe klíče nejsou v .env. Zálohu lze odeslat jako e-mail a platbu označit ručně.
        </p>
      )}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="py-2">#</th>
              <th>Host</th>
              <th>Termín</th>
              <th>Stav</th>
              <th>Částka</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((row) => (
              <tr key={row.id} className="border-t border-sea/10 align-top">
                <td className="py-3">{row.id}</td>
                <td>
                  <div>{row.name}</div>
                  <div className="text-muted">{row.email}</div>
                  <div className="text-muted">{row.guests} os. {row.transfer ? "· transfer" : ""}</div>
                  {row.message && <p className="mt-1 max-w-xs text-muted">{row.message}</p>}
                </td>
                <td>
                  {row.start} → {row.end}
                  <div className="text-muted">{row.nights} nocí</div>
                </td>
                <td>{labels[row.status] ?? row.status}</td>
                <td>
                  {formatEur(row.total_cents)}
                  <div className="text-muted">záloha {formatEur(row.deposit_cents)}</div>
                </td>
                <td className="space-y-2 py-3">
                  {row.status === "new" && (
                    <form action={actionSendDeposit}>
                      <input type="hidden" name="id" value={row.id} />
                      <button className="rounded-full bg-sea px-3 py-1 text-sand">Poslat zálohu</button>
                    </form>
                  )}
                  {row.status === "awaiting_deposit" && (
                    <form action={actionMarkPaid}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="kind" value="deposit" />
                      <button className="rounded-full bg-sand-deep px-3 py-1">Označit zálohu</button>
                    </form>
                  )}
                  {row.status === "deposit_paid" && (
                    <form action={actionSendRemainder}>
                      <input type="hidden" name="id" value={row.id} />
                      <button className="rounded-full bg-sea px-3 py-1 text-sand">Poslat doplatek</button>
                    </form>
                  )}
                  {row.status === "awaiting_remainder" && (
                    <form action={actionMarkPaid}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="kind" value="remainder" />
                      <button className="rounded-full bg-sand-deep px-3 py-1">Označit doplatek</button>
                    </form>
                  )}
                  {row.status !== "cancelled" && row.status !== "paid" && (
                    <form action={actionCancelInquiry}>
                      <input type="hidden" name="id" value={row.id} />
                      <button className="text-coral">Zrušit</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 && <p className="mt-8 text-muted">Zatím žádné poptávky.</p>}
      </div>
    </div>
  );
}
