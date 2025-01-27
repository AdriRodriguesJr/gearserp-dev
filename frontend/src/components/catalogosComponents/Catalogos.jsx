import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import CatalogoTable from './ui/CatalogoTable';// Importando componentes
import CatalogoCards from './ui/CatalogoCards';
import CatalogoTabs from './ui/CatalogoTabs';
import CatalogoModal from './ui/CatalogoModal';
import CatalogoToast from './ui/CatalogoToast';
import useWindowSize from './hooks/useWindowSize';// Importando custom hook
import {getCatalogosPorTipo,buscarCatalogos,criarCatalogo,atualizarCatalogo,excluirCatalogo} from './api/catalogosApi';// Importando funções da API

const Catalogos = () => {

  const [catalogoItens, setCatalogoItens] = useState([]);// useState para gerenciar lista de itens do catálogo
  const [showModal, setShowModal] = useState(false);// useState para controlar visibilidade do modal
  const [editingItem, setEditingItem] = useState(null);// useState para gerenciar item em edição
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });// useState para controlar notificações toast
  const [formData, setFormData] = useState({ nome_servico: '', tipo_veiculo: 'carro', descricao: '', preco: '', tempo_estimado: '' });// useState para gerenciar dados do formulário
  const [termoBusca, setTermoBusca] = useState('');// useState para controlar termo de busca 
  const [tipoVeiculoAtivo, setTipoVeiculoAtivo] = useState('carro');// useState para controlar tipo de veículo selecionado
    
  const size = useWindowSize();// hook personalizado para detectar tamanho da tela
  const isMobile = size.width <= 430;

  useEffect(() => {           // useEffect para carregar catálogo quando tipo de veículo muda
      fetchCatalogo();
  }, [tipoVeiculoAtivo]);     // dependência: quando tipoVeiculoAtivo muda, useEffect é executado

    const fetchCatalogo = async () => {// Função que busca dados do catálogo na API
        try {
            const data = await getCatalogosPorTipo(tipoVeiculoAtivo);
            setCatalogoItens(data); // useState: atualiza lista de itens
        } catch (error) {
            showToast('Erro ao carregar catálogo', 'danger');
        }
    };
    
    const handleTipoVeiculoChange = (tipo) => {     // Handler para mudança de tipo de veículo nas tabs
        setTipoVeiculoAtivo(tipo);                  // useState: atualiza tipo ativo
    };

    const handleSearchChange = (e) => {             // Handler para mudança no input de busca
        setTermoBusca(e.target.value);              // useState: atualiza termo de busca
    };  

    const handleSearch = async (e) => {             // Handler para submissão da busca
        e.preventDefault();
        try {
            if (termoBusca.trim()) {
                const data = await buscarCatalogos(termoBusca);
                setCatalogoItens(data);             // useState: atualiza lista com resultados da busca
            } else {
                fetchCatalogo();
            }
        } catch (error) {
            showToast('Erro ao buscar itens', 'danger');
        }
    };

    const handleClose = () => {                     // Handler para fechar modal e resetar formulário
        setShowModal(false);                        // useState: fecha modal
        setEditingItem(null);                       // useState: limpa item em edição
        setFormData({                               // useState: reseta formulário
            nome_servico: '',
            tipo_veiculo: tipoVeiculoAtivo,
            descricao: '',
            preco: '',
            tempo_estimado: ''
        });
    };
    
    const handleShow = (item = null) => {           // Handler para abrir modal (criação ou edição)
        if (item) {
            setEditingItem(item); // useState: define item para edição
            setFormData(item); // useState: preenche formulário com dados do item
        } else {
            setFormData({ ...formData, tipo_veiculo: tipoVeiculoAtivo }); // useState: prepara formulário para novo item
        }
        setShowModal(true); // useState: abre modal
    };

    const handleInputChange = (e) => {              // Handler para mudanças nos inputs do formulário
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // useState: atualiza dados do formulário
    };

    const showToast = (message, type = 'success')=>{// Função para exibir notificações toast
        setToast({ show: true, message, type }); // useState: configura e exibe toast
    };

    const handleSubmit = async (e) => {             // Handler para submissão do formulário (criar/editar)
        e.preventDefault();
        try {
            if (editingItem) {
                await atualizarCatalogo(editingItem.id, formData);
                showToast('Item atualizado com sucesso!');
            } else {
                await criarCatalogo(formData);
                showToast('Item cadastrado com sucesso!');
            }
            fetchCatalogo(); // Atualiza lista após criar/editar
            handleClose(); // Fecha modal e limpa estados
        } catch (error) {
            showToast('Erro ao salvar item', 'danger');
        }
    };

    const handleDelete = async (id) => {            // Handler para exclusão de item
        if (window.confirm('Tem certeza que deseja excluir este item? Esta ação não poderá ser desfeita.')) {
            try {
                await excluirCatalogo(id);
                showToast('Item excluído com sucesso!');
                fetchCatalogo(); // Atualiza lista após excluir
            } catch (error) {
                showToast('Erro ao excluir item', 'danger');
            }
        }
    };

    return (
        <Container>
            <div className='container-fluid mt-4'>
                <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mb-4'>
                    <h2>Cadastro de catalogos</h2>
                    <form className='d-flex mt-3 mt-md-0' onSubmit={handleSearch}>
                        <div className='input-group'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Pesquisar'
                                value={termoBusca}
                                onChange={handleSearchChange}
                            />
                            <Button type="submit" variant="outline-secondary">
                                <i className='bi bi-search'></i>
                            </Button>
                        </div>
                    </form>
                </div>

                <CatalogoTabs 
                    tipoVeiculoAtivo={tipoVeiculoAtivo} 
                    onTipoChange={handleTipoVeiculoChange} 
                />
            </div>

            {catalogoItens.length === 0 ? (
                <div className="text-center mt-4">
                    <p>Nenhum item encontrado para {tipoVeiculoAtivo} com o termo "{termoBusca}"</p>
                </div>
            ) : (
                isMobile ? (
                    <CatalogoCards 
                        catalogoItens={catalogoItens} 
                        onEdit={handleShow} 
                        onDelete={handleDelete} 
                    />
                ) : (
                    <CatalogoTable 
                        catalogoItens={catalogoItens} 
                        onEdit={handleShow} 
                        onDelete={handleDelete} 
                    />
                )
            )}

            <Button className='crud_button mt-4' onClick={() => handleShow()}> + </Button>

            <CatalogoModal 
                show={showModal}
                onHide={handleClose}
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                editingItem={editingItem}
            />

            <CatalogoToast 
                toast={toast}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </Container>
    );
};

export default Catalogos;