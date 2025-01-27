import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useWindowSize } from './hooks/useWindowSize';
import { UsuariosTable } from './ui/UsuariosTable';
import { UsuariosCards } from './ui/UsuariosCards';
import { UsuariosModal } from './ui/UsuariosModal';
import { UsuariosSearch } from './ui/UsuarioSearch';
import { UsuariosToast } from './ui/UsuariosToast';
import { 
  getUsuarios, 
  buscarUsuarios, 
  criarUsuarios, 
  atualizarUsuarios 
} from './api/usuariosApi';
import './css/Usuarios.css';

const CadastroUsuarios = () => {
  // Estados
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUsuarios, setEditingUsuarios] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    nivel_acesso: '',
    status: 'Ativo'
  });

  // Hooks
  const { width } = useWindowSize();
  const isMobile = width <= 430;

  // Efeitos
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Funções de busca
  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await getUsuarios();
      setUsuarios(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      setError('Erro ao carregar usuários');
      setUsuarios([]);
      showToast(error.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Handlers de busca
  const handleSearchChange = (e) => {
    setTermoBusca(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = termoBusca.trim()
        ? await buscarUsuarios(termoBusca)
        : await getUsuarios();
      setUsuarios(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      setError('Erro ao buscar usuários');
      setUsuarios([]);
      showToast(error.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Handlers do Modal
  const handleClose = () => {
    setShowModal(false);
    setEditingUsuarios(null);
    setFormData({
      nome: '',
      email: '',
      senha: '',
      nivel_acesso: '',
      status: 'Ativo'
    });
  };

  const handleShow = (usuarios = null) => {
    if (usuarios) {
      setEditingUsuarios(usuarios);
      setFormData({ ...usuarios, senha: '' });
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUsuarios) {
        await atualizarUsuarios(editingUsuarios.id, {
          ...formData,
          id: editingUsuarios.id
        });
        showToast('Usuário atualizado com sucesso!');
      } else {
        await criarUsuarios(formData);
        showToast('Usuário cadastrado com sucesso!');
      }
      fetchUsuarios();
      handleClose();
    } catch (error) {
      showToast(error.message, 'danger');
    }
  };

  // Toast
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Loading e Error states
  if (loading) return (
    <Container>
      <div className="text-center mt-4">
        <p>Carregando...</p>
      </div>
    </Container>
  );

  if (error) return (
    <Container>
      <div className="text-center mt-4">
        <p className="text-danger">{error}</p>
        <Button variant="primary" onClick={fetchUsuarios}>Tentar novamente</Button>
      </div>
    </Container>
  );

  return (
    <Container>
      <div className='container-fluid mt-4'>
        {/* Header com título e busca */}
        <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mb-4'>
          <h2>Cadastro de Usuários</h2>
          <UsuariosSearch
            value={termoBusca}
            onChange={handleSearchChange}
            onSubmit={handleSearch}
          />
        </div>

        {/* Lista de Usuários */}
        {usuarios.length === 0 ? (
          <div className="text-center mt-4">
            <p>Nenhum usuário encontrado.</p>
          </div>
        ) : (
          isMobile ? (
            <UsuariosCards usuarios={usuarios} onEdit={handleShow} />
          ) : (
            <UsuariosTable usuarios={usuarios} onEdit={handleShow} />
          )
        )}

        {/* Botão de adicionar */}
        <Button className='crud_button mt-4' onClick={() => handleShow()}>
          <i className="bi bi-plus-lg"></i>
        </Button>

        {/* Modal de criação/edição */}
        <UsuariosModal
          show={showModal}
          onHide={handleClose}
          onSubmit={handleSubmit}
          formData={formData}
          onChange={handleInputChange}
          isEditing={!!editingUsuarios}
        />

        {/* Toast de feedback */}
        <UsuariosToast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      </div>
    </Container>
  );
};

export default CadastroUsuarios;