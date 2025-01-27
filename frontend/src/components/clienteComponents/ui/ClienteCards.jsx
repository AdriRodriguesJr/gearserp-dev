import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ClienteCards = ({ clientes, onEdit, onDelete }) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {clientes.map(cliente => (
                <div className="col mb-4" key={cliente.id}>
                    <Card className="h-100 shadow-sm border">
                        <Card.Header className="cabecalho text-white py-2">
                            <h6 className="mb-0 fw-semibold">Cliente #{cliente.id}</h6>
                        </Card.Header>
                        
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="h5 mb-3">{cliente.nome}</Card.Title>
                            <Card.Text as="div" className="flex-grow-1">
                                <div className="mb-2 text-body">
                                    <i className="bi bi-envelope me-2"></i>
                                    {cliente.email}
                                </div>
                                <div className="mb-2 text-body">
                                    <i className="bi bi-telephone me-2"></i>
                                    {cliente.telefone}
                                </div>
                                <div className="mb-2 text-body">
                                    <i className="bi bi-person-vcard me-2"></i>
                                    {cliente.cpf}
                                </div>
                            </Card.Text>
                            
                            <div className="mt-3 pt-3 border-top d-flex justify-content-end gap-2">
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => onEdit(cliente)}
                                    className="d-flex align-items-center btn-sm">
                                    <i className="bi bi-pencil"></i>
                                </Button>

                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => onDelete(cliente.id)}
                                    className="d-flex align-items-center btn-sm">
                                        
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ))};
        </div>
    );
};

export default ClienteCards;