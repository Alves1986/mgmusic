import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 border-b border-brand-border ${scrolled ? 'bg-black/95 shadow-lg' : 'bg-black/90 backdrop-blur-md'}`} id="navbar">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 h-24 md:h-28 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src="/logo.png" alt="MG Music Studio Logo" className="h-16 md:h-24 w-auto object-contain" />
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm tracking-wider font-heading font-medium text-brand-silverLight">
          <a href="#home" className="hover:text-brand-gold transition-colors duration-200">HOME</a>
          <a href="#produtora" className="hover:text-brand-gold transition-colors duration-200">A PRODUTORA</a>
          <a href="#servicos" className="hover:text-brand-gold transition-colors duration-200">SERVIÇOS</a>
          <a href="#portfolio" className="hover:text-brand-gold transition-colors duration-200">PORTFÓLIO</a>
          <a href="#contato" className="hover:text-brand-gold transition-colors duration-200">CONTATO</a>
        </div>

        <div className="hidden md:block">
          <a href="https://wa.me/5542991534011" target="_blank" rel="noopener noreferrer" className="font-heading text-sm font-bold text-black bg-gold-gradient hover:bg-gold-gradient-hover px-6 py-2.5 rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(184,134,11,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]">
            AGENDAR ORÇAMENTO
          </a>
        </div>

        <button className="md:hidden text-brand-gold text-3xl focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <i className="ph ph-list"></i>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-brand-card absolute w-full border-b border-brand-border" id="mobile-menu">
          <div className="px-4 pt-2 pb-6 space-y-2 font-heading text-center">
            <a href="#home" onClick={() => setIsOpen(false)} className="block px-3 py-3 hover:text-brand-gold border-b border-brand-border/50">HOME</a>
            <a href="#produtora" onClick={() => setIsOpen(false)} className="block px-3 py-3 hover:text-brand-gold border-b border-brand-border/50">A PRODUTORA</a>
            <a href="#servicos" onClick={() => setIsOpen(false)} className="block px-3 py-3 hover:text-brand-gold border-b border-brand-border/50">SERVIÇOS</a>
            <a href="#portfolio" onClick={() => setIsOpen(false)} className="block px-3 py-3 hover:text-brand-gold border-b border-brand-border/50">PORTFÓLIO</a>
            <a href="#contato" onClick={() => setIsOpen(false)} className="block px-3 py-3 hover:text-brand-gold mb-4">CONTATO</a>
            <a href="https://wa.me/5542991534011" target="_blank" rel="noopener noreferrer" className="inline-block font-heading text-sm font-bold text-black bg-gold-gradient px-6 py-3 rounded-md w-full">AGENDAR ORÇAMENTO</a>
          </div>
        </div>
      )}
    </nav>
  )
}
