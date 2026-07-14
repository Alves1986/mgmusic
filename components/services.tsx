import { AudioWaveform, Music4, Clapperboard, Mic2 } from 'lucide-react'
import { SectionTitle } from './section-title'

const services = [
  {
    icon: AudioWaveform,
    title: 'GRAVAÇÃO & MASTERIZAÇÃO',
    description:
      'Captação de áudio de alta qualidade e finalização profissional, garantindo sonoridade impecável.',
  },
  {
    icon: Music4,
    title: 'PRODUÇÃO MUSICAL COMPLETA',
    description:
      'Desenvolvimento completo de projetos, da concepção de arranjos e pré-produção à direção artística.',
  },
  {
    icon: Clapperboard,
    title: 'EDIÇÃO DE ÁUDIO E VÍDEO',
    description:
      'Pós-produção especializada: edição, mixagem, sincronização e color grading para clipes e lives.',
  },
  {
    icon: Mic2,
    title: 'ESPAÇO PARA PODCAST',
    description:
      'Ambiente dedicado e totalmente equipado com recursos de áudio e vídeo profissionais.',
  },
]

export function Services() {
  return (
    <section id="servicos" className="relative z-10 bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle className="mb-16">SERVIÇOS</SectionTitle>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex min-h-[240px] flex-col items-center rounded-xl border border-brand-border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-[0_10px_30px_-10px_rgba(184,134,11,0.2)]"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                <service.icon className="h-8 w-8 text-gold" />
              </div>
              <h3 className="mb-3 font-heading text-lg font-bold uppercase leading-snug tracking-wide text-silver-light text-balance">
                {service.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-silver">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
