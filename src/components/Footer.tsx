export default function Footer() {
  return (
    <footer className="border-t border-[#333333] bg-[#0A0A0A] py-12 px-8 text-center">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-2xl font-bold text-[#FFD700] mb-4">MG Music Studio</h2>
        <p className="text-sm text-[#C0C0C0] mb-8">Excelência em produção musical cristã.</p>
        <p className="text-xs text-[#C0C0C0]/50">&copy; {new Date().getFullYear()} MG Music Studio. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
