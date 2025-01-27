import { useState } from 'react';
import { criarUsuarios, atualizarUsuarios } from '../api/usuariosApi';

export const useUsuariosForm = (onSuccess) => {
  const [showModal, setShowModal] = useState(false);
  const [editingUsuarios, setEditingUsuarios] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    nivel_acesso: '',
    status: 'Ativo'
  });

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      senha: '',
      nivel_acesso: '',
      status: 'Ativo'
    });
    setEditingUsuarios(null);
  };

  const handleShow = (usuarios = null) => {
    if (usuarios) {
      setEditingUsuarios(usuarios);
      setFormData({ ...usuarios, senha: '' });
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUsuarios) {
        await atualizarUsuarios(editingUsuarios.id, {
          ...formData,
          id: editingUsuarios.id
        });
      } else {
        await criarUsuarios(formData);
      }
      onSuccess(editingUsuarios ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!');
      handleClose();
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao salvar usuário');
    }
  };

  return {
    showModal,
    editingUsuarios,
    formData,
    setFormData,
    handleShow,
    handleClose,
    handleSubmit
  };
};