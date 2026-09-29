create extension if not exists "pgcrypto";

create type lead_status as enum ('new', 'contacted', 'quotation', 'negotiation', 'booked', 'lost');
create type booking_status as enum ('confirmed', 'in_progress', 'completed', 'cancelled');
create type payment_status as enum ('pending', 'paid', 'overdue', 'refunded');
create type task_status as enum ('pending', 'completed', 'dismissed');

create table public.studios (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  phone text,
  city text,
  business_type text not null default 'photographer',
  created_at timestamptz not null default now()
);

create table public.studio_members (
  studio_id uuid not null references public.studios(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner',
  primary key (studio_id, user_id)
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references public.studios(id) on delete cascade,
  name text not null,
  phone text not null,
  email text,
  event_type text not null,
  event_date date,
  location text,
  budget numeric(12, 2),
  source text not null default 'manual',
  status lead_status not null default 'new',
  follow_up_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references public.studios(id) on delete cascade,
  lead_id uuid unique references public.leads(id) on delete set null,
  name text not null,
  phone text not null,
  email text,
  address text,
  created_at timestamptz not null default now()
);

create table public.packages (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references public.studios(id) on delete cascade,
  name text not null,
  description text,
  price numeric(12, 2) not null,
  inclusions jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references public.studios(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete restrict,
  package_id uuid references public.packages(id) on delete set null,
  title text not null,
  event_date date not null,
  total_amount numeric(12, 2) not null,
  status booking_status not null default 'confirmed',
  notes text,
  created_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  type text not null,
  title text not null,
  event_date date not null,
  start_time time,
  end_time time,
  location text,
  maps_url text,
  notes text,
  created_at timestamptz not null default now()
);

create table public.payment_schedules (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  title text not null,
  amount numeric(12, 2) not null,
  due_date date not null,
  status payment_status not null default 'pending'
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  schedule_id uuid references public.payment_schedules(id) on delete set null,
  amount numeric(12, 2) not null,
  payment_method text not null,
  paid_at timestamptz not null default now(),
  notes text,
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references public.studios(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  title text not null,
  due_at timestamptz,
  priority text not null default 'medium',
  status task_status not null default 'pending',
  type text not null default 'manual',
  created_at timestamptz not null default now()
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references public.studios(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete cascade,
  type text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create function public.create_studio_owner_membership()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.studio_members (studio_id, user_id, role)
  values (new.id, new.owner_id, 'owner');
  return new;
end;
$$;

create trigger on_studio_created
  after insert on public.studios
  for each row execute function public.create_studio_owner_membership();

alter table public.studios enable row level security;
alter table public.studio_members enable row level security;
alter table public.leads enable row level security;
alter table public.clients enable row level security;
alter table public.packages enable row level security;
alter table public.bookings enable row level security;
alter table public.events enable row level security;
alter table public.payment_schedules enable row level security;
alter table public.payments enable row level security;
alter table public.tasks enable row level security;
alter table public.activities enable row level security;

create function public.is_studio_member(target_studio_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.studio_members
    where studio_id = target_studio_id and user_id = auth.uid()
  );
$$;

create policy "members manage studios" on public.studios
  for all using (public.is_studio_member(id)) with check (owner_id = auth.uid());

create policy "members manage membership" on public.studio_members
  for all using (public.is_studio_member(studio_id)) with check (public.is_studio_member(studio_id));

create policy "members manage leads" on public.leads
  for all using (public.is_studio_member(studio_id)) with check (public.is_studio_member(studio_id));

create policy "members manage clients" on public.clients
  for all using (public.is_studio_member(studio_id)) with check (public.is_studio_member(studio_id));

create policy "members manage packages" on public.packages
  for all using (public.is_studio_member(studio_id)) with check (public.is_studio_member(studio_id));

create policy "members manage bookings" on public.bookings
  for all using (public.is_studio_member(studio_id)) with check (public.is_studio_member(studio_id));

create policy "members manage events" on public.events
  for all using ((select public.is_studio_member(b.studio_id) from public.bookings b where b.id = booking_id))
  with check (exists (select 1 from public.bookings b where b.id = booking_id and public.is_studio_member(b.studio_id)));

create policy "members manage payment schedules" on public.payment_schedules
  for all using ((select public.is_studio_member(b.studio_id) from public.bookings b where b.id = booking_id))
  with check (exists (select 1 from public.bookings b where b.id = booking_id and public.is_studio_member(b.studio_id)));

create policy "members manage payments" on public.payments
  for all using ((select public.is_studio_member(b.studio_id) from public.bookings b where b.id = booking_id))
  with check (exists (select 1 from public.bookings b where b.id = booking_id and public.is_studio_member(b.studio_id)));

create policy "members manage tasks" on public.tasks
  for all using (public.is_studio_member(studio_id)) with check (public.is_studio_member(studio_id));

create policy "members manage activities" on public.activities
  for all using (public.is_studio_member(studio_id)) with check (public.is_studio_member(studio_id));
