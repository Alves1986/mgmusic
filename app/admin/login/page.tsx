import { Suspense } from 'react';
import LoginForm from '@/components/admin/login-form';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden">
      {/* Background with gold particles vibe */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-black to-black opacity-80" />
      <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-bold text-silver-light">
            Acesso Administrativo
          </h1>
          <p className="mt-2 text-sm text-silver">
            Autentique-se para gerenciar a MG Music Studio.
          </p>
        </div>
        
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
