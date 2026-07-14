import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Stats } from '@/components/stats'
import { Services } from '@/components/services'
import { Portfolio } from '@/components/portfolio'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <Contact />
      <SiteFooter />
    </main>
  )
}
