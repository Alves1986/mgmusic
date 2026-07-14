import Image from 'next/image'

const WHATSAPP = 'https://wa.me/5542998251011'

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-studio.png"
          alt="Estúdio profissional MG Music Studio"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <h1 className="mb-6 text-balance font-heading text-4xl font-bold leading-tight tracking-tight text-silver-light drop-shadow-lg md:text-6xl lg:text-7xl">
          MG MUSIC STUDIO: PRODUÇÃO DE{' '}
          <span className="text-gradient-gold">
            EXCELÊNCIA E ALTA CONVERSÃO.
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-pretty font-sans text-lg leading-relaxed text-silver md:text-xl">
          Junte-se aos mais de 100 milhões de ouvintes impactados pelas
          produções do MG Music Studio. Qualidade técnica impecável e visão
          artística que transforma.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-gradient w-full rounded-md px-8 py-4 text-center font-heading font-bold text-black shadow-[0_0_20px_rgba(184,134,11,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] sm:w-auto"
          >
            SOLICITAR ORÇAMENTO
            <span className="block text-xs font-medium opacity-80">
              (42) 99825-1011
            </span>
          </a>
          <a
            href="#portfolio"
            className="flex h-[60px] w-full items-center justify-center rounded-md border-2 border-gold bg-transparent px-8 font-heading font-bold text-silver-light transition-all duration-300 hover:-translate-y-1 hover:bg-gold/10 sm:w-auto"
          >
            VER PORTFÓLIO
          </a>
        </div>
      </div>
    </section>
  )
}
