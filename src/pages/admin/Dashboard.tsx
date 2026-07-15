import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold font-heading text-white">Dashboard</h2>
      <p className="mb-8 text-brand-silver">Bem-vindo ao painel administrativo da MG Music Studio.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand-card border border-brand-border rounded-xl p-6 shadow-lg hover:border-brand-gold transition-colors group">
            <h3 className="font-heading font-bold text-xl text-brand-gold mb-2">Gerenciar Portfólio</h3>
            <p className="text-sm text-brand-silver mb-4">Adicione e edite os vídeos e projetos exibidos na página principal.</p>
            <Link to="/admin/portfolio" className="text-sm text-white underline group-hover:text-brand-gold">Acessar Portfólio</Link>
        </div>
        <div className="bg-brand-card border border-brand-border rounded-xl p-6 shadow-lg hover:border-brand-gold transition-colors group">
            <h3 className="font-heading font-bold text-xl text-brand-gold mb-2">Configurações Gerais</h3>
            <p className="text-sm text-brand-silver mb-4">Atualize as métricas da seção "Prova Social" (Ouvintes, Projetos, Artistas).</p>
            <Link to="/admin/settings" className="text-sm text-white underline group-hover:text-brand-gold">Acessar Configurações</Link>
        </div>
      </div>
    </div>
  )
}
