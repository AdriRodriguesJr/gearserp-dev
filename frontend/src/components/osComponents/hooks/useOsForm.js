import { useState, useCallback } from 'react';
import osApi from '../api/osApi';

const initialFormData = {
  cliente_id: '',
  veiculo_tipo: '',
  servico_id: '',
  concessionaria: '',
  modelo: '',
  ano: '',
  descricao: '',
  valor_total: '',
  status: 'orcamento em andamento',
  previsao_entrega: ''
};

export const useOSForm = (onSuccess) => {
  const [showModal, setShowModal] = useState(false);
  const [showPecasModal, setShowPecasModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [pecasSelecionadas, setPecasSelecionadas] = useState([]);
  const [pecasDisponiveis, setPecasDisponiveis] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [loading, setLoading] = useState(false);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setPecasSelecionadas([]);
    setEditingItem(null);
    setQuantidades({});
  }, []);

  const handleClose = useCallback(() => {
    setShowModal(false);
    resetForm();
  }, [resetForm]);

  const handleShow = useCallback((item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
      loadPecasOS(item.id);
    }
    setShowModal(true);
  }, []);

  const handleShowPecasModal = useCallback(async () => {
    try {
      const pecas = await osApi.fetchPecasDisponiveis();
      setPecasDisponiveis(pecas);
      setShowPecasModal(true);
    } catch (error) {
      console.error('Erro ao carregar peças disponíveis:', error);
    }
  }, []);

  const handleClosePecasModal = useCallback(() => {
    setShowPecasModal(false);
    setQuantidades({});
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleQuantidadeChange = useCallback((pecaId, quantidade) => {
    setQuantidades(prev => ({
      ...prev,
      [pecaId]: quantidade
    }));
  }, []);

  const loadPecasOS = async (osId) => {
    try {
      const pecas = await osApi.fetchPecasOS(osId);
      setPecasSelecionadas(Array.isArray(pecas) ? pecas : []);
    } catch (error) {
      console.error('Erro ao carregar peças:', error);
    }
  };

  const handleAddPeca = useCallback((peca) => {
    const quantidade = quantidades[peca.id] || 1;
    const novaPeca = {
      ...peca,
      quantidade_usada: quantidade,
      valor_total: peca.preco * quantidade
    };

    setPecasSelecionadas(prev => {
      // Verifica se a peça já existe
      const pecaExistente = prev.find(p => p.id === peca.id);
      if (pecaExistente) {
        return prev.map(p => 
          p.id === peca.id 
            ? { ...p, quantidade_usada: quantidade, valor_total: peca.preco * quantidade }
            : p
        );
      }
      return [...prev, novaPeca];
    });

    setFormData(prev => ({
      ...prev,
      valor_total: Number(prev.valor_total || 0) + (peca.preco * quantidade)
    }));
  }, [quantidades]);

  const handleRemovePeca = useCallback((pecaId) => {
    setPecasSelecionadas(prev => {
      const peca = prev.find(p => p.id === pecaId);
      if (!peca) return prev;
      
      setFormData(formPrev => ({
        ...formPrev,
        valor_total: Number(formPrev.valor_total || 0) - (peca.preco * peca.quantidade_usada)
      }));
      
      return prev.filter(p => p.id !== pecaId);
    });
  }, []);

  const handleSalvarPecas = useCallback(() => {
    setShowPecasModal(false);
    setQuantidades({});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dadosParaEnviar = {
        ...formData,
        pecas: pecasSelecionadas
      };

      if (editingItem) {
        await osApi.updateOrdem(editingItem.id, dadosParaEnviar);
      } else {
        await osApi.createOrdem(dadosParaEnviar);
      }

      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    showModal,
    showPecasModal,
    editingItem,
    formData,
    pecasSelecionadas,
    pecasDisponiveis,
    quantidades,
    loading,
    handleShow,
    handleClose,
    handleShowPecasModal,
    handleClosePecasModal,
    handleInputChange,
    handleQuantidadeChange,
    handleAddPeca,
    handleRemovePeca,
    handleSalvarPecas,
    handleSubmit
  };
};

export default useOSForm;