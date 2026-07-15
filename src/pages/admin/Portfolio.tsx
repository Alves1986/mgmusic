import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function PortfolioAdmin() {
  const [items, setItems] = useState<any[]>([])
  
  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const { data } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: false })
    if (data) setItems(data)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      await supabase.from('portfolio_items').delete().eq('id', id)
      fetchItems()
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-heading text-3xl font-bold text-[#FFD700]">Gerenciar Portfólio</h2>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#333333] bg-[#121212]">
        <table className="w-full text-left text-sm text-[#C0C0C0]">
          <thead className="bg-[#1a1a1a] text-xs uppercase tracking-wider text-[#C0C0C0]">
            <tr>
              <th className="px-6 py-4">Título</th>
              <th className="px-6 py-4">Artista</th>
              <th className="px-6 py-4">Tag</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-[#333333]/50 transition-colors hover:bg-[#1a1a1a]/50">
                <td className="px-6 py-4 font-bold text-white">{item.title}</td>
                <td className="px-6 py-4">{item.artist || '-'}</td>
                <td className="px-6 py-4">
                  {item.genre_tag && (
                    <span className="rounded border border-[#FFD700]/30 bg-black px-2 py-1 text-xs font-bold uppercase tracking-widest text-[#FFD700]">
                      {item.genre_tag}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">Excluir</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-[#C0C0C0]/50">Nenhum item no portfólio.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
