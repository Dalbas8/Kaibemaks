# Kontode seadistamine (Supabase)

Kontod võimaldavad hoida andmeid pilves ja kasutada äppi mitmes seadmes. Iga kasutaja (ka sõbrad) loob oma konto
ja näeb ainult enda andmeid. Supabase'i tasuta pakett on selleks täiesti piisav.

Seadistus tuleb teha **üks kord** (umbes 5 minutit).

## 1. Loo Supabase'i projekt
1. Mine aadressile <https://supabase.com> ja logi sisse (nt GitHubi kontoga).
2. Vajuta **New project**, pane nimeks näiteks `rahaeesmark`, vali parool ja piirkond (nt *Central EU (Frankfurt)*).
3. Oota, kuni projekt valmib (1–2 minutit).

## 2. Loo andmetabel
Ava vasakult **SQL Editor → New query**, kleebi sinna allolev kood ja vajuta **Run**:

```sql
create table if not exists public.user_data (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;

create policy "Kasutaja näeb oma andmeid"   on public.user_data for select using (auth.uid() = user_id);
create policy "Kasutaja lisab oma andmed"   on public.user_data for insert with check (auth.uid() = user_id);
create policy "Kasutaja muudab oma andmeid" on public.user_data for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Kasutaja kustutab oma andmed" on public.user_data for delete using (auth.uid() = user_id);
```

## 3. Seadista sisselogimine
Ava **Authentication → Sign In / Providers → Email**:
- **Enable Email provider** peab olema sees.
- **Confirm email**: kui see on sees, peab uus kasutaja enne sisselogimist e-posti kinnitama. Kui tahad, et konto
  töötaks kohe, lülita see välja.

Ava **Authentication → URL Configuration** ja pane **Site URL** väärtuseks oma äpi aadress:
`https://dalbas8.github.io/Kaibemaks/rahaeesmark/`

## 4. Pane andmed faili `config.js`
Ava **Project Settings → API** (või **Data API**) ja kopeeri:
- **Project URL**
- **anon public** võti

Ava GitHubis fail `rahaeesmark/config.js`, vajuta pliiatsi-ikooni ja täida väljad:

```js
window.RAHA_CONFIG = {
  supabaseUrl: "https://SINU-PROJEKT.supabase.co",
  supabaseAnonKey: "eyJhbGciOi..."
};
```

Vajuta **Commit changes**. Mõne minuti pärast saavad kõik äpi kasutajad **Seaded → Konto** alt kontot luua.

> **Turvalisus:** `anon public` võti on mõeldud avalikuks kasutamiseks. Andmeid kaitsevad 2. sammus loodud reeglid
> (Row Level Security): iga kasutaja saab lugeda ja muuta ainult oma rida. **Ära pane siia kunagi `service_role` võtit.**

## Mida sünkroonitakse
Kõik äpi andmed: rahaline eesmärk, sissetulekud, väljaminekud, ülesanded, tuleviku eesmärgid, investeeringud,
portfelli ajalugu ja seaded. Finnhubi API võtit **ei** sünkroonita, see jääb ainult seadmesse.
