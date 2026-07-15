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
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A]">
      <div className="w-full max-w-md rounded-xl border border-[#333333] bg-[#121212] p-8">
        <h2 className="mb-6 text-2xl font-bold text-[#FFD700]">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-[#C0C0C0]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded bg-[#1a1a1a] p-3 text-white border border-[#333333] focus:border-[#FFD700] focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-[#C0C0C0]">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded bg-[#1a1a1a] p-3 text-white border border-[#333333] focus:border-[#FFD700] focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#FFD700] p-3 font-bold text-black disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
