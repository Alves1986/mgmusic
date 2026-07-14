export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export default async function LeadsAdmin() {
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 font-heading text-3xl font-bold text-silver-light">Gerenciar Leads</h1>

      <div className="overflow-hidden rounded-xl border border-brand-border/30 bg-[#121212]">
        <table className="w-full text-left text-sm text-silver">
          <thead className="bg-[#1a1a1a] text-xs uppercase text-silver">
            <tr>
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Mensagem</th>
              <th className="px-6 py-4">Data</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {allLeads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">Nenhum lead encontrado.</td>
              </tr>
            ) : (
              allLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-brand-border/30 hover:bg-[#1a1a1a]/50">
                  <td className="px-6 py-4 font-medium text-silver-light">{lead.name}</td>
                  <td className="px-6 py-4">{lead.email}</td>
                  <td className="px-6 py-4 max-w-xs truncate" title={lead.message || ''}>{lead.message || '-'}</td>
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
