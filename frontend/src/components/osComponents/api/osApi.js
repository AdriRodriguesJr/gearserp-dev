// osApi.js
import axios from 'axios';

const BASE_URL = '/api';

export const osApi = {
  // Ordens de Serviço
  fetchOrdens: async (tipo) => {
    let endpoint;
    switch (tipo) {
      case 'orcamento':
        endpoint = `${BASE_URL}/os/orcamentos`;
        break;
      case 'os':
        endpoint = `${BASE_URL}/os/aprovadas`;
        break;
      default:
        endpoint = `${BASE_URL}/os/finalizados`;
    }
    const response = await axios.get(endpoint);
    return response.data;
  },

  searchOrdens: async (termo, tipo) => {
    const response = await axios.get(`${BASE_URL}/os/buscar?termo=${termo}&tipo=${tipo}`);
    return response.data;
  },

  createOrdem: async (data) => {
    return axios.post(`${BASE_URL}/os`, data);
  },

  updateOrdem: async (id, data) => {
    return axios.put(`${BASE_URL}/os/${id}`, data);
  },

  updateStatus: async (id, status, data) => {
    if (status === 'orcamento aprovado') {
      return axios.put(`${BASE_URL}/os/${id}/aprovar`, data);
    }
    return axios.put(`${BASE_URL}/os/${id}`, { ...data, status });
  },

  // Clientes
  fetchClientes: async () => {
    const response = await axios.get(`${BASE_URL}/cliente`);
    return response.data;
  },

  // Serviços
  fetchServicos: async () => {
    const response = await axios.get(`${BASE_URL}/catalogos`);
    return response.data;
  },

  // Peças
  fetchPecasDisponiveis: async () => {
    const response = await axios.get(`${BASE_URL}/pecas`);
    return response.data.filter(peca => peca.quantidade_estoque > 0);
  },

  fetchPecasOS: async (osId) => {
    const response = await axios.get(`${BASE_URL}/os/${osId}/pecas`);
    return response.data;
  },

  addPecasToOS: async (osId, pecas) => {
    return axios.post(`${BASE_URL}/os/${osId}/pecas`, { pecas });
  },

  updatePecaEstoque: async (pecaId, quantidade) => {
    return axios.put(`${BASE_URL}/pecas/${pecaId}`, {
      quantidade_estoque: quantidade
    });
  }
};

export default osApi;