'use client';

import { useState, useCallback } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '@/services/userService';

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = async (formData: any) => {
    await createUser(formData);
    await loadUsers();
  };

  const handleUpdate = async (id: string, formData: any) => {
    await updateUser(id, formData);
    await loadUsers();
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    await loadUsers();
  };

  return {
    users,
    loading,
    loadUsers,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
