import axios from 'axios';

const API_URL = 'https://gearserp.onrender.com/api/catalogos';

// GET - Buscar catálogos por tipo de veículo
export const getCatalogosPorTipo = async (tipoVeiculo) => {
  try {
    const response = await axios.get(`${API_URL}/${tipoVeiculo}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar catálogos para ${tipoVeiculo}: ${error.message}`);
  }
};

// GET - Buscar catálogos por termo
export const buscarCatalogos = async (termo) => {
  try {
    const response = await axios.get(`${API_URL}/buscar`, { params: { termo } });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar catálogos: ' + error.message);
  }
};

// POST - Criar novo catálogo
export const criarCatalogo = async (catalogoData) => {
  try {
    const response = await axios.post(API_URL, catalogoData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar catálogo: ' + error.message);
  }
};

// PUT - Atualizar catálogo existente
export const atualizarCatalogo = async (id, catalogoData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, catalogoData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar catálogo: ' + error.message);
  }
};

// DELETE - Excluir catálogo
export const excluirCatalogo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao excluir catálogo: ' + error.message);
  }
};