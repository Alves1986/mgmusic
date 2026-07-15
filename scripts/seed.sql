-- ─────────────────────────────────────────────────────────────────────────────
-- SEED — MG Music Studio
-- Cole este SQL no Supabase SQL Editor e execute.
-- URL: https://supabase.com/dashboard/project/mfxebzzrpidozxjjwavn/sql
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── Admin user ───────────────────────────────────────────────────────────────
-- Email: admin@mgmusic.com.br  /  Senha: Deusamou2026@
INSERT INTO admin_users (email, password_hash)
VALUES (
  'admin@mgmusic.com.br',
  '$2b$12$bG0Fyd2/bACPGQXcpPrLg.Nv8CtdirV4E9p/X0TjFYZN.Td21mc36'
)
ON CONFLICT (email) DO NOTHING;

-- ─── Site settings ────────────────────────────────────────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('stat_listeners', '100M+'),
  ('stat_projects',  '300+'),
  ('stat_artists',   '50+')
ON CONFLICT (key) DO NOTHING;

-- ─── Portfolio items ──────────────────────────────────────────────────────────
INSERT INTO portfolio_items (title, artist, genre_tag, description, video_url, thumbnail_url, is_featured, display_order)
VALUES
  (
    'Meu Barquinho',
    'Giselli Cristina feat. Moisés Cleyton',
    'GOSPEL',
    '+102 milhões de views no YouTube.',
    'https://www.youtube.com/watch?v=TW7j_xGVFKM',
    NULL,
    true,
    1
  ),
  (
    'Recomeçar',
    'Giselli Cristina',
    'GOSPEL',
    'Produção musical completa.',
    NULL,
    NULL,
    true,
    2
  ),
  (
    'Que Se Abram Os Céus',
    'Hudson Almeida',
    'GOSPEL',
    'Produção musical e direção de vídeo por Gesiel Jasson.',
    NULL,
    NULL,
    true,
    3
  ),
  (
    'Dono do Meu Coração',
    'Hudson Almeida',
    'GOSPEL',
    'Produção musical.',
    NULL,
    NULL,
    false,
    4
  ),
  (
    'Rude Cruz',
    'Cantor Garcez',
    'GOSPEL',
    'Direção do clipe oficial.',
    NULL,
    NULL,
    false,
    5
  ),
  (
    'Rafaelli & Nicolas — Novos Talentos',
    'Rafaelli Cristina & Nicolas Henrique',
    'GOSPEL',
    'Jovens artistas emergentes do portfólio familiar.',
    NULL,
    NULL,
    false,
    6
  ),
  (
    'Colaborações Diversas',
    'Clayton Queiroz, André & Felipe, Paloma Gomes',
    'GOSPEL',
    'Produções e colaborações diversas.',
    NULL,
    NULL,
    false,
    7
  )
ON CONFLICT DO NOTHING;
