export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-brand-gold text-lg uppercase tracking-widest grayscale hover:grayscale-0 transition-all duration-500">MG Music Studio</span>
            </div>
            
            <p className="font-body text-brand-silver text-xs text-center md:text-left">
                &copy; {new Date().getFullYear()} MG Music Studio. Todos os direitos reservados.
            </p>

            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-silver hover:text-brand-gold hover:border-brand-gold transition-colors duration-300">
                    <i className="ph ph-instagram-logo text-xl"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-silver hover:text-brand-gold hover:border-brand-gold transition-colors duration-300">
                    <i className="ph ph-facebook-logo text-xl"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-silver hover:text-brand-gold hover:border-brand-gold transition-colors duration-300">
                    <i className="ph ph-youtube-logo text-xl"></i>
                </a>
            </div>
        </div>
    </footer>
  )
}
