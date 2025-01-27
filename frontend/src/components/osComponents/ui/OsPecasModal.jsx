import React from 'react';
import { Modal, Button, Table, Form, Card, Badge } from 'react-bootstrap';
import useWindowSize from '../hooks/useWindowSize';

const OSPecasModal = ({
  show = false,
  onHide = () => {},
  pecasDisponiveis = [],
  pecasSelecionadas = [],
  quantidades = {},
  onQuantidadeChange = () => {},
  onAddPeca = () => {},
  onRemovePeca = () => {},
  onSalvarPecas = () => {}
}) => {
  const { isMobile } = useWindowSize();

  const PecasDisponiveisDesktop = () => (
    <Table responsive>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Estoque</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {pecasDisponiveis?.map(peca => (
          <tr key={peca.id}>
            <td>{peca.codigo_referencia}</td>
            <td>{peca.nome}</td>
            <td>{peca.quantidade_estoque}</td>
            <td>R$ {parseFloat(peca.preco).toFixed(2)}</td>
            <td>
              <Form.Control
                type="number"
                min="1"
                max={peca.quantidade_estoque}
                value={quantidades[peca.id] || 1}
                onChange={(e) => onQuantidadeChange(peca.id, parseInt(e.target.value))}
                style={{ width: '80px' }}
              />
            </td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => onAddPeca(peca)}
              >
                Adicionar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const PecasDisponiveisMobile = () => (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {pecasDisponiveis?.map(peca => (
        <div className="col" key={peca.id}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="cabecalho text-white">
              <h6 className="mb-0">Peça #{peca.id}</h6>
            </Card.Header>

            <div className="position-relative">
              {peca.imagem_url ? (
                <Card.Img
                  variant="top"
                  src={peca.imagem_url}
                  alt={peca.nome}
                  className="object-fit-cover"
                  style={{ height: '200px' }}
                />
              ) : (
                <div className="bg-light d-flex align-items-center justify-content-center" 
                     style={{ height: '200px' }}>
                  <i className="bi bi-image text-muted" 
                     style={{ fontSize: '2rem' }}></i>
                </div>
              )}
            </div>

            <Card.Body>
              <Card.Title className="h5 mb-2">{peca.nome}</Card.Title>
              
              <div className="small text-muted mb-2">
                Código: {peca.codigo_referencia}
              </div>
              
              <div className="mb-2">
                <span className="h4 text-primary">
                  R$ {parseFloat(peca.preco).toFixed(2)}
                </span>
              </div>

              <div className="mt-3 pt-3 border-top">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Badge bg={peca.quantidade_estoque > 0 ? "success" : "danger"}>
                    Estoque: {peca.quantidade_estoque}
                  </Badge>
                  <Form.Control
                    type="number"
                    min="1"
                    max={peca.quantidade_estoque}
                    value={quantidades[peca.id] || 1}
                    onChange={(e) => onQuantidadeChange(peca.id, parseInt(e.target.value))}
                    style={{ width: '100px' }}
                  />
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onAddPeca(peca)}
                  className="w-100"
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Adicionar à OS
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );

  const PecasSelecionadasDesktop = () => (
    <Table responsive>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Quantidade</th>
          <th>Valor Total</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {pecasSelecionadas?.map(peca => (
          <tr key={peca.id}>
            <td>{peca.nome}</td>
            <td>{peca.quantidade_usada}</td>
            <td>R$ {(peca.valor_total || peca.preco * peca.quantidade_usada).toFixed(2)}</td>
            <td>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onRemovePeca(peca.id)}
              >
                Remover
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const PecasSelecionadasMobile = () => (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {pecasSelecionadas?.map(peca => (
        <div className="col" key={peca.id}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="cabecalho text-white">
              <h6 className="mb-0">Peça #{peca.id}</h6>
            </Card.Header>

            <Card.Body>
              <Card.Title className="h5 mb-2">{peca.nome}</Card.Title>
              
              <div className="mb-2">
                <Badge bg="info" className="me-2">
                  Qtd: {peca.quantidade_usada}
                </Badge>
              </div>
              
              <div className="mb-2">
                <span className="h4 text-primary">
                  R$ {(peca.valor_total || peca.preco * peca.quantidade_usada).toFixed(2)}
                </span>
              </div>

              <div className="mt-3 pt-3 border-top">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onRemovePeca(peca.id)}
                  className="w-100"
                >
                  <i className="bi bi-trash me-2"></i>
                  Remover da OS
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Peças à OS</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-4">
          <h6>Peças Disponíveis</h6>
          {isMobile ? <PecasDisponiveisMobile /> : <PecasDisponiveisDesktop />}
        </div>

        {pecasSelecionadas.length > 0 && (
          <div>
            <h6>Peças Selecionadas</h6>
            {isMobile ? <PecasSelecionadasMobile /> : <PecasSelecionadasDesktop />}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSalvarPecas}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OSPecasModal;