import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { getStatusIcon } from '../ui/StatusUtils';

const OsCards = ({
  itens,
  clientes,
  servicos,
  tipoAtivo,
  onEdit,
  onStatusChange
}) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {Array.isArray(itens) && itens.map(item => (
        <div className="col" key={item.id}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="cabecalho text-white">
              <h6 className="mb-0">OS #{item.id}</h6>
            </Card.Header>
            <Card.Body>
              <Card.Title className="mb-3">
                {Array.isArray(clientes) && clientes.find(c => c.id === item.cliente_id)?.nome || 'Cliente não encontrado'}
              </Card.Title>
              <Card.Text as="div">
                <div className="mb-2 d-flex align-items-center">
                  <i className="bi bi-car-front me-2 text-primary"></i>
                  <span>{`${item.veiculo_tipo} - ${item.modelo} (${item.ano})`}</span>
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <i className="bi bi-tools me-2 text-primary"></i>
                  <span>{Array.isArray(servicos) && servicos.find(s => s.id === item.servico_id)?.nome_servico || 'Serviço não encontrado'}</span>
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <i className="bi bi-currency-dollar me-2 text-primary"></i>
                  <span>R$ {parseFloat(item.valor_total).toFixed(2)}</span>
                </div>
                <div className="mb-2 d-flex align-items-center">
                  {getStatusIcon(item.status)}
                  <span className="ms-2">{item.status === 'orcamento aprovado' ? 'Pendente' : item.status}</span>
                </div>
              </Card.Text>
              <div className="mt-3 pt-3 border-top d-flex justify-content-end">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="me-1"
                  onClick={() => onEdit(item)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                {tipoAtivo === 'orcamento' && item.status === 'orcamento em andamento' && (
                  <>
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="me-1"
                      onClick={() => onStatusChange(item.id, 'orcamento aprovado')}
                    >
                      <i className="bi bi-check-lg"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onStatusChange(item.id, 'orcamento reprovado')}
                    >
                      <i className="bi bi-x-lg"></i>
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default React.memo(OsCards);