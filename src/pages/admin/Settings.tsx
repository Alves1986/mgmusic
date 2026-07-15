import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SettingsAdmin() {
  const [stats, setStats] = useState({ listeners: '', projects: '', artists: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {}
        data.forEach(s => map[s.key] = s.value)
        setStats({
          listeners: map['stat_listeners'] || '',
          projects: map['stat_projects'] || '',
          artists: map['stat_artists'] || '',
        })
      }
    })
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('site_settings').upsert([
      { key: 'stat_listeners', value: stats.listeners },
      { key: 'stat_projects', value: stats.projects },
      { key: 'stat_artists', value: stats.artists },
    ])
    setLoading(false)
    if (error) alert('Erro ao salvar as configurações: ' + error.message)
    else alert('Configurações salvas com sucesso!')
  }

  return (
    <div className="max-w-xl">
      <h2 className="mb-8 font-heading text-3xl font-bold text-[#FFD700]">Configurações da Página</h2>
      <form onSubmit={handleSave} className="space-y-6 rounded-xl border border-[#333333] bg-[#121212] p-8">
        <div>
          <label className="mb-2 block text-sm font-bold text-[#C0C0C0]">Ouvintes Impactados</label>
          <input value={stats.listeners} onChange={e => setStats({...stats, listeners: e.target.value})} className="w-full rounded bg-[#1a1a1a] p-3 text-white border border-[#333333] focus:border-[#FFD700] focus:outline-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-[#C0C0C0]">Projetos Realizados</label>
          <input value={stats.projects} onChange={e => setStats({...stats, projects: e.target.value})} className="w-full rounded bg-[#1a1a1a] p-3 text-white border border-[#333333] focus:border-[#FFD700] focus:outline-none" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-[#C0C0C0]">Artistas de Referência</label>
          <input value={stats.artists} onChange={e => setStats({...stats, artists: e.target.value})} className="w-full rounded bg-[#1a1a1a] p-3 text-white border border-[#333333] focus:border-[#FFD700] focus:outline-none" />
        </div>
        <button type="submit" disabled={loading} className="w-full rounded bg-gradient-to-r from-[#B8860B] to-[#FFD700] p-4 font-bold uppercase text-black disabled:opacity-50 hover:brightness-110">
          Salvar Configurações
        </button>
      </form>
    </div>
  )
}
