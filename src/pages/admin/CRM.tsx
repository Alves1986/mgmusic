import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Lead = {
  id: string
  name: string
  email: string
  phone: string | null
  service_interest: string | null
  message: string | null
  status: string
  notes: string | null
  created_at: string
}

export default function CRM() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    setLoading(true)
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
    if (data) setLeads(data)
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('leads').update({ status }).eq('id', id)
    fetchLeads()
  }

  const updateNotes = async (id: string, notes: string) => {
    await supabase.from('leads').update({ notes }).eq('id', id)
    fetchLeads()
  }

  const formatWhatsAppLink = (phone: string | null) => {
    if (!phone) return null
    const cleaned = phone.replace(/\D/g, '')
    return `https://wa.me/55${cleaned}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-blue-900/50 text-blue-300 border-blue-500/30'
      case 'Em Negociação': return 'bg-yellow-900/50 text-yellow-300 border-yellow-500/30'
      case 'Fechado': return 'bg-green-900/50 text-green-300 border-green-500/30'
      case 'Perdido': return 'bg-red-900/50 text-red-300 border-red-500/30'
      default: return 'bg-gray-800 text-gray-300 border-gray-600'
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold text-white">CRM | Contatos</h2>
          <p className="text-brand-silver text-sm mt-1">Gerencie os orçamentos e leads recebidos pelo site.</p>
        </div>
        <button onClick={fetchLeads} className="flex items-center gap-2 bg-brand-card border border-brand-border px-4 py-2 rounded-lg text-brand-silver hover:text-brand-gold transition-colors">
          <i className="ph ph-arrows-clockwise"></i> Atualizar
        </button>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-brand-silver">
            <thead className="bg-black/50 text-xs uppercase tracking-wider text-brand-silver font-heading">
              <tr>
                <th className="px-6 py-4 font-bold">Contato</th>
                <th className="px-6 py-4 font-bold">Interesse</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">Carregando contatos...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-brand-silver/50">Nenhum contato recebido ainda.</td>
                </tr>
              ) : leads.map(lead => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-base mb-1">{lead.name}</div>
                    <div className="text-xs text-brand-silver flex flex-col gap-1">
                      <span className="flex items-center gap-1"><i className="ph ph-envelope"></i> {lead.email}</span>
                      {lead.phone && (
                        <span className="flex items-center gap-1"><i className="ph ph-phone"></i> {lead.phone}</span>
                      )}
                      <span className="flex items-center gap-1 mt-1 text-[10px] text-brand-silver/50">
                        <i className="ph ph-calendar"></i> {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-brand-gold mb-1">{lead.service_interest || 'Geral'}</div>
                    {lead.message && (
                      <div className="text-xs line-clamp-2 max-w-[200px]" title={lead.message}>"{lead.message}"</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none appearance-none cursor-pointer ${getStatusColor(lead.status)}`}
                    >
                      <option value="Novo">Novo</option>
                      <option value="Em Negociação">Em Negociação</option>
                      <option value="Fechado">Fechado</option>
                      <option value="Perdido">Perdido</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {lead.phone && (
                        <a 
                          href={formatWhatsAppLink(lead.phone) || '#'} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white hover:bg-green-500 transition-colors shadow-lg shadow-green-900/20 flex-shrink-0"
                          title="Falar no WhatsApp"
                        >
                          <i className="ph ph-whatsapp-logo text-lg"></i>
                        </a>
                      )}
                      <div className="relative flex-1">
                        <textarea 
                          placeholder="Adicionar nota (ex: R$ 5k, etc)..."
                          defaultValue={lead.notes || ''}
                          onBlur={(e) => updateNotes(lead.id, e.target.value)}
                          className="w-full min-w-[150px] h-10 min-h-[40px] text-xs bg-black border border-brand-border rounded p-2 text-white focus:border-brand-gold focus:h-24 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
