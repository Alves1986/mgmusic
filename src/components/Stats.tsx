import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Stats() {
  const [stats, setStats] = useState({
    listeners: '100M+',
    projects: '300+',
    artists: '50+',
  })

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {}
        data.forEach(s => (map[s.key] = s.value))
        setStats({
          listeners: map['stat_listeners'] || '100M+',
          projects: map['stat_projects'] || '300+',
          artists: map['stat_artists'] || '50+',
        })
      }
    })
  }, [])

  return (
    <section className="border-y border-[#333333] bg-[#121212] py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between space-y-12 md:flex-row md:space-y-0 px-8">
        <div className="text-center">
          <h2 className="font-heading text-5xl font-bold text-[#FFD700] mb-2">{stats.listeners}</h2>
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-[#C0C0C0]">Ouvintes Impactados</p>
        </div>
        <div className="text-center">
          <h2 className="font-heading text-5xl font-bold text-[#FFD700] mb-2">{stats.projects}</h2>
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-[#C0C0C0]">Projetos Realizados</p>
        </div>
        <div className="text-center">
          <h2 className="font-heading text-5xl font-bold text-[#FFD700] mb-2">{stats.artists}</h2>
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-[#C0C0C0]">Artistas de Referência</p>
        </div>
      </div>
    </section>
  )
}
