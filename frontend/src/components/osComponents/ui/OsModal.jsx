import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

const OSModal = ({
  show,
  onHide,
  formData,
  onSubmit,
  onChange,
  editingItem,
  clientes,
  servicos,
  tipoAtivo,
  onShowPecasModal,
  pecasSelecionadas
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editingItem ? 'Editar Orçamento' : 'Criar Orçamento'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Cliente</Form.Label>
                <Form.Select 
                  name="cliente_id" 
                  value={formData.cliente_id} 
                  onChange={onChange} 
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Veículo</Form.Label>
                <Form.Select 
                  name="veiculo_tipo" 
                  value={formData.veiculo_tipo} 
                  onChange={onChange} 
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Carro">Carro</option>
                  <option value="Moto">Moto</option>
                  <option value="Caminhonete">Caminhonete</option>
                  <option value="Caminhão">Caminhão</option>
                  <option value="Outros">Outros</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={7}>
              <Form.Group className="mb-3">
                <Form.Label>Serviço</Form.Label>
                <Form.Select
                  name="servico_id"
                  value={formData.servico_id}
                  onChange={onChange}
                  required
                >
                  <option value="">Selecione um serviço</option>
                  {servicos
                    .filter(servico => 
                      !formData.veiculo_tipo || 
                      servico.tipo_veiculo.toLowerCase() === formData.veiculo_tipo.toLowerCase()
                    )
                    .map(servico => (
                      <option key={servico.id} value={servico.id}>
                        {servico.nome_servico} ({servico.tipo_veiculo})
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Montadora</Form.Label>
                <Form.Control
                  type="text"
                  name="concessionaria"
                  value={formData.concessionaria}
                  onChange={onChange}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3">
                <Form.Label>Modelo</Form.Label>
                <Form.Control 
                  type="text" 
                  name="modelo" 
                  value={formData.modelo} 
                  onChange={onChange} 
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className="mb-3">
                <Form.Label>Ano</Form.Label>
                <Form.Control 
                  type="number" 
                  name="ano" 
                  value={formData.ano} 
                  onChange={onChange} 
                  required 
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
              required 
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Valor Total</Form.Label>
                <Form.Control 
                  type="number" 
                  step="0.01" 
                  name="valor_total" 
                  value={formData.valor_total} 
                  onChange={onChange} 
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select 
                  name="status" 
                  value={formData.status} 
                  onChange={onChange} 
                  required
                >
                  {tipoAtivo === 'orcamento' ? (
                    <>
                      <option value="orcamento em andamento">Orçamento em Andamento</option>
                      <option value="orcamento aprovado">Orçamento Aprovado</option>
                      <option value="orcamento reprovado">Orçamento Reprovado</option>
                    </>
                  ) : tipoAtivo === 'os' ? (
                    <>
                      <option value="pendente">Pendente</option>
                      <option value="em andamento">Em Andamento</option>
                      <option value="concluida">Concluída</option>
                    </>
                  ) : (
                    <>
                      <option value="concluida">Concluída</option>
                      <option value="orcamento reprovado">Orçamento Reprovado</option>
                    </>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Previsão de Entrega</Form.Label>
            <Form.Control
              type="date"
              name="previsao_entrega"
              value={formData.previsao_entrega}
              onChange={onChange}
            />
          </Form.Group>

          <div className="mb-3">
            <Button
              variant="outline-secondary"
              onClick={onShowPecasModal}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Adicionar Peças
            </Button>
            {pecasSelecionadas.length > 0 && (
              <div className="mt-2 small text-muted">
                {pecasSelecionadas.length} peça(s) adicionada(s)
              </div>
            )}
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button className="me-md-2" variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editingItem ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OSModal;