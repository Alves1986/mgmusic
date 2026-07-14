'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { db } from '@/lib/db'
import { leads } from '@/lib/db/schema'
import { z } from 'zod'

// ─── Admin Authentication ─────────────────────────────────────────────────────

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    await signIn('credentials', Object.fromEntries(formData))
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Email ou senha inválidos.'
        default:
          return 'Algo deu errado. Tente novamente.'
      }
    }
    throw error
  }
}

// ─── Lead capture ─────────────────────────────────────────────────────────────

const leadSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório.'),
  email: z.string().email('Email inválido.'),
  message: z.string().optional(),
})

export async function saveLead(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const parsed = leadSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message }
  }

  try {
    await db.insert(leads).values({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message ?? null,
    })
    return { success: true }
  } catch (error) {
    console.error('[saveLead] DB error:', error)
    return { success: false, error: 'Falha ao salvar mensagem. Tente novamente.' }
  }
}
