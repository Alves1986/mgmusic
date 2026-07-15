import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Hero() {
  const [content, setContent] = useState({
    title: 'Transformando Ideias em Obras-Primas',
    subtitle: 'Gravadora e produtora musical especializada em elevar o nível da sua música. Do primeiro acorde à masterização final, damos vida à sua visão com excelência e paixão.',
    whatsapp: '11999999999'
  })

  useEffect(() => {
    supabase.from('site_settings').select('*').in('key', ['hero_title', 'hero_subtitle', 'contact_whatsapp']).then(({ data }) => {
      if (data && data.length > 0) {
        const map: Record<string, string> = {}
        data.forEach(s => map[s.key] = s.value)
        setContent(prev => ({
          title: map['hero_title'] || prev.title,
          subtitle: map['hero_subtitle'] || prev.subtitle,
          whatsapp: map['contact_whatsapp'] || prev.whatsapp
        }))
      }
    })
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" alt="Music Studio Background" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
                {content.title}
            </h1>
            
            <p className="font-body text-lg md:text-xl text-brand-silverLight mb-10 max-w-2xl mx-auto">
                {content.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`https://wa.me/55${content.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-heading font-bold text-black bg-gold-gradient px-8 py-4 rounded-md transition-all duration-300 shadow-[0_0_20px_rgba(184,134,11,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:-translate-y-1 w-full sm:w-auto">
                    Iniciar Meu Projeto
                </a>
                <a href="#portfolio" className="font-heading font-bold text-brand-silverLight bg-transparent border-2 border-brand-gold px-8 py-4 rounded-md transition-all duration-300 hover:bg-brand-gold/10 hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center h-[60px]">
                    VER PORTFÓLIO
                </a>
            </div>
        </div>
    </section>
  )
}
