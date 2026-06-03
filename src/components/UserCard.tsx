import { Pencil, Trash2, Mail, Hash, ShieldCheck, User } from 'lucide-react';

interface UserCardProps {
  id: string;
  nombre: string;
  cc: string;
  email: string;
  role: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function UserCard({ id, nombre, cc, email, role, onEdit, onDelete }: UserCardProps) {
  const isAdmin = role === 'admin';

  return (
    <div className={`p-6 border-4 border-black flex flex-col justify-between transition-transform duration-300 shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none bg-white`}>
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 border-4 border-black shadow-[4px_4px_0_0_#000] ${isAdmin ? 'bg-neo-magenta text-white' : 'bg-neo-yellow text-black'}`}>
              {isAdmin ? <ShieldCheck size={28} /> : <User size={28} />}
            </div>
            <div>
              <h3 className="font-extrabold text-black text-xl uppercase tracking-tight leading-tight">{nombre}</h3>
              <span className={`inline-block mt-2 border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[2px_2px_0_0_#000] ${
                isAdmin ? 'bg-black text-white' : 'bg-white text-black'
              }`}>
                {role}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-4 text-base font-bold text-gray-800 uppercase">
          <div className="flex items-center gap-3 bg-gray-50 border-2 border-black p-2 shadow-[2px_2px_0_0_#000]">
            <Mail size={18} className="text-black" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border-2 border-black p-2 shadow-[2px_2px_0_0_#000]">
            <Hash size={18} className="text-black" />
            <span>{cc}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t-4 border-black flex gap-4 justify-end">
        <button
          onClick={() => onEdit(id)}
          className="flex items-center justify-center p-3 border-4 border-black text-black bg-neo-teal shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
          title="Editar usuario"
        >
          <Pencil size={20} />
        </button>
        <button
          onClick={() => {
            if (window.confirm(`¿Estás seguro de que deseas eliminar a ${nombre}?`)) {
              onDelete(id);
            }
          }}
          className="flex items-center justify-center p-3 border-4 border-black text-black bg-neo-yellow shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
          title="Eliminar usuario"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
