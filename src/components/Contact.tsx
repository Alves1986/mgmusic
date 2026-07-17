import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const [contactInfo, setContactInfo] = useState({ 
    whatsapp: '11999999999', 
    email: 'contato@mgmusic.com', 
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115383.08051781297!2d-50.24719057861937!3d-25.094593451551062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81a4159f81d11%3A0xa11ff6e7cc0e43ea!2sPonta%20Grossa%2C%20PR!5e0!3m2!1spt-BR!2sbr!4v1715000000000!5m2!1spt-BR!2sbr',
    mapDirectUrl: 'https://maps.app.goo.gl/'
  })

  useEffect(() => {
    supabase.from('site_settings').select('*').in('key', ['contact_whatsapp', 'contact_email', 'map_embed_url', 'map_direct_url']).then(({ data }) => {
      if (data && data.length > 0) {
        const map: Record<string, string> = {}
        data.forEach(s => map[s.key] = s.value)
        setContactInfo({
          whatsapp: map['contact_whatsapp'] || '11999999999',
          email: map['contact_email'] || 'contato@mgmusic.com',
          mapEmbedUrl: map['map_embed_url'] || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115383.08051781297!2d-50.24719057861937!3d-25.094593451551062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81a4159f81d11%3A0xa11ff6e7cc0e43ea!2sPonta%20Grossa%2C%20PR!5e0!3m2!1spt-BR!2sbr!4v1715000000000!5m2!1spt-BR!2sbr',
          mapDirectUrl: map['map_direct_url'] || 'https://maps.app.goo.gl/'
        })
      }
    })
  }, [])
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    const { error } = await supabase.from('leads').insert([
      { 
        name: form.name, 
        email: form.email, 
        message: form.message,
        service_interest: 'Geral', // Can be expanded later
        status: 'Novo'
      }
    ])

    if (error) {
      console.error(error)
      setStatus('error')
    } else {
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    }
  }

  return (
    <section id="contato" className="py-24 bg-brand-card relative z-10 border-t border-brand-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-heading text-sm text-brand-silver tracking-[0.3em] uppercase section-title-line mb-16">CONTATO</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                <div className="bg-black/50 p-8 rounded-xl border border-brand-border shadow-lg">
                    <h3 className="font-heading text-2xl text-white mb-6">Solicite um Orçamento</h3>
                    {status === 'success' ? (
                      <div className="text-center py-8">
                        <h4 className="text-xl text-brand-gold mb-2 font-bold font-heading">Mensagem Enviada!</h4>
                        <p className="text-brand-silverLight">Entraremos em contato em breve.</p>
                        <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-brand-gold hover:underline">Enviar outra mensagem</button>
                      </div>
                    ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input type="text" placeholder="Nome" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-brand-card border border-brand-border rounded-md px-4 py-3 text-brand-silverLight focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all font-body" />
                        </div>
                        <div>
                            <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-brand-card border border-brand-border rounded-md px-4 py-3 text-brand-silverLight focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all font-body" />
                        </div>
                        <div>
                            <textarea rows={4} placeholder="Mensagem / Descreva seu projeto" required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-brand-card border border-brand-border rounded-md px-4 py-3 text-brand-silverLight focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all font-body resize-none"></textarea>
                        </div>
                        <button type="submit" disabled={status === 'loading'} className="w-full font-heading font-bold text-black bg-gold-gradient hover:bg-gold-gradient-hover px-8 py-3 rounded-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:brightness-110 mt-2 uppercase tracking-wide disabled:opacity-50">
                            {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                        </button>
                        {status === 'error' && <p className="text-red-500 text-sm mt-2">Ocorreu um erro. Tente novamente.</p>}
                    </form>
                    )}
                </div>

                <div className="flex flex-col justify-between">
                    <div className="bg-brand-border/20 rounded-xl border border-brand-border p-2 mb-8 h-64 lg:h-auto lg:flex-1 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#e5e3df] opacity-80 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-500">
                             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-30" alt="Map Texture" />
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <i className="ph-fill ph-map-pin text-4xl text-brand-dark drop-shadow-md mb-2"></i>
                            <div className="bg-white px-3 py-1 rounded shadow-md text-brand-dark font-heading text-sm font-bold">
                                Telêmaco Borba - PR
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-brand-silver font-body text-sm">
                        <div className="flex gap-3">
                            <i className="ph ph-buildings text-xl text-brand-gold mt-1"></i>
                            <div>
                                <p className="font-bold text-white mb-1">MG Music Studio</p>
                                <p>CNPJ 31.865.270/0001-99</p>
                                <p>Resp: Gesiel Jasson de Oliveira</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <i className="ph ph-map-pin text-xl text-brand-gold mt-1"></i>
                            <div>
                                <p>Rua dos Curiós, 25</p>
                                <p>São João</p>
                                <p>Telêmaco Borba - PR</p>
                            </div>
                        </div>
                        <div className="flex gap-3 sm:col-span-2">
                            <i className="ph ph-whatsapp-logo text-xl text-brand-gold mt-1"></i>
                            <div>
                                <a href={`https://wa.me/55${contactInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-brand-gold transition-colors text-lg">{contactInfo.whatsapp}</a>
                                <p className="text-xs">Atendimento via WhatsApp</p>
                            </div>
                        </div>
                        <div className="flex gap-3 sm:col-span-2">
                            <i className="ph ph-envelope-simple text-xl text-brand-gold mt-1"></i>
                            <div>
                                <a href={`mailto:${contactInfo.email}`} className="font-bold text-white hover:text-brand-gold transition-colors text-lg">{contactInfo.email}</a>
                                <p className="text-xs">Atendimento via Email</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 relative group">
                    <div className="bg-black border border-brand-border rounded-xl p-2 w-full h-[300px] overflow-hidden shadow-xl">
                        {/* Clean embed url if user pasted full iframe code */}
                        <iframe 
                          src={contactInfo.mapEmbedUrl.includes('<iframe') ? contactInfo.mapEmbedUrl.split('src="')[1]?.split('"')[0] || contactInfo.mapEmbedUrl : contactInfo.mapEmbedUrl} 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        ></iframe>
                    </div>

                    <a 
                      href={contactInfo.mapDirectUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(184,134,11,0.6)] hover:-translate-y-1 transition-all duration-300 z-10 whitespace-nowrap"
                    >
                      <i className="ph ph-map-pin text-xl"></i>
                      Abrir no Google Maps
                    </a>
                </div>
            </div>
        </div>
    </section>
  )
}
