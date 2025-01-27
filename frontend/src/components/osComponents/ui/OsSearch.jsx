import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const OSSearch = ({ termoBusca, onChange, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Pesquisar"
          value={termoBusca}
          onChange={onChange}
        />
        <Button type="submit" variant="outline-secondary">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default OSSearch;