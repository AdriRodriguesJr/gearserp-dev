import { useState, useEffect, useCallback } from 'react';
import osApi from '../api/osApi';

export const useOS = () => {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tipoAtivo, setTipoAtivo] = useState('orcamento');
  const [clientes, setClientes] = useState([]);
  const [servicos, setServicos] = useState([]);

  const showError = useCallback((message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  }, []);

  const fetchItens = useCallback(async () => {
    try {
      setLoading(true);
      let data;
      
      switch(tipoAtivo) {
        case 'orcamento':
          data = await osApi.fetchOrdens('orcamento');
          data = Array.isArray(data) ? data.filter(item => 
            item.status === 'orcamento em andamento'
          ) : [];
          break;
          
        case 'os':
          data = await osApi.fetchOrdens('os');
          data = Array.isArray(data) ? data.filter(item => 
            ['pendente', 'em andamento'].includes(item.status)
          ) : [];
          break;
          
        case 'finalizado':
          data = await osApi.fetchOrdens('finalizado');
          data = Array.isArray(data) ? data.filter(item => 
            ['concluida', 'orcamento reprovado'].includes(item.status)
          ) : [];
          break;
          
        default:
          data = [];
      }
      
      setItens(data);
    } catch (error) {
      showError('Erro ao carregar ordens de serviço: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, [tipoAtivo, showError]); // Removido loading das dependências

  const searchItens = useCallback(async (termo) => {
    try {
      setLoading(true);
      const data = await osApi.searchOrdens(termo, tipoAtivo);
      setItens(Array.isArray(data) ? data : []);
    } catch (error) {
      showError('Erro na busca: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, [tipoAtivo, showError]); // Removido loading das dependências

  const fetchClientes = useCallback(async () => {
    try {
      const data = await osApi.fetchClientes();
      setClientes(Array.isArray(data) ? data : []);
    } catch (error) {
      showError('Erro ao carregar clientes: ' + error.message);
    }
  }, [showError]);

  const fetchServicos = useCallback(async () => {
    try {
      const data = await osApi.fetchServicos();
      setServicos(Array.isArray(data) ? data : []);
    } catch (error) {
      showError('Erro ao carregar serviços: ' + error.message);
    }
  }, [showError]);

  const updateStatus = useCallback(async (id, status, data) => {
    try {
      setLoading(true);
      await osApi.updateStatus(id, status, data);
      await fetchItens();
      return { success: true, message: 'Status atualizado com sucesso!' };
    } catch (error) {
      showError('Erro ao atualizar status: ' + error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, [fetchItens, showError]);

  // Load clientes and servicos only once
  useEffect(() => {
    fetchClientes();
    fetchServicos();
  }, []); // Empty dependency array

  // Load itens when tipoAtivo changes
  useEffect(() => {
    if (!loading) {
      fetchItens();
    }
  }, [tipoAtivo]); // Only depend on tipoAtivo

  return {
    itens,
    loading,
    error,
    tipoAtivo,
    setTipoAtivo,
    clientes,
    servicos,
    searchItens,
    updateStatus,
    fetchItens
  };
};

export default useOS;