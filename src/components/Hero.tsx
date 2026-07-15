export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" alt="Music Studio Background" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight text-white drop-shadow-lg">
                MG MUSIC STUDIO: PRODUÇÃO DE<br />
                <span className="text-gradient-gold">EXCELÊNCIA E ALTA CONVERSÃO.</span>
            </h1>
            <p className="font-body text-brand-silver text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                Junte-se aos mais de 100 milhões de ouvintes impactados pelas produções do MG Music Studio. Qualidade técnica impecável e visão artística que transforma.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://wa.me/5542991534011" target="_blank" rel="noopener noreferrer" className="font-heading font-bold text-black bg-gold-gradient px-8 py-4 rounded-md transition-all duration-300 shadow-[0_0_20px_rgba(184,134,11,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:-translate-y-1 w-full sm:w-auto">
                    SOLICITAR ORÇAMENTO<br />
                    <span className="text-xs font-medium opacity-80">(42) 99153-4011</span>
                </a>
                <a href="#portfolio" className="font-heading font-bold text-brand-silverLight bg-transparent border-2 border-brand-gold px-8 py-4 rounded-md transition-all duration-300 hover:bg-brand-gold/10 hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center h-[60px]">
                    VER PORTFÓLIO
                </a>
            </div>
        </div>
    </section>
  )
}
