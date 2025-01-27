import React from 'react';
import { Table, Button } from 'react-bootstrap';

export const UsuariosTable = ({ usuarios, onEdit }) => (
  <Table className='text-center' hover>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Nível de Acesso</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {usuarios.map(usuario => (
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td>{usuario.nivel_acesso}</td>
          <td>
            <Button variant="outline-secondary" size="sm" onClick={() => onEdit(usuario)}>
              <i className="bi bi-pencil"></i>
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);
