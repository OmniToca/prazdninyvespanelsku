import { isAdmin } from "@/lib/auth";
import { actionLogout } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand text-ink">
      <AdminChrome>{children}</AdminChrome>
    </div>
  );
}

async function AdminChrome({ children }: { children: React.ReactNode }) {
  const ok = await isAdmin();
  if (!ok) return children;
  return (
    <>
      <header className="border-b border-sea/10 bg-white/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <nav className="flex gap-4 text-sm">
            <a href="/admin">Poptávky</a>
            <a href="/admin/kalendar">Kalendář</a>
            <a href="/admin/texty">Texty</a>
            <a href="/" className="text-muted">
              Web
            </a>
          </nav>
          <form action={actionLogout}>
            <button className="text-sm text-muted">Odhlásit</button>
          </form>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </>
  );
}
