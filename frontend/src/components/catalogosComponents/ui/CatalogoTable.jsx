import React from 'react';
import { Table, Button } from 'react-bootstrap';

const CatalogoTable = ({ catalogoItens, onEdit, onDelete }) => {
    return (
        <div className='table-responsive'>
            <Table className='table table-hover table-borderless text-center align-middle mb-0'>
                
                <thead className="align-middle border-bottom">
                    <tr>
                        <th scope="col-2" className="px-3 py-2 fw-semibold align-middle">Nome do Serviço</th>
                        <th scope="col-5" className="px-3 py-2 fw-semibold align-middle">Descrição</th>
                        <th scope="col-2" className="px-3 py-2 fw-semibold align-middle">Preço</th>
                        <th scope="col-1" className="px-3 py-2 fw-semibold align-middle">Tempo Estimado</th>
                        <th scope="col-2" className="px-3 py-2 fw-semibold align-middle">Ações</th>
                    </tr>
                </thead>
                
                <tbody className="table-group-divider">
                    {catalogoItens.map(item => (
                        <tr key={item.id} className="align-middle">
                            <td className="col-2 px-3 py-3 align-middle">{item.nome_servico}</td>
                            <td className="col-5 px-3 py-3 align-middle">{item.descricao}</td>
                            <td className="col-2 px-3 py-3 align-middle">R$ {parseFloat(item.preco).toFixed(2)}</td>
                            <td className="col-1 px-3 py-3 align-middle">{item.tempo_estimado}</td>
                            <td className="col-1 px-3 py-3 align-middle">
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <Button variant="outline-secondary" size="sm" onClick={() => onEdit(item)} className="d-inline-flex align-items-center justify-content-center rounded-2">
                                        <i className="bi bi-pencil fs-6"></i>
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(item.id)} className="d-inline-flex align-items-center justify-content-center rounded-2">
                                        <i className="bi bi-trash fs-6"></i>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            
            </Table>
        
        </div>
    );
};

export default CatalogoTable;