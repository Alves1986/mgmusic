import { db } from '@/lib/db';
import { siteSettings } from '@/lib/db/schema';

export default async function SettingsAdmin() {
  const settings = await db.select().from(siteSettings);
  
  // Transform settings array into a map for easy lookup
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value || '';
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 font-heading text-3xl font-bold text-silver-light">Configurações do Site</h1>
      
      <div className="rounded-xl border border-brand-border/30 bg-[#121212] p-8">
        <h2 className="mb-6 font-heading text-xl text-gold">Textos da Home (Estatísticas)</h2>
        <form className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-silver">Ouvintes Impactados</label>
            <input name="stat_listeners" defaultValue={settingsMap['stat_listeners'] || '100M+'} className="w-full rounded-md border border-brand-border/30 bg-[#1a1a1a] p-3 text-silver-light focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-silver">Projetos Realizados</label>
            <input name="stat_projects" defaultValue={settingsMap['stat_projects'] || '300+'} className="w-full rounded-md border border-brand-border/30 bg-[#1a1a1a] p-3 text-silver-light focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-silver">Artistas de Referência</label>
            <input name="stat_artists" defaultValue={settingsMap['stat_artists'] || '50+'} className="w-full rounded-md border border-brand-border/30 bg-[#1a1a1a] p-3 text-silver-light focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold" />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-md bg-gold px-8 py-3 font-heading font-bold text-black hover:bg-gold-light"
          >
            Salvar Configurações
          </button>
        </form>
      </div>
    </div>
  );
}
