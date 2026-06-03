'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import { LogIn, Key, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      router.push('/dashboard');
    } catch (err: any) {
      if (err.message.includes('<!DOCTYPE html>') || err.message.includes('<html')) {
        setError('Error de conexión con el servidor.');
      } else {
        setError(err.message || 'Email o contraseña incorrectos.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neo-beige flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-black">
          <LogIn size={56} className="border-4 border-black p-2 bg-neo-yellow shadow-[4px_4px_0_0_#000]" />
        </div>
        <h2 className="mt-6 text-center text-3xl sm:text-4xl font-extrabold text-black uppercase tracking-tight">
          Iniciar sesión
        </h2>
        <p className="mt-2 text-center text-lg font-bold text-gray-800 uppercase">
          Gestor de usuarios
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border-4 border-black shadow-[8px_8px_0_0_#000] sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-base font-bold text-black uppercase tracking-wide">
                Correo electrónico
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-black" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 py-3 sm:text-base border-4 border-black bg-white focus:outline-none focus:bg-neo-yellow/10 transition-colors font-bold"
                  placeholder="ADMIN@EXAMPLE.COM"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-base font-bold text-black uppercase tracking-wide">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key size={20} className="text-black" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 py-3 sm:text-base border-4 border-black bg-white focus:outline-none focus:bg-neo-yellow/10 transition-colors font-bold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 border-4 border-black bg-neo-magenta text-white font-bold uppercase text-sm shadow-[4px_4px_0_0_#000]">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border-4 border-black shadow-[4px_4px_0_0_#000] text-lg font-bold text-black bg-neo-teal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_0_#000] cursor-pointer"
              >
                {loading ? 'INGRESANDO...' : 'ENTRAR'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
