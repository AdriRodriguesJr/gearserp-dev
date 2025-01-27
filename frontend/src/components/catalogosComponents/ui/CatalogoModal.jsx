import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CatalogoModal = ({ show, onHide, formData, onInputChange, onSubmit, editingItem }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{editingItem ? 'Editar Item' : 'Novo Item'}</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome do Serviço</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="nome_servico" 
                            value={formData.nome_servico} 
                            placeholder='Carro - Troca de óleo' 
                            onChange={onInputChange} 
                            required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Veículo</Form.Label>
                        <Form.Select 
                            name="tipo_veiculo" 
                            value={formData.tipo_veiculo} 
                            onChange={onInputChange} 
                            required>

                            <option value="carro">Carro</option>
                            <option value="moto">Moto</option>
                            <option value="caminhao">Caminhão</option>
                            <option value="outros">Outros</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            name="descricao" 
                            value={formData.descricao} 
                            placeholder='Exemplo: Troca de óleo' 
                            onChange={onInputChange} 
                            required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control 
                            type="number" 
                            step="0.01" 
                            name="preco" 
                            value={formData.preco} 
                            onChange={onInputChange} 
                            required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Tempo Estimado</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="tempo_estimado" 
                            value={formData.tempo_estimado} 
                            placeholder='' 
                            onChange={onInputChange} 
                            required />
                    </Form.Group>
                    
                    <div className="d-flex justify-content-end mt-3">
                        <Button type="submit">
                            {editingItem ? 'Atualizar Item' : 'Cadastrar Item'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CatalogoModal;