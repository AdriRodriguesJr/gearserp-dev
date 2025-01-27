import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ClienteTable = ({ clientes, onEdit, onDelete }) => {
    return (
        <Table className='text-center' hover>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>CPF</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map(cliente => (
                    <tr key={cliente.id}>
                        <td>{cliente.nome}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.telefone}</td>
                        <td>{cliente.cpf}</td>
                        <td>
                            <span className={`badge ${cliente.status === 'Ativo' ? 'bg-success' : 'bg-danger'}`}>
                                {cliente.status}
                            </span>
                        </td>
                        <td>
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => onEdit(cliente)}
                                className="me-2">
                                <i className="bi bi-pencil"></i>
                            </Button>

                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => onDelete(cliente.id)}>
                                <i className="bi bi-trash"></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ClienteTable;