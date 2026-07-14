'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { AlertCircle } from 'lucide-react';

export default function LoginForm() {
  const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="rounded-xl border border-brand-border/30 bg-[#121212] p-8 shadow-2xl backdrop-blur-md">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-heading text-xs uppercase tracking-widest text-silver"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="admin@mgmusic.com"
              required
              className="w-full rounded-md border border-brand-border/30 bg-[#1a1a1a] px-4 py-3 font-sans text-silver-light transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-heading text-xs uppercase tracking-widest text-silver"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              required
              className="w-full rounded-md border border-brand-border/30 bg-[#1a1a1a] px-4 py-3 font-sans text-silver-light transition-all focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>
        
        {errorMessage && (
          <div className="mt-4 flex items-center space-x-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" />
            <p>{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          aria-disabled={isPending}
          className="bg-gold-gradient mt-8 w-full rounded-md px-8 py-3 font-heading font-bold uppercase tracking-wide text-black transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] disabled:opacity-50"
        >
          {isPending ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
    </form>
  );
}
