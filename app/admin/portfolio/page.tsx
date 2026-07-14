import { db } from '@/lib/db';
import { portfolioItems } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';

export default async function PortfolioAdmin() {
  const items = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-silver-light">Gerenciar Portfólio</h1>
        <Link
          href="/admin/portfolio/new"
          className="rounded-md bg-gold px-4 py-2 font-heading font-bold uppercase tracking-wide text-black transition-all hover:bg-gold-light"
        >
          Adicionar Novo
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-brand-border/30 bg-[#121212]">
        <table className="w-full text-left text-sm text-silver">
          <thead className="bg-[#1a1a1a] text-xs uppercase text-silver">
            <tr>
              <th className="px-6 py-4">Título</th>
              <th className="px-6 py-4">Artista</th>
              <th className="px-6 py-4">Tag</th>
              <th className="px-6 py-4">Destaque</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">Nenhum item no portfólio.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-brand-border/30 hover:bg-[#1a1a1a]/50">
                  <td className="px-6 py-4 font-medium text-silver-light">{item.title}</td>
                  <td className="px-6 py-4">{item.artist || '-'}</td>
                  <td className="px-6 py-4">
                    <span className="rounded bg-black/60 px-2 py-1 text-xs font-semibold uppercase tracking-widest text-gold border border-gold/20">
                      {item.genreTag}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.isFeatured ? 'Sim' : 'Não'}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-500 hover:text-red-400">Excluir</button>
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
