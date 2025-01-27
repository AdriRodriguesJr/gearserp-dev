import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const EstoqueCards = ({ pecas, onEdit, onDelete }) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {pecas.map(peca => (
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
                            
                            <div className="mb-3">
                                <Badge bg="secondary" className="me-2">
                                    {peca.marca}
                                </Badge>
                                <Badge bg="info">
                                    {peca.categoria}
                                </Badge>
                            </div>

                            <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                                <div>
                                    <Badge bg={peca.quantidade_estoque > 0 ? "success" : "danger"}>
                                        Estoque: {peca.quantidade_estoque}
                                    </Badge>
                                </div>
                                
                                <div>
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
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default EstoqueCards;
