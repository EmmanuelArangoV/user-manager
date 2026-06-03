'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { ShieldCheck, User as UserIcon } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-neo-beige font-sans">
      <Header user={user} />

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-8 uppercase tracking-tighter bg-neo-teal inline-block px-4 py-2 border-4 border-black shadow-[6px_6px_0_0_#000]">
          Dashboard
        </h1>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-0">
          <div className="p-4 sm:p-8 flex flex-col md:flex-row items-stretch md:items-start gap-6 sm:gap-8">
            <div className={`p-4 sm:p-6 border-4 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center self-center md:self-start ${user.role === 'admin' ? 'bg-neo-magenta text-white' : 'bg-neo-yellow text-black'}`}>
              {user.role === 'admin' ? <ShieldCheck size={48} className="sm:w-16 sm:h-16" /> : <UserIcon size={48} className="sm:w-16 sm:h-16" />}
            </div>
            <div className="flex-1 w-full">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-2 uppercase text-center md:text-left">¡Bienvenido, {user.nombre}!</h2>
              <p className="text-base sm:text-lg font-bold text-gray-700 mb-6 uppercase text-center md:text-left">Esta es la información básica de tu cuenta actual.</p>

              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border-2 border-black p-4 bg-gray-50 shadow-[4px_4px_0_0_#000]">
                  <dt className="text-sm font-extrabold text-gray-500 uppercase mb-1">Email</dt>
                  <dd className="text-lg font-bold text-black break-all">{user.email}</dd>
                </div>
                <div className="border-2 border-black p-4 bg-gray-50 shadow-[4px_4px_0_0_#000]">
                  <dt className="text-sm font-extrabold text-gray-500 uppercase mb-1">Cédula (CC)</dt>
                  <dd className="text-lg font-bold text-black">{user.cc}</dd>
                </div>
                <div className="border-2 border-black p-4 bg-gray-50 shadow-[4px_4px_0_0_#000] sm:col-span-2">
                  <dt className="text-sm font-extrabold text-gray-500 uppercase mb-1">Rol</dt>
                  <dd className="text-xl font-black text-black uppercase tracking-widest">{user.role}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
