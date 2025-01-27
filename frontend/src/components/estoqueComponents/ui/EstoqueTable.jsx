import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

const EstoqueTable = ({ pecas, onEdit, onDelete }) => {
    return (
        <Table className='text-center' hover>
            <thead>
                <tr>
                    <th>Imagem</th>
                    <th>Nome</th>
                    <th>Código</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Marca</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {pecas.map(peca => (
                    <tr key={peca.id}>
                        <td>
                            {peca.imagem_url ? (
                                <img
                                    src={peca.imagem_url}
                                    alt={peca.nome}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            ) : (
                                <i className="bi bi-image text-muted"></i>
                            )}
                        </td>
                        <td>{peca.nome}</td>
                        <td>{peca.codigo_referencia}</td>
                        <td>R$ {parseFloat(peca.preco).toFixed(2)}</td>
                        <td>
                            <Badge bg={peca.quantidade_estoque > 0 ? 'success' : 'danger'}>
                                {peca.quantidade_estoque}
                            </Badge>
                        </td>
                        <td>{peca.marca}</td>
                        <td>{peca.categoria}</td>
                        <td>
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => onEdit(peca)}
                                className="me-2">
                                <i className="bi bi-pencil"></i>
                            </Button>

                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => onDelete(peca.id)}>
                                <i className="bi bi-trash"></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default EstoqueTable;