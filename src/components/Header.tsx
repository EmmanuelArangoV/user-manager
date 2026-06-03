'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, Users, UserCircle, Menu, X } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  user: any;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header className="bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center bg-black text-white px-3 py-1 font-bold text-2xl tracking-tighter cursor-pointer">
              UM
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className="text-black hover:bg-neo-yellow px-3 py-2 border-2 border-transparent hover:border-black font-bold uppercase transition-colors flex items-center cursor-pointer"
              >
                <LayoutDashboard size={20} className="mr-2" />
                Dashboard
              </Link>
              {user?.role === 'admin' && (
                <Link
                  href="/admin/users"
                  className="text-black hover:bg-neo-yellow px-3 py-2 border-2 border-transparent hover:border-black font-bold uppercase transition-colors flex items-center cursor-pointer"
                >
                  <Users size={20} className="mr-2" />
                  Usuarios
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 text-black bg-white px-3 py-2 border-4 border-black shadow-[4px_4px_0_0_#000]">
              <UserCircle size={20} />
              <span className="font-bold uppercase">{user?.nombre}</span>
              <span className="mx-1">|</span>
              <span className="uppercase text-sm font-extrabold bg-neo-magenta text-white px-2 py-0.5 border-2 border-black">
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-black font-bold uppercase bg-neo-yellow px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
            >
              <LogOut size={18} className="mr-2" />
              SALIR
            </button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black bg-neo-yellow border-4 border-black p-2 shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
            >
              {isMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden border-t-4 border-black bg-white py-4 px-4 space-y-4 flex flex-col">
          <Link
            href="/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="text-black hover:bg-neo-yellow px-3 py-2 border-2 border-transparent hover:border-black font-bold uppercase transition-colors flex items-center cursor-pointer"
          >
            <LayoutDashboard size={20} className="mr-2" />
            Dashboard
          </Link>
          {user?.role === 'admin' && (
            <Link
              href="/admin/users"
              onClick={() => setIsMenuOpen(false)}
              className="text-black hover:bg-neo-yellow px-3 py-2 border-2 border-transparent hover:border-black font-bold uppercase transition-colors flex items-center cursor-pointer"
            >
              <Users size={20} className="mr-2" />
              Usuarios
            </Link>
          )}
          <div className="border-t-2 border-black my-2"></div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2 text-black bg-white px-3 py-2 border-4 border-black shadow-[4px_4px_0_0_#000]">
              <div className="flex items-center gap-2">
                <UserCircle size={20} />
                <span className="font-bold uppercase truncate max-w-[150px]">{user?.nombre}</span>
              </div>
              <span className="uppercase text-sm font-extrabold bg-neo-magenta text-white px-2 py-0.5 border-2 border-black">
                {user?.role}
              </span>
            </div>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center justify-center text-black font-bold uppercase bg-neo-yellow px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
            >
              <LogOut size={18} className="mr-2" />
              SALIR
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
