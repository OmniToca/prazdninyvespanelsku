# Supabase

Free účet má limit 2 aktivní projekty. Tenhle web potřebuje **vlastní** projekt, ne OmniToca/Sanfolio.

1. Na [supabase.com](https://supabase.com) vytvoř projekt `prazdninyvespanelsku` (případně nejdřív pauzni nepoužívaný projekt, ať je volné místo).
2. SQL Editor → vlož obsah `schema.sql` → Run.
3. Project Settings → API:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` (secret) → `SUPABASE_SERVICE_ROLE_KEY` (jen server, ne do Gitu)
4. Stejné hodnoty dej do `.env.local` a do Netlify (Site settings → Environment variables).

Výchozí texty se nasadí samy při prvním načtení webu, pokud je tabulka `content_fields` prázdná.
