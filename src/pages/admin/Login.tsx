import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Credenciais inválidas.')
      setLoading(false)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black font-body px-4">
      <div className="mb-8">
        <img src="/logo.png" alt="MG Music Studio Logo" className="h-24 md:h-32 w-auto object-contain" />
      </div>
      <div className="w-full max-w-md rounded-xl border border-brand-border bg-brand-card p-8 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold text-white font-heading text-center tracking-wide">ACESSO ADMINISTRATIVO</h2>
        {error && <div className="mb-4 rounded bg-red-900/50 p-3 text-red-200 text-center text-sm border border-red-500/50">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-silver">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:ring-1 focus:ring-brand-gold focus:outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-brand-silver">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded bg-black p-3 text-white border border-brand-border focus:border-brand-gold focus:ring-1 focus:ring-brand-gold focus:outline-none transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-gold-gradient hover:bg-gold-gradient-hover p-3 font-bold text-black font-heading tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(184,134,11,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] disabled:opacity-50 mt-2"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
