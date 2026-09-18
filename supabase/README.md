# Supabase

1. Vytvoř projekt na [supabase.com](https://supabase.com).
2. SQL Editor → vlož obsah `schema.sql` → Run.
3. Project Settings → API:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` (secret) → `SUPABASE_SERVICE_ROLE_KEY` (jen server, ne do Gitu)
4. Stejné hodnoty dej do `.env.local` a do Netlify (Site settings → Environment variables).

Výchozí texty se nasadí samy při prvním načtení webu, pokud je tabulka `content_fields` prázdná.
