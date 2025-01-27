import { useState, useCallback } from 'react';
import { criarCliente, atualizarCliente, buscarCep } from '../api/clienteApi';

const initialFormData = {
  nome: '',
  email: '',
  telefone: '',
  endereco: '',
  numero: '',
  cidade: '',
  estado: '',
  cep: '',
  cpf: '',
  genero: '',
  tipoPessoa: '',
  status: 'Ativo'
};

export const useClienteForm = () => {  

    const [formData, setFormData] = useState(initialFormData);    // Estado para dados do formulário
    const [loading, setLoading] = useState(false);                // Estado para controlar loading durante operações
    const [error, setError] = useState(null);                     // Estado para armazenar erros do formulário

    const handleInputChange = useCallback((name, value) => {      // Atualiza um campo específico do formulário
        setFormData(prev => ({ ...prev, [name]: value }));
    
        if (name === 'cep' && value.length === 8) {                 // Se for CEP com 8 dígitos, busca o endereço
            buscarEnderecoPorCep(value);
    }
  }, []);

  
  const buscarEnderecoPorCep = useCallback(async (cep) => {     // Busca e preenche o endereço pelo CEP
    try {
      const data = await buscarCep(cep);
      setFormData(prev => ({
        ...prev,
        endereco: data.logradouro,
        cidade: data.localidade,
        estado: data.uf
      }));
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  
  const salvarCliente = useCallback(async (cliente, isEditing) => { // Salva ou atualiza um cliente
    setLoading(true);
    try {
      if (isEditing) {
        await atualizarCliente(cliente.id, cliente);
      } else {
        await criarCliente(cliente);
      }
      setError(null);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return { success: false, error: error.message };
    }
  }, []);

  // Limpa o formulário
  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setError(null);
  }, []);

  return {
    formData,
    setFormData,
    loading,
    error,
    handleInputChange,
    buscarEnderecoPorCep,
    salvarCliente,
    resetForm
  };
};