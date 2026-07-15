import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>
      <p className="mb-8 text-[#C0C0C0]">Bem-vindo ao painel administrativo.</p>
      <button
        onClick={handleLogout}
        className="rounded border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
      >
        Sair
      </button>
    </div>
  )
}
