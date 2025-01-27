import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useEstoque } from './hooks/useEstoque';
import { useEstoqueForm } from './hooks/useEstoqueForm';
import EstoqueCards from './ui/EstoqueCards';
import EstoqueModal from './ui/EstoqueModal';
import EstoqueSearch from './ui/EstoqueSearch';
import EstoqueToast from './ui/EstoqueToast'

const Estoque = () => {
    const { 
        pecas,
        loading,
        error,
        fetchPecas,
        buscarPecas,
        excluirPeca 
    } = useEstoque();

    const {
        formData,
        imagemPreview,
        handleInputChange,
        handleImagemChange,
        salvarPeca,
        resetForm,
        setFormData
    } = useEstoqueForm();

    const [showModal, setShowModal] = React.useState(false);
    const [editingPeca, setEditingPeca] = React.useState(null);
    const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' });
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        fetchPecas();
    }, [fetchPecas]);

    const handleShow = (peca = null) => {
        if (peca) {
            setEditingPeca(peca);
            setFormData(peca);
        }
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingPeca(null);
        resetForm();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        buscarPecas(searchTerm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await salvarPeca(formData, editingPeca !== null);
        
        if (response.success) {
            showToast(editingPeca ? 'Peça atualizada com sucesso!' : 'Peça cadastrada com sucesso!');
            handleClose();
            fetchPecas();
        } else {
            showToast('Erro ao salvar peça', 'danger');
        }
    };

    const handleDelete = async (id) => {
        const response = await excluirPeca(id);
        if (response.success) {
            showToast('Peça excluída com sucesso!');
        } else {
            showToast('Erro ao excluir peça', 'danger');
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    return (
        <Container>
            <div className='container-fluid mt-4'>
                <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mb-4'>
                    <h2>Estoque de Peças</h2>
                    <EstoqueSearch
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        onSearch={handleSearch}
                    />
                </div>

                {loading ? (
                    <div className="text-center mt-4">
                        <p>Carregando...</p>
                    </div>
                ) : error ? (
                    <div className="text-center mt-4">
                        <p className="text-danger">{error}</p>
                    </div>
                ) : pecas.length === 0 ? (
                    <div className="text-center mt-4">
                        <p>Nenhuma peça cadastrada.</p>
                    </div>
                ) : (<EstoqueCards pecas={pecas} onEdit={handleShow} onDelete={handleDelete} />)}

                <Button className='crud_button mt-4' onClick={() => handleShow()}> <i className="bi bi-plus-lg"></i> </Button>

                <EstoqueModal show={showModal} onHide={handleClose} formData={formData} onChange={handleInputChange} onSubmit={handleSubmit} 
                editingPeca={editingPeca} imagemPreview={imagemPreview} onImagemChange={handleImagemChange}/>

                <EstoqueToast show={toast.show} message={toast.message} type={toast.type} onClose= { () => setToast(prev => 
                    ({ ...prev, show: false }))}/>
            </div>
        </Container>
    );
};

export default Estoque;