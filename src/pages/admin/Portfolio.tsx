import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type PortfolioItem = {
  id: string
  title: string
  artist: string | null
  genre_tag: string | null
  video_url: string | null
  thumbnail_url: string | null
}

export default function PortfolioAdmin() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre_tag: '',
    video_url: '',
    thumbnail_url: ''
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: false })
    if (data) setItems(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      await supabase.from('portfolio_items').delete().eq('id', id)
      fetchItems()
    }
  }

  const openNewModal = () => {
    setEditingItem(null)
    setFormData({ title: '', artist: '', genre_tag: '', video_url: '', thumbnail_url: '' })
    setIsModalOpen(true)
  }

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      artist: item.artist || '',
      genre_tag: item.genre_tag || '',
      video_url: item.video_url || '',
      thumbnail_url: item.thumbnail_url || ''
    })
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingItem) {
      await supabase.from('portfolio_items').update({
        title: formData.title,
        artist: formData.artist,
        genre_tag: formData.genre_tag,
        video_url: formData.video_url,
        thumbnail_url: formData.thumbnail_url
      }).eq('id', editingItem.id)
    } else {
      await supabase.from('portfolio_items').insert([
        {
          title: formData.title,
          artist: formData.artist,
          genre_tag: formData.genre_tag,
          video_url: formData.video_url,
          thumbnail_url: formData.thumbnail_url
        }
      ])
    }
    
    setIsModalOpen(false)
    fetchItems()
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-white">Portfólio</h2>
          <p className="text-brand-silver text-sm mt-1">Gerencie os vídeos e trabalhos exibidos no site.</p>
        </div>
        <button onClick={openNewModal} className="flex items-center gap-2 bg-brand-gold text-black px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(184,134,11,0.3)]">
          <i className="ph ph-plus-circle text-xl"></i> Novo Trabalho
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-card shadow-2xl">
        <table className="w-full text-left text-sm text-brand-silver">
          <thead className="bg-black/50 text-xs uppercase tracking-wider text-brand-silver font-heading">
            <tr>
              <th className="px-6 py-4 font-bold">Thumbnail</th>
              <th className="px-6 py-4 font-bold">Título</th>
              <th className="px-6 py-4 font-bold">Artista</th>
              <th className="px-6 py-4 font-bold">Tag</th>
              <th className="px-6 py-4 font-bold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">Carregando portfólio...</td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-brand-silver/50">Nenhum item no portfólio.</td>
              </tr>
            ) : items.map(item => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  {item.thumbnail_url ? (
                    <img src={item.thumbnail_url} alt={item.title} className="w-16 h-10 object-cover rounded border border-brand-border" />
                  ) : (
                    <div className="w-16 h-10 bg-black rounded border border-brand-border flex items-center justify-center">
                      <i className="ph ph-video text-brand-silver/50"></i>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-bold text-white">{item.title}</td>
                <td className="px-6 py-4">{item.artist || '-'}</td>
                <td className="px-6 py-4">
                  {item.genre_tag && (
                    <span className="rounded border border-brand-gold/30 bg-black px-2 py-1 text-xs font-bold uppercase tracking-widest text-brand-gold">
                      {item.genre_tag}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => openEditModal(item)} className="text-blue-400 hover:text-blue-300 transition-colors" title="Editar">
                      <i className="ph ph-pencil-simple text-xl"></i>
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400 transition-colors" title="Excluir">
                      <i className="ph ph-trash text-xl"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-brand-card border border-brand-border rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-brand-border flex items-center justify-between bg-black/50">
              <h3 className="text-xl font-bold font-heading text-brand-gold">
                {editingItem ? 'Editar Trabalho' : 'Novo Trabalho'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-silver hover:text-white transition-colors">
                <i className="ph ph-x text-2xl"></i>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-silver mb-2">Título do Trabalho *</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" placeholder="Ex: Live Session" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-silver mb-2">Artista</label>
                  <input value={formData.artist} onChange={e => setFormData({...formData, artist: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" placeholder="Nome da banda ou artista" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-silver mb-2">Tag / Gênero</label>
                  <input value={formData.genre_tag} onChange={e => setFormData({...formData, genre_tag: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" placeholder="Ex: ROCK, GOSPEL, ACÚSTICO" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-silver mb-2">URL do Vídeo (YouTube)</label>
                  <input value={formData.video_url} onChange={e => setFormData({...formData, video_url: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" placeholder="https://youtube.com/watch?v=..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-silver mb-2">URL da Imagem (Thumbnail)</label>
                <input value={formData.thumbnail_url} onChange={e => setFormData({...formData, thumbnail_url: e.target.value})} className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:outline-none" placeholder="https://link-da-imagem.com/imagem.jpg" />
                <p className="text-xs text-brand-silver/50 mt-1">Dica: Você pode copiar o endereço da imagem de um vídeo do YouTube ou fazer upload no Supabase.</p>
              </div>
              
              <div className="pt-6 flex justify-end gap-3 border-t border-brand-border mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded font-bold text-brand-silver hover:bg-white/5 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="px-6 py-2 rounded bg-gold-gradient text-black font-bold hover:brightness-110 transition-all">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
