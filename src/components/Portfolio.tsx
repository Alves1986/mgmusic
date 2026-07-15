import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

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
    <section id="portfolio" className="py-20 bg-black relative z-10 border-t border-brand-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-heading text-sm text-brand-silver tracking-[0.3em] uppercase section-title-line mb-16">PORTFÓLIO</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-video cursor-pointer border border-brand-border hover:border-brand-gold transition-colors duration-300">
                    <img src={item.thumbnail_url || "https://images.unsplash.com/photo-1516280440503-6c9fa5ce0170?q=80&w=800&auto=format&fit=crop"} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300"></div>
                    <a href={item.video_url || '#'} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center text-black shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <i className="ph-fill ph-play text-2xl ml-1"></i>
                        </div>
                    </a>
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
                        <p className="font-body text-sm text-brand-silverLight font-medium">{item.title} {item.artist ? `- ${item.artist}` : ''}</p>
                    </div>
                </div>
                ))}
            </div>
            
            <div className="text-center mt-12">
                <a href="#" className="inline-flex items-center gap-2 font-heading font-semibold text-brand-gold hover:text-brand-goldLight transition-colors">
                    Ver canal no YouTube <i className="ph ph-arrow-right"></i>
                </a>
            </div>
        </div>
    </section>
  )
}
