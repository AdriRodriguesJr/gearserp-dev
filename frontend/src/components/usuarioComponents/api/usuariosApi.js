import axios from 'axios';

const API_URL = 'https://gearserp.onrender.com/api/usuarios';

// GET - Buscar todos os usuarios
export const getUsuarios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar usuários: ' + error.message);
  }
};

// GET - Buscar usuarios por termo
export const buscarUsuarios = async (termo) => {
  try {
    const response = await axios.get(`${API_URL}/buscar`, { params: { termo } });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar usuários: ' + error.message);
  }
};

// POST - Criar novo usuarios
export const criarUsuarios = async (usuariosData) => {
  try {
    const response = await axios.post(API_URL, usuariosData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

// PUT - Atualizar usuarios existente
export const atualizarUsuarios = async (id, usuariosData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, usuariosData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// DELETE - Excluir usuarios
export const excluirUsuarios = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao excluir usuário: ' + error.message);
  }
};