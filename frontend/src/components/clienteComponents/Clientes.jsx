import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useCliente } from './hooks/useCliente';
import { useClienteForm } from './hooks/useClienteForm';
import { useWindowSize } from './hooks/useWindowSize';
import ClienteCards from './ui/ClienteCards';
import ClienteTable from './ui/ClienteTable';
import ClienteModal from './ui/ClienteModal';
import ClienteSearch from './ui/ClienteSearch';
import ClienteToast from './ui/ClienteToast';

const CadastroCliente = () => {
    const {
        clientes,
        loading,
        error,
        fetchClientes,
        buscarClientes,
        excluirCliente
    } = useCliente();

    const {
        formData,
        loading: formLoading,
        error: formError,
        handleInputChange,
        salvarCliente,
        resetForm,
        setFormData,
        buscarCep
    } = useClienteForm();

    const size = useWindowSize();
    const isMobile = size.width <= 430;

    const [showModal, setShowModal] = React.useState(false);
    const [editingCliente, setEditingCliente] = React.useState(null);
    const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' });
    const [termoBusca, setTermoBusca] = React.useState('');

    React.useEffect(() => {
        fetchClientes();
    }, [fetchClientes]);

    const handleShow = (cliente = null) => {
        if (cliente) {
            setEditingCliente(cliente);
            setFormData(cliente);
        }
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingCliente(null);
        resetForm();
    };

    const handleSearchChange = (e) => {
        setTermoBusca(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        buscarClientes(termoBusca);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await salvarCliente(formData, editingCliente !== null);
        
        if (response.success) {
            showToast(editingCliente ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!');
            handleClose();
            fetchClientes();
        } else {
            showToast('Erro ao salvar cliente', 'danger');
        }
    };

    const handleDelete = async (id) => {
        const response = await excluirCliente(id);
        if (response.success) {
            showToast('Cliente excluído com sucesso!');
        } else {
            showToast('Erro ao excluir cliente', 'danger');
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
    };

    return (
        <Container>
            <div className='container-fluid mt-4'>
                <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mb-4'>
                    <h2>Cadastro de Clientes</h2>
                    <ClienteSearch
                        termoBusca={termoBusca}
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
                ) : clientes.length === 0 ? (
                    <div className="text-center mt-4">
                        <p>Nenhum cliente encontrado.</p>
                    </div>
                ) : (
                    isMobile ? (
                        <ClienteCards
                            clientes={clientes}
                            onEdit={handleShow}
                            onDelete={handleDelete}
                        />
                    ) : (
                        <ClienteTable
                            clientes={clientes}
                            onEdit={handleShow}
                            onDelete={handleDelete}
                        />
                    )
                )}

                <Button className='crud_button mt-4' onClick={() => handleShow()}>
                    <i className="bi bi-plus-lg"></i>
                </Button>

                <ClienteModal
                    show={showModal}
                    onHide={handleClose}
                    formData={formData}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    editingCliente={editingCliente}
                    onCepBlur={buscarCep}
                />

                <ClienteToast
                    show={toast.show}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(prev => ({ ...prev, show: false }))}
                />
            </div>
        </Container>
    );
};

export default CadastroCliente;