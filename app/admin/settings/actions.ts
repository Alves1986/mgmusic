'use server'

import { db } from '@/lib/db'
import { siteSettings } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function updateSettings(formData: FormData): Promise<void> {
  const keys = ['stat_listeners', 'stat_projects', 'stat_artists'] as const

  for (const key of keys) {
    const value = formData.get(key) as string | null
    if (value !== null) {
      await db
        .insert(siteSettings)
        .values({ key, value })
        .onConflictDoUpdate({ target: siteSettings.key, set: { value } })
    }
  }

  revalidatePath('/')
}
