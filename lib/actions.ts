'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciais inválidas.';
        default:
          return 'Algo deu errado.';
      }
    }
    throw error;
  }
}

export async function saveLead(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email) {
    throw new Error('Nome e e-mail são obrigatórios.');
  }

  try {
    await db.insert(leads).values({
      name,
      email,
      message,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to save lead:', error);
    return { success: false, error: 'Falha ao enviar mensagem.' };
  }
}
