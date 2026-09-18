-- Spusť v Supabase: SQL Editor → New query → Run.
-- Service role klíč obchází RLS; anon z prohlížeče k tabulkám přístup nemá.

create table if not exists content_fields (
  key text not null,
  locale text not null,
  value text not null,
  primary key (key, locale)
);

create table if not exists occupancy (
  id bigint generated always as identity primary key,
  start_date date not null,
  end_date date not null,
  type text not null check (type in ('hold', 'booked', 'blocked')),
  inquiry_id bigint,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  guests integer not null,
  start_date date not null,
  end_date date not null,
  transfer boolean not null default false,
  message text,
  locale text not null default 'cs',
  status text not null default 'new',
  nights integer not null,
  stay_cents integer not null,
  cleaning_cents integer not null,
  transfer_cents integer not null,
  discount_cents integer not null default 0,
  total_cents integer not null,
  deposit_cents integer not null,
  remainder_cents integer not null,
  stripe_deposit_id text,
  stripe_remainder_id text,
  note text,
  created_at timestamptz not null default now()
);

alter table occupancy
  add constraint occupancy_inquiry_fk
  foreign key (inquiry_id) references inquiries (id) on delete set null;

alter table content_fields enable row level security;
alter table occupancy enable row level security;
alter table inquiries enable row level security;
