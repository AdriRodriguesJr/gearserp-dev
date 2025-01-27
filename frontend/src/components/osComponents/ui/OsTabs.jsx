// components/ui/OsTabs.jsx
import React from 'react';

const OsTabs = ({ tipoAtivo, onTipoChange }) => {
  return (
    <ul className="nav nav-tabs mb-4">
      <li className="nav-item">
        <button
          className={`nav-link ${tipoAtivo === 'orcamento' ? 'active' : ''}`}
          onClick={() => onTipoChange('orcamento')}
        >
          Orçamentos
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${tipoAtivo === 'os' ? 'active' : ''}`}
          onClick={() => onTipoChange('os')}
        >
          Ordens de Serviço
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${tipoAtivo === 'finalizado' ? 'active' : ''}`}
          onClick={() => onTipoChange('finalizado')}
        >
          Finalizados
        </button>
      </li>
    </ul>
  );
};

export default React.memo(OsTabs);