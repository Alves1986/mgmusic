import { SectionTitle } from './section-title'

let db: typeof import('@/lib/db').db | null = null;
let siteSettingsTable: typeof import('@/lib/db/schema').siteSettings | null = null;

try {
  const dbModule = require('@/lib/db');
  const schemaModule = require('@/lib/db/schema');
  db = dbModule.db;
  siteSettingsTable = schemaModule.siteSettings;
} catch {}

export async function Stats() {
  const defaultStats = [
    { value: '100M+', label: 'OUVINTES IMPACTADOS' },
    { value: '300+', label: 'PROJETOS REALIZADOS' },
    { value: '50+', label: 'ARTISTAS DE REFERÊNCIA' },
  ]

  let stats = defaultStats;

  try {
    if (db && siteSettingsTable) {
      const settings = await db.select().from(siteSettingsTable)
      if (settings.length > 0) {
        const settingsMap = settings.reduce((acc, curr) => {
          acc[curr.key] = curr.value || ''
          return acc
        }, {} as Record<string, string>)

        stats = [
          { value: settingsMap['stat_listeners'] || '100M+', label: 'OUVINTES IMPACTADOS' },
          { value: settingsMap['stat_projects'] || '300+', label: 'PROJETOS REALIZADOS' },
          { value: settingsMap['stat_artists'] || '50+', label: 'ARTISTAS DE REFERÊNCIA' },
        ]
      }
    }
  } catch {
    // DB not available, use defaults
  }

  return (
    <section
      id="produtora"
      className="relative z-10 border-b border-brand-border/30 bg-background py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle className="mb-12">PROVA SOCIAL</SectionTitle>
        <div className="grid grid-cols-1 divide-y divide-brand-border/50 text-center md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-4 transition-transform duration-300 hover:scale-105 ${
                i > 0 ? 'pt-8 md:pt-4' : ''
              }`}
            >
              <h3 className="mb-2 font-heading text-5xl font-bold text-gold drop-shadow-md md:text-6xl">
                {stat.value}
              </h3>
              <p className="font-sans text-sm font-semibold uppercase tracking-wider text-silver">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
