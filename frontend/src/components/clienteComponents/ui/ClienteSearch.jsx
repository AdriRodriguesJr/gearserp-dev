import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ClienteSearch = ({ termoBusca, onSearchChange, onSearch }) => {
    return (
        <Form className="d-flex mt-3 mt-md-0" onSubmit={onSearch}>
            <div className="input-group">
                <Form.Control
                    type="text"
                    placeholder="Pesquisar"
                    value={termoBusca}
                    onChange={onSearchChange}
                />
                <Button type="submit" variant="outline-secondary">
                    <i className="bi bi-search"></i>
                </Button>
            </div>
        </Form>
    );
};

export default ClienteSearch;