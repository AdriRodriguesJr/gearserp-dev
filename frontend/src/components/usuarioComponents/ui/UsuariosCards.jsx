import React from 'react';
import { Card, Button } from 'react-bootstrap';

export const UsuariosCards = ({ usuarios, onEdit }) => (
  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    {usuarios.map(usuario => (
      <div className="col" key={usuario.id}>
        <Card className="h-100 shadow-sm">
          <Card.Header className="cabecalho text-white">
            <h6 className="mb-0">Usuário #{usuario.id}</h6>
          </Card.Header>
          <Card.Body>
            <Card.Title>{usuario.nome}</Card.Title>
            <Card.Text as="div">
              <div className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                {usuario.email}
              </div>
              <div className="mb-2">
                <i className="bi bi-shield me-2"></i>
                {usuario.nivel_acesso}
              </div>
            </Card.Text>
            <div className="mt-3 pt-3 border-top d-flex justify-content-end">
              <Button variant="outline-secondary" size="sm" onClick={() => onEdit(usuario)}>
                <i className="bi bi-pencil"></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    ))}
  </div>
);