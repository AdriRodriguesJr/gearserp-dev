import React from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

export const UsuariosModal = ({
  show,
  onHide,
  onSubmit,
  formData,
  onChange,
  isEditing
}) => (
  <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>{isEditing ? 'Editar Usuário' : 'Novo Usuário'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nome*</Form.Label>
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
              <Form.Label>Email*</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>{isEditing ? 'Nova Senha' : 'Senha*'}</Form.Label>
              <Form.Control
                type="password"
                name="senha"
                value={formData.senha}
                onChange={onChange}
                required={!isEditing}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nível de Acesso*</Form.Label>
              <Form.Select
                name="nivel_acesso"
                value={formData.nivel_acesso}
                onChange={onChange}
                required
              >
                <option value="">Selecione</option>
                <option value="administrador">Administrador</option>
                <option value="gerente">Gerente</option>
                <option value="operador">Operador</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <Button variant="primary" type="submit">
            {isEditing ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
);