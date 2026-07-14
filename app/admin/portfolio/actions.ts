'use server'

import { db } from '@/lib/db'
import { portfolioItems } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPortfolioItem(formData: FormData): Promise<void> {
  const title = formData.get('title') as string
  const artist = formData.get('artist') as string | null
  const genreTag = formData.get('genreTag') as string | null
  const videoUrl = formData.get('videoUrl') as string | null
  const thumbnailUrl = formData.get('thumbnailUrl') as string | null
  const isFeatured = formData.get('isFeatured') === 'on'

  if (!title) throw new Error('Título é obrigatório.')

  await db.insert(portfolioItems).values({
    title,
    artist: artist || null,
    genreTag: genreTag || null,
    videoUrl: videoUrl || null,
    thumbnailUrl: thumbnailUrl || null,
    isFeatured,
  })

  revalidatePath('/admin/portfolio')
  revalidatePath('/')
  redirect('/admin/portfolio')
}

export async function deletePortfolioItem(id: string): Promise<void> {
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id))
  revalidatePath('/admin/portfolio')
  revalidatePath('/')
}
