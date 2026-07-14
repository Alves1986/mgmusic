export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import { leads, portfolioItems } from '@/lib/db/schema'
import { desc, count } from 'drizzle-orm'
import Link from 'next/link'
import { signOut } from '@/auth'

export default async function AdminDashboard() {
  let recentLeads: typeof leads.$inferSelect[] = []
  let totalLeadsCount = 0
  let totalPortfolioCount = 0

  try {
    const [leadsData, leadsCount, portfolioCount] = await Promise.all([
      db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5),
      db.select({ value: count() }).from(leads),
      db.select({ value: count() }).from(portfolioItems),
    ])
    recentLeads = leadsData
    totalLeadsCount = leadsCount[0]?.value ?? 0
    totalPortfolioCount = portfolioCount[0]?.value ?? 0
  } catch {
    // DB not reachable
  }

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-silver-light">
          Painel de Controle
        </h1>
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/admin/login' })
          }}
        >
          <button
            type="submit"
            className="rounded-md border border-brand-border/30 px-4 py-2 text-sm font-semibold text-silver transition-colors hover:border-gold hover:text-gold"
          >
            Sair
          </button>
        </form>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-brand-border/30 bg-[#121212] p-6">
          <h2 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-silver">
            Total de Leads
          </h2>
          <p className="font-heading text-4xl text-gold">{totalLeadsCount}</p>
        </div>
        <div className="rounded-xl border border-brand-border/30 bg-[#121212] p-6">
          <h2 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-silver">
            Itens no Portfólio
          </h2>
          <p className="font-heading text-4xl text-gold">{totalPortfolioCount}</p>
        </div>
        <div className="rounded-xl border border-brand-border/30 bg-[#121212] p-6">
          <h2 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wider text-silver">
            Ações Rápidas
          </h2>
          <div className="flex flex-col gap-3 pt-1">
            <Link
              href="/admin/portfolio/new"
              className="text-sm text-silver transition-colors hover:text-gold"
            >
              + Adicionar ao Portfólio
            </Link>
            <Link
              href="/admin/settings"
              className="text-sm text-silver transition-colors hover:text-gold"
            >
              ⚙ Editar Textos da Home
            </Link>
            <Link
              href="/admin/leads"
              className="text-sm text-silver transition-colors hover:text-gold"
            >
              ✉ Ver Todos os Leads
            </Link>
          </div>
        </div>
      </div>

      {/* Recent leads table */}
      <h2 className="mb-4 mt-12 font-heading text-xl font-bold text-silver-light">
        Leads Recentes
      </h2>
      <div className="overflow-hidden rounded-xl border border-brand-border/30 bg-[#121212]">
        <table className="w-full text-left text-sm text-silver">
          <thead className="bg-[#1a1a1a] text-xs uppercase tracking-wider text-silver">
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
                <td colSpan={4} className="px-6 py-8 text-center text-silver/60">
                  Nenhum lead encontrado.
                </td>
              </tr>
            ) : (
              recentLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-brand-border/20 transition-colors hover:bg-[#1a1a1a]/50"
                >
                  <td className="px-6 py-4 font-medium text-silver-light">{lead.name}</td>
                  <td className="px-6 py-4">{lead.email}</td>
                  <td className="px-6 py-4">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('pt-BR') : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-widest ${
                        lead.status === 'novo'
                          ? 'bg-gold/20 text-gold'
                          : 'bg-green-900/20 text-green-500'
                      }`}
                    >
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
  )
}
