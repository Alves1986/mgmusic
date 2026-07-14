export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import { siteSettings } from '@/lib/db/schema'
import { updateSettings } from './actions'

export default async function SettingsAdmin() {
  let settingsMap: Record<string, string> = {}

  try {
    const settings = await db.select().from(siteSettings)
    settingsMap = settings.reduce<Record<string, string>>((acc, curr) => {
      acc[curr.key] = curr.value ?? ''
      return acc
    }, {})
  } catch {
    // DB not reachable
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 font-heading text-3xl font-bold text-silver-light">
        Configurações do Site
      </h1>

      <div className="rounded-xl border border-brand-border/30 bg-[#121212] p-8">
        <h2 className="mb-6 font-heading text-xl text-gold">
          Textos da Home (Estatísticas)
        </h2>
        <form action={updateSettings} className="space-y-6">
          {[
            { name: 'stat_listeners', label: 'Ouvintes Impactados', defaultValue: '100M+' },
            { name: 'stat_projects', label: 'Projetos Realizados', defaultValue: '300+' },
            { name: 'stat_artists', label: 'Artistas de Referência', defaultValue: '50+' },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-semibold text-silver"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                defaultValue={settingsMap[field.name] ?? field.defaultValue}
                className="w-full rounded-md border border-brand-border/30 bg-[#1a1a1a] p-3 text-silver-light transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-[#B8860B] to-[#FFD700] px-8 py-3 font-heading font-bold text-black transition-all hover:brightness-110"
          >
            Salvar Configurações
          </button>
        </form>
      </div>
    </div>
  )
}
