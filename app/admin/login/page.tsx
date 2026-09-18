import Image from "next/image";
import { actionLogin } from "../actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <Image src="/logo/logo.png" alt="" width={101} height={112} className="mb-6 h-16 w-auto" />
      <h1 className="font-serif text-3xl text-sea">Administrace</h1>
      <p className="mt-2 text-sm text-muted">Jen pro majitele apartmánu.</p>
      {error && <p className="mt-4 text-sm text-coral">Špatné heslo.</p>}
      <form action={actionLogin} className="mt-8 space-y-4">
        <label className="block text-sm">
          Heslo
          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full rounded-xl border border-sea/15 bg-white px-3 py-2"
          />
        </label>
        <button className="w-full rounded-full bg-sea py-3 text-sand">Vstoupit</button>
      </form>
    </div>
  );
}
