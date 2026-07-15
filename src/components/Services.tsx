export default function Services() {
  return (
    <section id="servicos" className="py-24 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-heading text-sm text-brand-silver tracking-[0.3em] uppercase section-title-line mb-16">SERVIÇOS</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-brand-card border border-brand-border rounded-xl p-8 text-center group hover:border-brand-gold transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(184,134,11,0.2)] flex flex-col items-center justify-center min-h-[220px]">
                    <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors duration-300">
                        <i className="ph ph-waves text-3xl text-brand-gold"></i>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-brand-silverLight uppercase tracking-wide leading-snug">GRAVAÇÃO &<br />MASTERIZAÇÃO</h3>
                </div>

                <div className="bg-brand-card border border-brand-border rounded-xl p-8 text-center group hover:border-brand-gold transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(184,134,11,0.2)] flex flex-col items-center justify-center min-h-[220px]">
                    <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors duration-300">
                        <i className="ph ph-music-notes text-3xl text-brand-gold"></i>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-brand-silverLight uppercase tracking-wide leading-snug">PRODUÇÃO MUSICAL<br />COMPLETA</h3>
                </div>

                <div className="bg-brand-card border border-brand-border rounded-xl p-8 text-center group hover:border-brand-gold transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(184,134,11,0.2)] flex flex-col items-center justify-center min-h-[220px]">
                    <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors duration-300">
                        <i className="ph ph-video-camera text-3xl text-brand-gold"></i>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-brand-silverLight uppercase tracking-wide leading-snug">EDIÇÃO DE ÁUDIO<br />E VÍDEO</h3>
                </div>

                <div className="bg-brand-card border border-brand-border rounded-xl p-8 text-center group hover:border-brand-gold transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(184,134,11,0.2)] flex flex-col items-center justify-center min-h-[220px]">
                    <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors duration-300">
                        <i className="ph ph-microphone-stage text-3xl text-brand-gold"></i>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-brand-silverLight uppercase tracking-wide leading-snug">ESPAÇO PARA<br />PODCAST</h3>
                </div>
            </div>
        </div>
    </section>
  )
}
