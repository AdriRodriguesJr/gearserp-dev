import axios from 'axios';

const API_URL = 'desenvolvimento.gearserp.space/api/cliente';

// GET - Buscar todos os clientes
export const getClientes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar clientes: ' + error.message);
  }
};

// GET - Buscar clientes por termo
export const buscarClientes = async (termo) => {
  try {
    const response = await axios.get(`${API_URL}/buscar`, { params: { termo } });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar clientes: ' + error.message);
  }
};

// POST - Criar novo cliente
export const criarCliente = async (clienteData) => {
  try {
    const response = await axios.post(API_URL, clienteData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar cliente: ' + error.message);
  }
};

// PUT - Atualizar cliente existente
export const atualizarCliente = async (id, clienteData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, clienteData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar cliente: ' + error.message);
  }
};

// DELETE - Excluir cliente
export const excluirCliente = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao excluir cliente: ' + error.message);
  }
};

// GET - Buscar endereço por CEP (serviço externo)
export const buscarCep = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar CEP: ' + error.message);
  }
};