import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminLayout() {
  const { session, loading } = useAuth()

  if (loading) {
    return <div className="p-8 text-[#C0C0C0]">Carregando...</div>
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#C0C0C0]">
      <nav className="border-b border-[#333333] p-4">
        <h1 className="text-[#FFD700] font-bold">Admin Panel</h1>
      </nav>
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  )
}
