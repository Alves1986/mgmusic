-- Habilitar RLS em todas as tabelas públicas
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- LEADS: Qualquer um pode inserir (via formulário), apenas autenticados podem ver/gerenciar
CREATE POLICY "Permitir inserção anônima em leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin tem acesso total em leads" ON public.leads FOR ALL TO authenticated USING (true);

-- PORTFÓLIO: Leitura pública, apenas autenticados gerenciam
CREATE POLICY "Leitura pública portfolio" ON public.portfolio_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin tem acesso total portfolio" ON public.portfolio_items FOR ALL TO authenticated USING (true);

-- CONFIGURAÇÕES: Leitura pública, apenas autenticados gerenciam
CREATE POLICY "Leitura pública settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin tem acesso total settings" ON public.site_settings FOR ALL TO authenticated USING (true);
