export const getUsers = async () => {
  const res = await fetch('/api/users');
  if (!res.ok) {
    throw new Error('Error obteniendo usuarios');
  }
  return res.json();
};

export const createUser = async (userData: any) => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error creando usuario');
  }
  return res.json();
};

export const updateUser = async (id: string, userData: any) => {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error actualizando usuario');
  }
  return res.json();
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Error eliminando usuario');
  }
  return res.json();
};

