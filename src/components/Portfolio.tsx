import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Play } from 'lucide-react'

type PortfolioItem = {
  id: string
  title: string
  artist: string | null
  genre_tag: string | null
  video_url: string | null
  thumbnail_url: string | null
}

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([])

  useEffect(() => {
    supabase
      .from('portfolio_items')
      .select('*')
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        if (data) setItems(data)
      })
  }, [])

  return (
    <section id="portfolio" className="bg-[#0A0A0A] py-32 px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 font-heading text-5xl font-bold text-[#E0E0E0] text-center tracking-tight">
          NOSSO <span className="text-[#FFD700]">PORTFÓLIO</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.video_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl bg-[#121212] border border-[#333333] transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] block"
            >
              <div className="aspect-video bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
                {item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <Play className="h-16 w-16 text-[#FFD700] opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-80" />
              </div>
              <div className="p-8 relative z-10 -mt-12">
                {item.genre_tag && (
                  <span className="inline-block mb-3 rounded-sm border border-[#FFD700]/30 bg-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FFD700]">
                    {item.genre_tag}
                  </span>
                )}
                <h3 className="font-heading text-2xl font-bold text-[#E0E0E0]">{item.title}</h3>
                <p className="mt-2 font-sans text-sm text-[#C0C0C0]">{item.artist}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
