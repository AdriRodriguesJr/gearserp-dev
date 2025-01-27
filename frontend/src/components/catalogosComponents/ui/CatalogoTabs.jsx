import React from 'react';

const CatalogoTabs = ({ tipoVeiculoAtivo, onTipoChange }) => {
    return (
        <div className="d-flex justify-content-center">
            <ul className="nav nav-tabs color">
                <li className="nav-item">
                    <button
                        className={`nav-link ${tipoVeiculoAtivo === 'carro' ? 'active' : ''}`}
                        onClick={() => onTipoChange('carro')}>
                        Carro
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${tipoVeiculoAtivo === 'moto' ? 'active' : ''}`}
                        onClick={() => onTipoChange('moto')}>
                        Moto
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${tipoVeiculoAtivo === 'caminhao' ? 'active' : ''}`}
                        onClick={() => onTipoChange('caminhao')}>
                        Caminhão
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default CatalogoTabs;