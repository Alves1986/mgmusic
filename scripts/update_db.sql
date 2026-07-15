-- Create leads table for CRM
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service_interest text,
  message text,
  status text DEFAULT 'Novo', -- Novo, Em Negociação, Fechado, Perdido
  notes text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS for leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leads are viewable by authenticated users" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Leads can be updated by authenticated users" ON public.leads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Leads can be deleted by authenticated users" ON public.leads FOR DELETE TO authenticated USING (true);
CREATE POLICY "Leads can be created by anyone" ON public.leads FOR INSERT TO public WITH CHECK (true);

-- Update portfolio RLS to allow INSERT/UPDATE by authenticated users
DROP POLICY IF EXISTS "Portfolio can be inserted by authenticated users" ON public.portfolio_items;
CREATE POLICY "Portfolio can be inserted by authenticated users" ON public.portfolio_items FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Portfolio can be updated by authenticated users" ON public.portfolio_items;
CREATE POLICY "Portfolio can be updated by authenticated users" ON public.portfolio_items FOR UPDATE TO authenticated USING (true);
