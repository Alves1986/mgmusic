export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-black p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/50 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <h1 className="mb-6 font-heading text-6xl font-bold tracking-tight text-[#E0E0E0] md:text-8xl">
          O SOM QUE <span className="text-[#FFD700]">MARCA</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-[#C0C0C0] md:text-xl">
          Produção musical de excelência, do arranjo à masterização. Eleve sua música com quem entende do mercado gospel.
        </p>
        <a href="#portfolio" className="inline-block rounded-md bg-gradient-to-r from-[#B8860B] to-[#FFD700] px-8 py-4 font-heading font-bold uppercase tracking-wide text-black transition-all hover:scale-105 hover:brightness-110">
          Ouça nosso trabalho
        </a>
      </div>
    </section>
  )
}
