import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { getStatusIcon } from './StatusUtils';

const OSTable = ({ 
  itens, 
  clientes, 
  servicos, 
  tipoAtivo, 
  onEdit, 
  onStatusChange 
}) => {
  return (
    <Table className='text-center' hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Veículo</th>
          <th>Serviço</th>
          <th>Status</th>
          <th>Valor Total</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(itens) && itens.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              {Array.isArray(clientes) && 
                clientes.find(c => c.id === item.cliente_id)?.nome || 
                'Cliente não encontrado'}
            </td>
            <td>{`${item.concessionaria} - ${item.modelo}`}</td>
            <td>
              {Array.isArray(servicos) && 
                servicos.find(s => s.id === item.servico_id)?.nome_servico || 
                'Serviço não encontrado'}
            </td>
            <td>
              {getStatusIcon(item.status)}
              <span className="ms-2">
                {item.status === 'orcamento aprovado' ? 'Pendente' : item.status}
              </span>
            </td>
            <td>R$ {parseFloat(item.valor_total).toFixed(2)}</td>
            <td>
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
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Memorizar o componente para evitar re-renders desnecessários
export default React.memo(OSTable);