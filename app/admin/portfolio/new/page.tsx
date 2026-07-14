import { createPortfolioItem } from '../actions'

export default function NewPortfolioItem() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 font-heading text-3xl font-bold text-silver-light">
        Novo Item de Portfólio
      </h1>

      <div className="rounded-xl border border-brand-border/30 bg-[#121212] p-8">
        <form action={createPortfolioItem} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-silver"
            >
              Título do Projeto *
            </label>
            <input
              id="title"
              name="title"
              required
              className="w-full rounded-md border border-brand-border/30 bg-[#1a1a1a] p-3 text-silver-light transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="artist"
              className="mb-2 block text-sm font-semibold text-silver"
            >
              Artista (Opcional)
            </label>
            <input
              id="artist"
              name="artist"
              className="w-full rounded-md border border-brand-border/30 bg-[#1a1a1a] p-3 text-silver-light transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="genreTag"
              className="mb-2 block text-sm font-semibold text-silver"
            >
              Tag de Categoria (ex: GOSPEL, PODCAST)
            </label>
            <input
              id="genreTag"
              name="genreTag"
              className="w-full rounded-md border border-brand-border/30 bg-[#1a1a1a] p-3 text-silver-light transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="videoUrl"
              className="mb-2 block text-sm font-semibold text-silver"
            >
              URL do YouTube / Streaming (Opcional)
            </label>
            <input
              id="videoUrl"
              name="videoUrl"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-md border border-brand-border/30 bg-[#1a1a1a] p-3 text-silver-light transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="thumbnailUrl"
              className="mb-2 block text-sm font-semibold text-silver"
            >
              URL da Imagem de Capa (Opcional)
            </label>
            <input
              id="thumbnailUrl"
              name="thumbnailUrl"
              type="url"
              placeholder="https://..."
              className="w-full rounded-md border border-brand-border/30 bg-[#1a1a1a] p-3 text-silver-light transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="isFeatured"
              name="isFeatured"
              type="checkbox"
              className="h-4 w-4 rounded border-brand-border bg-[#1a1a1a] accent-yellow-500"
            />
            <label htmlFor="isFeatured" className="text-sm font-semibold text-silver">
              Destaque na Home?
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-[#B8860B] to-[#FFD700] px-8 py-3 font-heading font-bold text-black transition-all hover:brightness-110"
          >
            Salvar Projeto
          </button>
        </form>
      </div>
    </div>
  )
}
