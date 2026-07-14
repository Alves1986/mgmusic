import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Outfit, Instrument_Sans } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MG Music Studio | Produção de Excelência',
  description:
    'MG Music Studio: produção musical, gravação, masterização, edição de áudio e vídeo e estúdio de podcast em Telêmaco Borba - PR. Mais de 100 milhões de ouvintes impactados.',
  generator: 'v0.app',
  keywords: [
    'MG Music Studio',
    'Gesiel Jasson',
    'produção musical',
    'estúdio gospel',
    'masterização',
    'podcast',
    'Telêmaco Borba',
  ],
  openGraph: {
    title: 'MG Music Studio | Produção de Excelência',
    description:
      'Qualidade técnica impecável e visão artística que transforma. Junte-se aos mais de 100 milhões de ouvintes impactados.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${instrumentSans.variable} bg-background`}
    >
      <body className="font-sans antialiased selection:bg-gold selection:text-black">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
