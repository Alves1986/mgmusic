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
    <section id="produtora" className="py-16 bg-black relative z-10 border-b border-brand-border/30">
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-heading text-sm text-brand-silver tracking-[0.3em] uppercase section-title-line mb-12">PROVA SOCIAL</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-brand-border/50">
                <div className="p-4 transform hover:scale-105 transition-transform duration-300">
                    <h3 className="font-heading text-5xl md:text-6xl font-bold text-brand-gold mb-2 drop-shadow-md">{stats.listeners}</h3>
                    <p className="font-body text-brand-silver uppercase tracking-wider text-sm font-semibold">OUVINTES IMPACTADOS</p>
                </div>
                <div className="p-4 pt-8 md:pt-4 transform hover:scale-105 transition-transform duration-300">
                    <h3 className="font-heading text-5xl md:text-6xl font-bold text-brand-gold mb-2 drop-shadow-md">{stats.projects}</h3>
                    <p className="font-body text-brand-silver uppercase tracking-wider text-sm font-semibold">PROJETOS REALIZADOS</p>
                </div>
                <div className="p-4 pt-8 md:pt-4 transform hover:scale-105 transition-transform duration-300">
                    <h3 className="font-heading text-5xl md:text-6xl font-bold text-brand-gold mb-2 drop-shadow-md">{stats.artists}</h3>
                    <p className="font-body text-brand-silver uppercase tracking-wider text-sm font-semibold">ARTISTAS DE REFERÊNCIA</p>
                </div>
            </div>
        </div>
    </section>
  )
}
