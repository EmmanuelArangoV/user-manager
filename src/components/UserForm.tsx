'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface UserFormProps {
  initialData?: any;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
}

export default function UserForm({ initialData, onSave, onClose }: UserFormProps) {
  const isEditing = !!initialData;
  const [formData, setFormData] = useState({
    nombre: '',
    cc: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre,
        cc: initialData.cc,
        email: initialData.email,
        password: '',
        role: initialData.role,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditing && !formData.password) {
        const { password, ...dataWithoutPassword } = formData;
        await onSave(dataWithoutPassword);
      } else {
        await onSave(formData);
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">

        <div className="fixed inset-0 bg-neo-beige bg-opacity-90 transition-opacity backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block relative z-10 align-middle bg-white border-4 border-black text-left overflow-hidden shadow-[12px_12px_0_0_#000] transform transition-all my-8 w-full max-w-[calc(100%-2rem)] sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-8 sm:pb-6">
            <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
              <h3 className="text-3xl font-extrabold text-black uppercase tracking-tight" id="modal-title">
                {isEditing ? 'EDITAR USUARIO' : 'CREAR USUARIO'}
              </h3>
              <button onClick={onClose} className="text-black bg-neo-yellow border-4 border-black p-1 shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                <X size={28} strokeWidth={3} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="p-3 border-4 border-black bg-neo-magenta text-white font-bold uppercase shadow-[4px_4px_0_0_#000] text-sm">{error}</div>}

              <div>
                <label className="block text-base font-extrabold text-black uppercase tracking-wide">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mt-2 block w-full border-4 border-black bg-white focus:outline-none focus:bg-neo-yellow/10 sm:text-base font-bold p-3 transition-colors uppercase"
                />
              </div>

              <div>
                <label className="block text-base font-extrabold text-black uppercase tracking-wide">Cédula (CC)</label>
                <input
                  type="text"
                  name="cc"
                  required
                  value={formData.cc}
                  onChange={handleChange}
                  className="mt-2 block w-full border-4 border-black bg-white focus:outline-none focus:bg-neo-yellow/10 sm:text-base font-bold p-3 transition-colors"
                />
              </div>

              <div>
                <label className="block text-base font-extrabold text-black uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 block w-full border-4 border-black bg-white focus:outline-none focus:bg-neo-yellow/10 sm:text-base font-bold p-3 transition-colors uppercase"
                />
              </div>

              <div>
                <label className="block text-base font-extrabold text-black uppercase tracking-wide">
                  Contraseña {isEditing && <span className="bg-black text-white px-2 py-0.5 ml-2 text-xs align-middle">OPCIONAL</span>}
                </label>
                <input
                  type="password"
                  name="password"
                  required={!isEditing}
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-2 block w-full border-4 border-black bg-white focus:outline-none focus:bg-neo-yellow/10 sm:text-base font-bold p-3 transition-colors"
                />
              </div>

              <div>
                <label className="block text-base font-extrabold text-black uppercase tracking-wide">Rol</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-2 block w-full border-4 border-black bg-white focus:outline-none focus:bg-neo-yellow/10 sm:text-base font-bold p-3 transition-colors uppercase appearance-none"
                >
                  <option value="user" className="font-bold">USER</option>
                  <option value="admin" className="font-bold">ADMIN</option>
                </select>
              </div>

              <div className="mt-8 sm:mt-10 sm:flex sm:flex-row-reverse gap-4 pt-6 border-t-4 border-black">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex justify-center border-4 border-black shadow-[4px_4px_0_0_#000] px-6 py-3 bg-neo-teal text-lg font-black text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus:outline-none sm:w-auto transition-all uppercase disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_0_#000] cursor-pointer"
                >
                  {loading ? 'GUARDANDO...' : 'GUARDAR'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 sm:mt-0 w-full inline-flex justify-center border-4 border-black shadow-[4px_4px_0_0_#000] px-6 py-3 bg-white text-lg font-black text-black hover:bg-gray-100 hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus:outline-none sm:w-auto transition-all uppercase cursor-pointer"
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
