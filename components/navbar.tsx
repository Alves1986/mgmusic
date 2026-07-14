'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#home', label: 'HOME' },
  { href: '#produtora', label: 'A PRODUTORA' },
  { href: '#servicos', label: 'SERVIÇOS' },
  { href: '#portfolio', label: 'PORTFÓLIO' },
  { href: '#contato', label: 'CONTATO' },
]

const WHATSAPP = 'https://wa.me/5542998251011'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b border-brand-border transition-all duration-300 backdrop-blur-md ${
        scrolled ? 'bg-black/95 shadow-lg' : 'bg-black/90'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8 lg:px-12">
        <a href="#home" className="flex items-center gap-2">
          <Image
            src="/mg-music-logo.png"
            alt="MG Music Studio"
            width={48}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </a>

        <div className="hidden items-center gap-8 font-heading text-sm font-medium tracking-wider text-silver-light md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-gradient rounded-md px-6 py-2.5 font-heading text-sm font-bold text-black shadow-[0_0_15px_rgba(184,134,11,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]"
          >
            AGENDAR ORÇAMENTO
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
          className="text-gold md:hidden"
        >
          {open ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {open && (
        <div className="absolute w-full border-b border-brand-border bg-card md:hidden">
          <div className="space-y-2 px-4 pb-6 pt-2 text-center font-heading">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-brand-border/50 px-3 py-3 text-silver-light transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="bg-gold-gradient mt-4 block w-full rounded-md px-6 py-3 font-heading text-sm font-bold text-black"
            >
              AGENDAR ORÇAMENTO
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
