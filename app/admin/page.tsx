import { db } from '@/lib/db';
import { leads, portfolioItems } from '@/lib/db/schema';
import { desc, count } from 'drizzle-orm';
import Link from 'next/link';

export default async function AdminDashboard() {
  const recentLeads = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5);
  const totalLeads = await db.select({ value: count() }).from(leads);
  const totalPortfolio = await db.select({ value: count() }).from(portfolioItems);

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 font-heading text-3xl font-bold text-silver-light">Painel de Controle</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-brand-border/30 bg-[#121212] p-6">
          <h2 className="mb-2 font-sans text-sm font-semibold uppercase text-silver">Total de Leads</h2>
          <p className="font-heading text-4xl text-gold">{totalLeads[0].value}</p>
        </div>
        <div className="rounded-xl border border-brand-border/30 bg-[#121212] p-6">
          <h2 className="mb-2 font-sans text-sm font-semibold uppercase text-silver">Itens no Portfólio</h2>
          <p className="font-heading text-4xl text-gold">{totalPortfolio[0].value}</p>
        </div>
        <div className="rounded-xl border border-brand-border/30 bg-[#121212] p-6">
          <h2 className="mb-2 font-sans text-sm font-semibold uppercase text-silver">Ações Rápidas</h2>
          <div className="flex flex-col gap-2">
            <Link href="/admin/portfolio/new" className="text-silver hover:text-gold">
              + Adicionar ao Portfólio
            </Link>
            <Link href="/admin/settings" className="text-silver hover:text-gold">
              ⚙️ Editar Textos da Home
            </Link>
          </div>
        </div>
      </div>

      <h2 className="mb-4 mt-12 font-heading text-xl font-bold text-silver-light">Leads Recentes</h2>
      <div className="overflow-hidden rounded-xl border border-brand-border/30 bg-[#121212]">
        <table className="w-full text-left text-sm text-silver">
          <thead className="bg-[#1a1a1a] text-xs uppercase text-silver">
            <tr>
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Data</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentLeads.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">Nenhum lead encontrado.</td>
              </tr>
            ) : (
              recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-brand-border/30 hover:bg-[#1a1a1a]/50">
                  <td className="px-6 py-4 font-medium text-silver-light">{lead.name}</td>
                  <td className="px-6 py-4">{lead.email}</td>
                  <td className="px-6 py-4">{new Date(lead.createdAt!).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-widest ${lead.status === 'novo' ? 'bg-gold/20 text-gold' : 'bg-green-900/20 text-green-500'}`}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
