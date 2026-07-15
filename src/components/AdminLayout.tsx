import { Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

export default function AdminLayout() {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-black text-brand-silver">Carregando...</div>
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-black text-brand-silver font-body flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 md:min-h-screen border-b md:border-b-0 md:border-r border-brand-border bg-brand-card flex flex-col">
        <div className="p-6 border-b border-brand-border flex justify-center md:justify-start">
            <img src="/logo.png" alt="MG Music Studio" className="h-12 w-auto object-contain" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
            <Link 
                to="/admin" 
                className={`block px-4 py-3 rounded-md transition-colors font-heading ${isActive('/admin') ? 'bg-brand-gold/10 text-brand-gold font-bold' : 'hover:bg-brand-border/50 hover:text-white'}`}
            >
                <i className="ph ph-squares-four mr-2"></i> Dashboard
            </Link>
            <Link 
                to="/admin/crm" 
                className={`block px-4 py-3 rounded-md transition-colors font-heading ${isActive('/admin/crm') ? 'bg-brand-gold/10 text-brand-gold font-bold' : 'hover:bg-brand-border/50 hover:text-white'}`}
            >
                <i className="ph ph-users mr-2"></i> CRM (Leads)
            </Link>
            <Link 
                to="/admin/portfolio" 
                className={`block px-4 py-3 rounded-md transition-colors font-heading ${isActive('/admin/portfolio') ? 'bg-brand-gold/10 text-brand-gold font-bold' : 'hover:bg-brand-border/50 hover:text-white'}`}
            >
                <i className="ph ph-video-camera mr-2"></i> Portfólio
            </Link>
            <Link 
                to="/admin/settings" 
                className={`block px-4 py-3 rounded-md transition-colors font-heading ${isActive('/admin/settings') ? 'bg-brand-gold/10 text-brand-gold font-bold' : 'hover:bg-brand-border/50 hover:text-white'}`}
            >
                <i className="ph ph-gear mr-2"></i> Configurações
            </Link>
        </nav>
        <div className="p-4 border-t border-brand-border">
            <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-md text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors font-heading"
            >
                <i className="ph ph-sign-out mr-2"></i> Sair
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-black">
        <Outlet />
      </main>
    </div>
  )
}
