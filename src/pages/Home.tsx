import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#C0C0C0] font-sans">
      <main>
        <Hero />
        <Stats />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
