'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import UserCard from '@/components/UserCard';
import UserForm from '@/components/UserForm';
import { useUsers } from '@/hooks/useUsers';
import { UserPlus, Users as UsersIcon } from 'lucide-react';

export default function AdminUsersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const { 
    users, 
    loading, 
    loadUsers, 
    handleCreate, 
    handleUpdate, 
    handleDelete: performDelete 
  } = useUsers();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  useEffect(() => {
    const userDataStr = localStorage.getItem('user');
    if (!userDataStr) {
      router.push('/login');
      return;
    }
    
    const currentUser = JSON.parse(userDataStr);
    if (currentUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    
    setUser(currentUser);
    loadUsers();
  }, [router, loadUsers]);

  const handleCreateNew = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const handleEdit = (id: string) => {
    const usr = users.find(u => u._id === id);
    if (usr) {
      setEditingUser(usr);
      setIsFormOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await performDelete(id);
    } catch (error) {
      alert('Error eliminando usuario');
    }
  };

  const handleSaveForm = async (formData: any) => {
    if (editingUser) {
      await handleUpdate(editingUser._id, formData);
    } else {
      await handleCreate(formData);
    }
    setIsFormOpen(false);
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-neo-beige pb-12 font-sans">
      <Header user={user} />

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-10 pb-6 border-b-4 border-black">
          <div className="w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black flex items-center gap-3 sm:gap-4 uppercase tracking-tighter">
              <div className="bg-neo-magenta p-2 border-4 border-black shadow-[4px_4px_0_0_#000] shrink-0">
                <UsersIcon className="text-white w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <span>Gestión de usuarios</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base font-bold text-gray-800 uppercase max-w-2xl bg-white p-3 border-2 border-black block sm:inline-block shadow-[2px_2px_0_0_#000] w-full sm:w-auto">
              Administra los usuarios, asigna roles y gestiona accesos.
            </p>
          </div>
          <div className="mt-6 sm:mt-0 w-full sm:w-auto shrink-0">
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 justify-center border-4 border-black bg-neo-yellow px-6 py-3 text-lg font-black text-black shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus:outline-none w-full sm:w-auto transition-all uppercase cursor-pointer"
            >
              <UserPlus size={24} strokeWidth={3} />
              CREAR USUARIO
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-none h-16 w-16 border-8 border-black border-t-neo-teal"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-24 bg-white border-4 border-black shadow-[8px_8px_0_0_#000]">
            <div className="mx-auto h-20 w-20 bg-neo-magenta border-4 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center mb-6">
              <UsersIcon className="text-white" size={40} />
            </div>
            <h3 className="text-2xl font-extrabold text-black uppercase mb-2">No hay usuarios registrados</h3>
            <p className="mt-1 text-lg font-bold text-gray-600 uppercase">¡Crea el primer usuario para empezar!</p>
            <div className="mt-8">
              <button
                onClick={handleCreateNew}
                className="inline-flex items-center gap-2 px-6 py-3 border-4 border-black shadow-[4px_4px_0_0_#000] text-lg font-black bg-neo-yellow text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase cursor-pointer"
              >
                <UserPlus size={20} strokeWidth={3} />
                NUEVO USUARIO
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((u) => (
              <UserCard
                key={u._id}
                id={u._id}
                nombre={u.nombre}
                cc={u.cc}
                email={u.email}
                role={u.role}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {isFormOpen && (
          <UserForm
            initialData={editingUser}
            onClose={() => setIsFormOpen(false)}
            onSave={handleSaveForm}
          />
        )}
      </main>
    </div>
  );
}
