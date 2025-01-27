// clienteComponents/hooks/useCliente.js
import { useState, useCallback } from 'react';
import { getClientes, buscarClientes, excluirCliente } from '../api/clienteApi';

export const useCliente = () => {
  // Lista de clientes carregados
  const [clientes, setClientes] = useState([]);
  // Indica se está carregando dados
  const [loading, setLoading] = useState(false);
  // Mensagem de erro, se houver
  const [error, setError] = useState(null);

  // Busca todos os clientes do servidor
  const fetchClientes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getClientes();
      if (Array.isArray(data)) {
        setClientes(data);
      } else {
        setClientes([]);
      }
      setError(null);
    } catch (error) {
      setError(error.message);
      setClientes([]);
    }
    setLoading(false);
  }, []);

  // Busca clientes com base no termo de pesquisa
  const handleBuscarClientes = useCallback(async (termo) => {
    setLoading(true);
    try {
      const data = await buscarClientes(termo);
      if (Array.isArray(data)) {
        setClientes(data);
      } else {
        setClientes([]);
      }
      setError(null);
    } catch (error) {
      setError(error.message);
      setClientes([]);
    }
    setLoading(false);
  }, []);

  // Exclui um cliente e atualiza a lista
  const handleExcluirCliente = useCallback(async (id) => {
    try {
      await excluirCliente(id);
      await fetchClientes();
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [fetchClientes]);

  return {
    clientes,
    loading,
    error,
    fetchClientes,
    buscarClientes: handleBuscarClientes,
    excluirCliente: handleExcluirCliente
  };
};