'use client'

import { useState } from 'react'
import { Building2, MapPin, MessageCircle } from 'lucide-react'
import { SectionTitle } from './section-title'

const WHATSAPP_NUMBER = '5542998251011'

export function Contact() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const action = async (formData: FormData) => {
    setStatus('submitting')
    try {
      // Try to save to DB, but don't block if it fails
      try {
        const { saveLead } = await import('@/lib/actions')
        await saveLead(formData)
      } catch {
        // DB not available, that's ok - still redirect to WhatsApp
      }
      
      const text = `Olá! Meu nome é ${nome || '(sem nome)'}.%0AEmail: ${
        email || '(não informado)'
      }%0A%0A${mensagem || 'Gostaria de solicitar um orçamento.'}`
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank')
      
      setStatus('success')
      setNome('')
      setEmail('')
      setMensagem('')
    } catch (e) {
      console.error(e)
      setStatus('idle')
      alert('Ocorreu um erro. Tente novamente.')
    }
  }

  return (
    <section
      id="contato"
      className="relative z-10 border-t border-brand-border/30 bg-card py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle className="mb-16">CONTATO</SectionTitle>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="rounded-xl border border-brand-border bg-black/50 p-8 shadow-lg">
            <h3 className="mb-6 font-heading text-2xl text-silver-light">
              Solicite um Orçamento
            </h3>
            <form className="space-y-4" action={action}>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-md border border-brand-border bg-card px-4 py-3 font-sans text-silver-light transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-brand-border bg-card px-4 py-3 font-sans text-silver-light transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <textarea
                rows={4}
                name="message"
                placeholder="Mensagem / Descreva seu projeto"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full resize-none rounded-md border border-brand-border bg-card px-4 py-3 font-sans text-silver-light transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-gold-gradient mt-2 w-full rounded-md px-8 py-3 font-heading font-bold uppercase tracking-wide text-black transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] disabled:opacity-50"
              >
                {status === 'submitting' ? 'Enviando...' : status === 'success' ? 'Mensagem Enviada!' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="relative h-64 flex-1 overflow-hidden rounded-xl border border-brand-border">
              <iframe
                title="Localização MG Music Studio"
                src="https://www.google.com/maps?q=Rua+dos+Curi%C3%B3s,+25,+S%C3%A3o+Jo%C3%A3o,+Tel%C3%AAmaco+Borba+-+PR&output=embed"
                className="h-full w-full grayscale transition-all duration-500 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 font-sans text-sm text-silver sm:grid-cols-2">
              <div className="flex gap-3">
                <Building2 className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="mb-1 font-bold text-silver-light">
                    MG Music Studio
                  </p>
                  <p>CNPJ 31.865.270/0001-99</p>
                  <p>Resp: Gesiel Jasson de Oliveira</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p>Rua dos Curiós, 25</p>
                  <p>São João</p>
                  <p>Telêmaco Borba - PR</p>
                </div>
              </div>
              <div className="flex gap-3 sm:col-span-2">
                <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-silver-light transition-colors hover:text-gold"
                  >
                    (42) 99825-1011
                  </a>
                  <p className="text-xs">Atendimento via WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
