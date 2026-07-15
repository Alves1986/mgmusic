import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Footer() {
  const [links, setLinks] = useState({
    instagram: '#',
    facebook: '#',
    youtube: '#'
  })

  useEffect(() => {
    supabase.from('site_settings').select('*').in('key', ['social_instagram', 'social_facebook', 'social_youtube']).then(({ data }) => {
      if (data && data.length > 0) {
        const map: Record<string, string> = {}
        data.forEach(s => map[s.key] = s.value)
        setLinks({
          instagram: map['social_instagram'] || '#',
          facebook: map['social_facebook'] || '#',
          youtube: map['social_youtube'] || '#'
        })
      }
    })
  }, [])

  return (
    <footer className="bg-black py-12 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
                <img src="/logo.png" alt="MG Music Studio Logo" className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            
            <p className="font-body text-brand-silver text-xs text-center md:text-left">
                &copy; {new Date().getFullYear()} MG Music Studio. Todos os direitos reservados.
            </p>

            <div className="flex gap-4">
                <a href={links.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-silver hover:text-brand-gold hover:border-brand-gold transition-colors duration-300">
                    <i className="ph ph-instagram-logo text-xl"></i>
                </a>
                <a href={links.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-silver hover:text-brand-gold hover:border-brand-gold transition-colors duration-300">
                    <i className="ph ph-facebook-logo text-xl"></i>
                </a>
                <a href={links.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-silver hover:text-brand-gold hover:border-brand-gold transition-colors duration-300">
                    <i className="ph ph-youtube-logo text-xl"></i>
                </a>
            </div>
        </div>
    </footer>
  )
}
