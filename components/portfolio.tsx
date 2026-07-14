import Image from 'next/image'
import { Play, ArrowRight } from 'lucide-react'
import { SectionTitle } from './section-title'

const fallbackItems = [
  {
    image: '/portfolio-1.png',
    title: 'Giselli Cristina - Clipe Oficial',
    tag: 'GOSPEL',
    href: 'https://www.youtube.com/watch?v=CD44VmWSPMY',
  },
  {
    image: '/portfolio-2.png',
    title: 'Moisés Cleyton - Produção',
    tag: 'GOSPEL',
    href: 'https://www.youtube.com/watch?v=eocCJUD1m3w',
  },
  {
    image: '/portfolio-3.png',
    title: 'Gravação de Estúdio - Ao Vivo',
    tag: 'AO VIVO',
    href: 'https://www.youtube.com/@GiselliCristinaOficial',
  },
  {
    image: '/portfolio-4.png',
    title: 'Mixagem & Masterização',
    tag: 'ÁUDIO',
    href: 'https://www.youtube.com/@GiselliCristinaOficial',
  },
  {
    image: '/portfolio-5.png',
    title: 'Hudson Almeida - Clipe Oficial',
    tag: 'VÍDEO',
    href: 'https://webradiofrutificai.com.br/post/81399/hudson-almeida-lanca-a-versao-de-que-se-abram-os-ceus',
  },
  {
    image: '/portfolio-6.png',
    title: 'Edição para Videocast',
    tag: 'PODCAST',
    href: 'https://www.youtube.com/@GiselliCristinaOficial',
  },
]

export async function Portfolio() {
  let displayItems = fallbackItems;

  try {
    const { db } = await import('@/lib/db')
    const { portfolioItems } = await import('@/lib/db/schema')
    const { desc } = await import('drizzle-orm')
    
    const items = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt))
    
    if (items.length > 0) {
      displayItems = items.map(item => ({
        title: item.title,
        tag: item.genreTag || '',
        href: item.videoUrl || '#',
        image: item.thumbnailUrl || '/portfolio-1.png',
      }))
    }
  } catch {
    // DB not available, use fallback items
  }

  return (
    <section
      id="portfolio"
      className="relative z-10 border-t border-brand-border/30 bg-background py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle className="mb-16">PORTFÓLIO</SectionTitle>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-brand-border transition-colors duration-300 hover:border-gold"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 transition-colors duration-300 group-hover:bg-black/40" />
              <div className="absolute left-4 top-4">
                <span className="rounded bg-black/60 px-2 py-1 font-heading text-xs font-semibold uppercase tracking-widest text-gold">
                  {item.tag}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-black" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                <p className="font-sans text-sm font-medium text-silver-light">
                  {item.title}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@GiselliCristinaOficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-heading font-semibold text-gold transition-colors hover:text-gold-light"
          >
            Ver canal no YouTube <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
