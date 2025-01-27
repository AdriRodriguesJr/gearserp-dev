import React from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const EstoqueModal = ({ 
    show, 
    onHide, 
    formData, 
    onChange, 
    onSubmit, 
    editingPeca,
    imagemPreview,
    onImagemChange 
}) => {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {editingPeca ? 'Editar Peça' : 'Nova Peça'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome da Peça*</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Código de Referência*</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="codigo_referencia"
                                    value={formData.codigo_referencia}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Preço*</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="preco"
                                    value={formData.preco}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Quantidade em Estoque*</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantidade_estoque"
                                    value={formData.quantidade_estoque}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Marca</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="marca"
                                    value={formData.marca}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descricao"
                            value={formData.descricao}
                            onChange={onChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={onImagemChange}
                        />
                    </Form.Group>

                    {imagemPreview && (
                        <div className="mb-3 text-center">
                            <img
                                src={imagemPreview}
                                alt="Preview"
                                style={{
                                    maxWidth: '200px',
                                    maxHeight: '200px',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    )}

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            {editingPeca ? 'Atualizar' : 'Cadastrar'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EstoqueModal;