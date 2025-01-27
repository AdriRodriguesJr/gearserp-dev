// hooks/useUsuarios.js
import { useState } from 'react';
import { usuariosApi } from '../api/usuariosApi';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await usuariosApi.listar();
      setUsuarios(data);
    } catch (error) {
      setError('Erro ao carregar usuários');
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  const buscarUsuarios = async (termo) => {
    try {
      setLoading(true);
      setError(null);
      const data = termo.trim()
        ? await usuariosApi.buscar(termo)
        : await usuariosApi.listar();
      setUsuarios(data);
    } catch (error) {
      setError('Erro ao buscar usuários');
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    usuarios,
    loading,
    error,
    fetchUsuarios,
    buscarUsuarios
  };
};