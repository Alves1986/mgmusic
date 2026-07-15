/**
 * Seed script — popula o Supabase com dados iniciais reais do MG Music Studio.
 * Executar: npx tsx scripts/seed.ts
 */
import 'dotenv/config'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { hash } from 'bcryptjs'
import {
  portfolioItems,
  leads,
  siteSettings,
  adminUsers,
} from '../lib/db/schema'

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) throw new Error('DATABASE_URL não configurado no .env.local')

const client = postgres(DATABASE_URL)
const db = drizzle(client)

async function seed() {
  console.log('🌱 Iniciando seed...')

  // ─── Admin user ────────────────────────────────────────────────────────────
  console.log('  → Criando usuário admin...')
  const passwordHash = await hash('Deusamou2026@', 12)
  await db
    .insert(adminUsers)
    .values({ email: 'admin@mgmusic.com.br', passwordHash })
    .onConflictDoNothing()

  // ─── Site settings ─────────────────────────────────────────────────────────
  console.log('  → Criando configurações do site...')
  await db
    .insert(siteSettings)
    .values([
      { key: 'stat_listeners', value: '100M+' },
      { key: 'stat_projects', value: '300+' },
      { key: 'stat_artists', value: '50+' },
    ])
    .onConflictDoNothing()

  // ─── Portfolio items ────────────────────────────────────────────────────────
  console.log('  → Criando itens do portfólio...')
  await db
    .insert(portfolioItems)
    .values([
      {
        title: 'Meu Barquinho',
        artist: 'Giselli Cristina feat. Moisés Cleyton',
        genreTag: 'GOSPEL',
        description: 'Single/clipe com +102 milhões de views no YouTube.',
        videoUrl: 'https://www.youtube.com/watch?v=TW7j_xGVFKM',
        thumbnailUrl: null,
        isFeatured: true,
        displayOrder: 1,
      },
      {
        title: 'Recomeçar',
        artist: 'Giselli Cristina',
        genreTag: 'GOSPEL',
        description: 'Produção musical completa.',
        videoUrl: null,
        thumbnailUrl: null,
        isFeatured: true,
        displayOrder: 2,
      },
      {
        title: 'Que Se Abram Os Céus',
        artist: 'Hudson Almeida',
        genreTag: 'GOSPEL',
        description: 'Produção musical e direção de vídeo por Gesiel Jasson.',
        videoUrl: null,
        thumbnailUrl: null,
        isFeatured: true,
        displayOrder: 3,
      },
      {
        title: 'Dono do Meu Coração',
        artist: 'Hudson Almeida',
        genreTag: 'GOSPEL',
        description: 'Produção musical.',
        videoUrl: null,
        thumbnailUrl: null,
        isFeatured: false,
        displayOrder: 4,
      },
      {
        title: 'Rude Cruz',
        artist: 'Cantor Garcez',
        genreTag: 'GOSPEL',
        description: 'Direção do clipe oficial.',
        videoUrl: null,
        thumbnailUrl: null,
        isFeatured: false,
        displayOrder: 5,
      },
      {
        title: 'Novos Talentos — Rafaelli & Nicolas',
        artist: 'Rafaelli Cristina & Nicolas Henrique',
        genreTag: 'GOSPEL',
        description: 'Jovens artistas emergentes do portfólio familiar.',
        videoUrl: null,
        thumbnailUrl: null,
        isFeatured: false,
        displayOrder: 6,
      },
      {
        title: 'Colaborações Diversas',
        artist: 'Clayton Queiroz, André & Felipe, Paloma Gomes',
        genreTag: 'GOSPEL',
        description: 'Produções e colaborações diversas.',
        videoUrl: null,
        thumbnailUrl: null,
        isFeatured: false,
        displayOrder: 7,
      },
    ])
    .onConflictDoNothing()

  console.log('✅ Seed concluído com sucesso!')
  console.log('')
  console.log('  Credenciais de acesso ao admin:')
  console.log('  Email:  admin@mgmusic.com.br')
  console.log('  Senha:  Deusamou2026@')
  console.log('  URL:    https://mgmusic.vercel.app/admin/login')

  await client.end()
}

seed().catch((err) => {
  console.error('❌ Erro no seed:', err)
  process.exit(1)
})
