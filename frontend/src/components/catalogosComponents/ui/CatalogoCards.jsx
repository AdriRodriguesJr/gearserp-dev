import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CatalogoCards = ({ catalogoItens, onEdit, onDelete }) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {catalogoItens.map(item => (
                <div className="col mb-4" key={item.id}>
                    <Card className="h-100 shadow-sm border">
                        <Card.Header className="cabecalho text-white py-2">
                            <h6 className="mb-0 fw-semibold">Serviço #{item.id}</h6>
                        </Card.Header>
                        
                        <Card.Body className="d-flex flex-column">
                            <Card.Title className="h5 mb-3">{item.nome_servico}</Card.Title>
                            <Card.Text as="div" className="flex-grow-1">
                                <div className="mb-2 text-body">
                                    <i className="bi bi-file-text me-2"></i>
                                    {item.descricao}
                                </div>
                                <div className="mb-2 text-body">
                                    <i className="bi bi-currency-dollar me-2"></i>
                                    R$ {parseFloat(item.preco).toFixed(2)}
                                </div>
                                <div className="mb-2 text-body">
                                    <i className="bi bi-clock me-2"></i>
                                    {item.tempo_estimado}
                                </div>
                            </Card.Text>
                            
                            <div className="mt-3 pt-3 border-top d-flex justify-content-end gap-2">
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => onEdit(item)}
                                    className="d-flex align-items-center btn-sm">
                                    <i className="bi bi-pencil"></i>
                                </Button>

                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => onDelete(item.id)}
                                    className="d-flex align-items-center btn-sm">
                                        
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default CatalogoCards;