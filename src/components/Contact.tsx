import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const { error } = await supabase.from('leads').insert([form])
    
    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    }
  }

  return (
    <section id="contact" className="bg-[#121212] py-32 px-8 border-t border-[#333333]">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-12 font-heading text-5xl font-bold text-[#E0E0E0] text-center tracking-tight">
          VAMOS <span className="text-[#FFD700]">TRABALHAR JUNTOS</span>
        </h2>
        {status === 'success' ? (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-8 text-center">
            <h3 className="mb-2 font-heading text-2xl font-bold text-green-400">Mensagem Enviada!</h3>
            <p className="text-[#C0C0C0]">Entraremos em contato em breve.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm font-bold text-[#FFD700] hover:underline"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block font-heading text-xs uppercase tracking-widest text-[#C0C0C0]">Nome Completo</label>
              <input 
                type="text" 
                required 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                className="w-full rounded-md bg-[#1a1a1a] p-4 text-white border border-[#333333] transition-all focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]" 
              />
            </div>
            <div>
              <label className="mb-2 block font-heading text-xs uppercase tracking-widest text-[#C0C0C0]">Email</label>
              <input 
                type="email" 
                required 
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})} 
                className="w-full rounded-md bg-[#1a1a1a] p-4 text-white border border-[#333333] transition-all focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]" 
              />
            </div>
            <div>
              <label className="mb-2 block font-heading text-xs uppercase tracking-widest text-[#C0C0C0]">Sobre o Projeto</label>
              <textarea 
                rows={5} 
                required 
                value={form.message} 
                onChange={e => setForm({...form, message: e.target.value})} 
                className="w-full rounded-md bg-[#1a1a1a] p-4 text-white border border-[#333333] transition-all focus:border-[#FFD700] focus:outline-none focus:ring-1 focus:ring-[#FFD700]" 
              />
            </div>
            <button 
              type="submit" 
              disabled={status === 'loading'} 
              className="w-full rounded-md bg-gradient-to-r from-[#B8860B] to-[#FFD700] p-4 font-heading font-bold uppercase tracking-wide text-black transition-all hover:brightness-110 disabled:opacity-50"
            >
              {status === 'loading' ? 'Enviando...' : 'Solicitar Orçamento'}
            </button>
            {status === 'error' && <div className="text-red-500 text-center text-sm font-bold">Erro ao enviar mensagem. Tente novamente.</div>}
          </form>
        )}
      </div>
    </section>
  )
}
