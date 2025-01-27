import React, { useMemo, useCallback } from 'react';
import { Container, Button } from 'react-bootstrap';

// Hooks
import useOS from './hooks/useOs';
import useOSForm from './hooks/useOsForm';
import useWindowSize from './hooks/useWindowSize';

// Componentes UI
import OSTable from './ui/OsTables';
import OSCards from './ui/OsCards';
import OSModal from './ui/OsModal';
import OSPecasModal from './ui/OsPecasModal';
import OSToast from './ui/OsToast';
import OSSearch from './ui/OsSearch';
import OSTabs from './ui/OsTabs';

// Estilos
import './css/OrdemServico.css';

const OrdemServico = () => {
  const {
    itens,
    loading,
    error,
    tipoAtivo,
    setTipoAtivo,
    clientes,
    servicos,
    searchItens,
    updateStatus,
    fetchItens
  } = useOS();

  const {
    showModal,
    showPecasModal,
    editingItem,
    formData,
    pecasSelecionadas,
    pecasDisponiveis,
    quantidades,
    handleShow,
    handleClose,
    handleInputChange,
    handleQuantidadeChange,
    handleAddPeca,
    handleRemovePeca,
    handleSalvarPecas,
    handleShowPecasModal,
    handleClosePecasModal,
    handleSubmit
  } = useOSForm(() => {
    fetchItens();
    showToast('Operação realizada com sucesso!');
  });

  const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' });
  const [termoBusca, setTermoBusca] = React.useState('');
  const { isMobile } = useWindowSize();

  const memoizedItems = useMemo(() => itens, [itens]);

  const handleSearchChange = useCallback((e) => {
    setTermoBusca(e.target.value);
  }, []);

  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    if (termoBusca.trim()) {
      await searchItens(termoBusca);
    }
  }, [termoBusca, searchItens]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
  }, []);

  const handleStatusUpdate = useCallback(async (id, status) => {
    const result = await updateStatus(id, status);
    showToast(result.message, result.success ? 'success' : 'danger');
  }, [updateStatus, showToast]);

  return (
    <Container className="position-relative">
      {loading && (
        <div className="position-absolute w-100 h-100 top-0 start-0 bg-white bg-opacity-75 d-flex justify-content-center align-items-center" style={{ zIndex: 1000 }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      <div className='container-fluid mt-4'>
        <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mb-4'>
          <h2>Ordens de Serviço e Orçamentos</h2>
          <OSSearch
            termoBusca={termoBusca}
            onChange={handleSearchChange}
            onSubmit={handleSearch}
          />
        </div>

        <OSTabs
          tipoAtivo={tipoAtivo}
          onTipoChange={setTipoAtivo}
        />
      </div>

      {error ? (
        <div className="text-center mt-4 text-danger">
          <p>{error}</p>
        </div>
      ) : memoizedItems.length === 0 ? (
        <div className="text-center mt-4">
          <p>Nenhum item encontrado.</p>
        </div>
      ) : (
        isMobile ? (
          <OSCards
            itens={memoizedItems}
            clientes={clientes}
            servicos={servicos}
            tipoAtivo={tipoAtivo}
            onEdit={handleShow}
            onStatusChange={handleStatusUpdate}
          />
        ) : (
          <OSTable
            itens={memoizedItems}
            clientes={clientes}
            servicos={servicos}
            tipoAtivo={tipoAtivo}
            onEdit={handleShow}
            onStatusChange={handleStatusUpdate}
          />
        )
      )}

      <Button className='crud_button mt-4' onClick={() => handleShow()}>
        <i className="bi bi-plus-lg"></i>
      </Button>

      <OSModal
        show={showModal}
        onHide={handleClose}
        formData={formData}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        editingItem={editingItem}
        clientes={clientes}
        servicos={servicos}
        tipoAtivo={tipoAtivo}
        pecasSelecionadas={pecasSelecionadas}
        onShowPecasModal={handleShowPecasModal}
      />

      <OSPecasModal
        show={showPecasModal}
        onHide={handleClosePecasModal}
        pecasDisponiveis={pecasDisponiveis}
        pecasSelecionadas={pecasSelecionadas}
        quantidades={quantidades}
        onQuantidadeChange={handleQuantidadeChange}
        onAddPeca={handleAddPeca}
        onRemovePeca={handleRemovePeca}
        onSalvarPecas={handleSalvarPecas}
      />

      <OSToast
        toast={toast}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </Container>
  );
};

export default React.memo(OrdemServico);