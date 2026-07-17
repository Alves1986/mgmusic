import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SettingsAdmin() {
  const [stats, setStats] = useState({ 
    listeners: '', 
    projects: '', 
    artists: '',
    heroTitle: '',
    heroSubtitle: '',
    whatsapp: '',
    email: '',
    instagram: '',
    facebook: '',
    youtube: '',
    mapEmbedUrl: '',
    mapDirectUrl: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'geral' | 'contato' | 'redes' | 'prova'>('geral')

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {}
        data.forEach(s => map[s.key] = s.value)
        setStats({
          listeners: map['stat_listeners'] || '',
          projects: map['stat_projects'] || '',
          artists: map['stat_artists'] || '',
          heroTitle: map['hero_title'] || 'Transformando Ideias em Obras-Primas',
          heroSubtitle: map['hero_subtitle'] || 'Gravadora e produtora musical especializada em elevar o nível da sua música.',
          whatsapp: map['contact_whatsapp'] || '11999999999',
          email: map['contact_email'] || 'contato@mgmusic.com',
          instagram: map['social_instagram'] || 'https://instagram.com',
          facebook: map['social_facebook'] || 'https://facebook.com',
          youtube: map['social_youtube'] || 'https://youtube.com',
          mapEmbedUrl: map['map_embed_url'] || 'https://maps.google.com/maps?q=Rua%20dos%20Curi%C3%B3s,%2025,%20S%C3%A3o%20Jo%C3%A3o,%20Tel%C3%AAmaco%20Borba%20-%20PR&t=&z=16&ie=UTF8&iwloc=&output=embed',
          mapDirectUrl: map['map_direct_url'] || 'https://maps.google.com/?q=Rua+dos+Curiós,+25,+São+João,+Telêmaco+Borba+-+PR'
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
      { key: 'hero_title', value: stats.heroTitle },
      { key: 'hero_subtitle', value: stats.heroSubtitle },
      { key: 'contact_whatsapp', value: stats.whatsapp },
      { key: 'contact_email', value: stats.email },
      { key: 'social_instagram', value: stats.instagram },
      { key: 'social_facebook', value: stats.facebook },
      { key: 'social_youtube', value: stats.youtube },
      { key: 'map_embed_url', value: stats.mapEmbedUrl },
      { key: 'map_direct_url', value: stats.mapDirectUrl },
    ])
    setLoading(false)
    if (error) alert('Erro ao salvar as configurações: ' + error.message)
    else alert('Configurações salvas com sucesso!')
  }

  const tabClass = (tab: string) => `px-4 py-2 font-bold font-heading rounded-t-lg transition-colors ${activeTab === tab ? 'bg-brand-card text-brand-gold border-t border-x border-brand-border' : 'text-brand-silver hover:text-white border-b border-transparent hover:border-brand-border'}`

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="font-heading text-3xl font-bold text-white">Configurações Gerais</h2>
        <p className="text-brand-silver text-sm mt-1">Gerencie os textos, contatos e estatísticas do site principal.</p>
      </div>
      
      <div className="flex border-b border-brand-border mb-6">
        <button onClick={() => setActiveTab('geral')} className={tabClass('geral')}>Geral (Textos)</button>
        <button onClick={() => setActiveTab('contato')} className={tabClass('contato')}>Contatos</button>
        <button onClick={() => setActiveTab('redes')} className={tabClass('redes')}>Redes Sociais</button>
        <button onClick={() => setActiveTab('prova')} className={tabClass('prova')}>Prova Social</button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 rounded-xl rounded-tl-none border border-brand-border bg-brand-card p-8 shadow-2xl relative -mt-6 z-10">
        
        {activeTab === 'geral' && (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">Título Principal (Hero)</label>
              <input value={stats.heroTitle} onChange={e => setStats({...stats, heroTitle: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">Subtítulo (Hero)</label>
              <textarea value={stats.heroSubtitle} onChange={e => setStats({...stats, heroSubtitle: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none h-24" />
            </div>
          </div>
        )}

        {activeTab === 'contato' && (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">Número do WhatsApp (apenas números)</label>
              <input value={stats.whatsapp} onChange={e => setStats({...stats, whatsapp: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" placeholder="Ex: 11999999999" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">E-mail de Contato</label>
              <input type="email" value={stats.email} onChange={e => setStats({...stats, email: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">URL de Incorporação do Google Maps (Iframe)</label>
              <textarea value={stats.mapEmbedUrl} onChange={e => setStats({...stats, mapEmbedUrl: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none h-24" placeholder="<iframe src='...'> ou apenas o link de incorporação" />
              <p className="text-xs text-brand-silver/50 mt-1">Dica: No Google Maps, clique em Compartilhar &gt; Incorporar um mapa e copie o link dentro do <b>src="..."</b>.</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">Link Direto do Google Maps (Botão Abrir)</label>
              <input value={stats.mapDirectUrl} onChange={e => setStats({...stats, mapDirectUrl: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" placeholder="Ex: https://maps.app.goo.gl/..." />
              <p className="text-xs text-brand-silver/50 mt-1">Dica: Link curto do Google Maps para abrir no aplicativo (Celular).</p>
            </div>
          </div>
        )}

        {activeTab === 'redes' && (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">Link do Instagram</label>
              <input value={stats.instagram} onChange={e => setStats({...stats, instagram: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">Link do Facebook</label>
              <input value={stats.facebook} onChange={e => setStats({...stats, facebook: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">Link do YouTube</label>
              <input value={stats.youtube} onChange={e => setStats({...stats, youtube: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" />
            </div>
          </div>
        )}

        {activeTab === 'prova' && (
          <div className="space-y-4 animate-fade-in-up">
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">Ouvintes Impactados</label>
              <input value={stats.listeners} onChange={e => setStats({...stats, listeners: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">Projetos Realizados</label>
              <input value={stats.projects} onChange={e => setStats({...stats, projects: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-silver">Artistas de Referência</label>
              <input value={stats.artists} onChange={e => setStats({...stats, artists: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" />
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-brand-border mt-8 flex justify-end">
          <button type="submit" disabled={loading} className="px-8 py-3 rounded bg-gold-gradient text-black font-bold font-heading tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(184,134,11,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] disabled:opacity-50 flex items-center gap-2">
            <i className="ph ph-floppy-disk text-xl"></i> Salvar Todas
          </button>
        </div>
      </form>
    </div>
  )
}
