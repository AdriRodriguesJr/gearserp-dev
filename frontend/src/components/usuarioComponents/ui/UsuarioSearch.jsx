import React from 'react';
import { Button } from 'react-bootstrap';

export const UsuariosSearch = ({ value, onChange, onSubmit }) => (
  <form className='d-flex mt-3 mt-md-0' onSubmit={onSubmit}>
    <div className='input-group'>
      <input
        type='text'
        className='form-control'
        placeholder='Pesquisar'
        value={value}
        onChange={onChange}
      />
      <Button type="submit" variant="outline-secondary">
        <i className='bi bi-search'></i>
      </Button>
    </div>
  </form>
);