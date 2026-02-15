-- ============================================
-- Astro Service — Supabase Schema
-- Führe dieses SQL im Supabase SQL Editor aus
-- ============================================

-- 1. Profiles Tabelle
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  is_admin boolean default false,
  created_at timestamp with time zone default now()
);

-- Auto-Erstellung eines Profils bei Registrierung
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Readings Tabelle
create table if not exists public.readings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  status text check (status in ('pending', 'paid', 'processing', 'completed')) default 'pending',
  birth_date date,
  birth_time time,
  birth_place text,
  birth_coords jsonb,
  stripe_session_id text,
  pdf_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint readings_stripe_session_id_unique unique (stripe_session_id)
);

-- 3. Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.readings enable row level security;

-- Profiles: User kann eigenes Profil lesen
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Profiles: User kann eigenes Profil updaten
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Readings: User kann eigene Readings lesen
create policy "Users can view own readings"
  on public.readings for select
  using (auth.uid() = user_id);

-- Readings: User kann eigene Readings updaten (Geburtsdaten)
create policy "Users can update own readings"
  on public.readings for update
  using (auth.uid() = user_id);

-- Readings: Service Role kann alles (Webhook insert)
-- (Supabase service_role bypassed RLS automatisch)

-- Admin: Admins können alle Readings sehen
create policy "Admins can view all readings"
  on public.readings for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.is_admin = true
    )
  );

-- Admin: Admins können alle Readings updaten (PDF-Upload)
create policy "Admins can update all readings"
  on public.readings for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.is_admin = true
    )
  );

-- 4. Orders Tabelle (Guest Checkout — ersetzt readings für neue Bestellungen)
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  product_type text not null check (product_type in ('seelenspiegel', 'seelenkarte', 'seelenkompass')),
  status text check (status in ('pending', 'paid', 'processing', 'completed')) default 'pending',
  stripe_session_id text,
  -- Geburtsdaten Person 1
  birth_name text,
  birth_date date,
  birth_time time,
  birth_place text,
  birth_coords jsonb,
  -- Partner-Daten (nur Seelenkompass)
  partner_birth_name text,
  partner_birth_date date,
  partner_birth_time time,
  partner_birth_place text,
  partner_birth_coords jsonb,
  -- Optionaler Account
  user_id uuid references public.profiles(id) on delete set null,
  marketing_consent boolean default false,
  pdf_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint orders_stripe_session_id_unique unique (stripe_session_id)
);

-- Orders RLS
alter table public.orders enable row level security;

-- Orders: User kann eigene Orders lesen
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- Orders: User kann eigene Orders updaten
create policy "Users can update own orders"
  on public.orders for update
  using (auth.uid() = user_id);

-- Orders: Admins können alle Orders sehen
create policy "Admins can view all orders"
  on public.orders for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.is_admin = true
    )
  );

-- Orders: Admins können alle Orders updaten
create policy "Admins can update all orders"
  on public.orders for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.is_admin = true
    )
  );

-- 5. marketing_consent zu Profiles hinzufügen
alter table public.profiles add column if not exists marketing_consent boolean default false;

-- 6. Storage Bucket für PDFs
insert into storage.buckets (id, name, public)
values ('readings', 'readings', false)
on conflict do nothing;

-- Storage Policy: User kann eigene PDFs lesen
create policy "Users can download own PDFs"
  on storage.objects for select
  using (
    bucket_id = 'readings'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Storage Policy: Admins können PDFs hochladen
create policy "Admins can upload PDFs"
  on storage.objects for insert
  with check (
    bucket_id = 'readings'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.is_admin = true
    )
  );
