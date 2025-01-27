import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../public/css/Header.css';
import logo from '../public/img/logo.png';

function Header() {
    const navigate = useLocation();

    useEffect(() => {
        // Fecha o offcanvas quando a rota mudar
        const closeButton = document.querySelector('[data-bs-dismiss="offcanvas"]');
        if (closeButton) {
            closeButton.click();
        }
    }, [navigate]);

    return (
        <header className="text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <button className="btn btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <i className="bi bi-list"></i>
                </button>
                <img src={logo} alt="Gears ERP Logo" className="img-fluid logo" />
                <div className="icons">
                    <div className="dropdown d-inline">
                        <i className="bi bi-bell me-4" id="bellDropdown" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="bellDropdown">
                            <li><a className="dropdown-item" href="#">Notificação 1</a></li>
                            <li><a className="dropdown-item" href="#">Notificação 2</a></li>
                        </ul>
                    </div>
                    <div className="dropdown d-inline">
                        <i className="bi bi-person-circle" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu icon-dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                            <li><a className="dropdown-item" href="#">Adriano Rodrigues</a></li>
                            <li><a className="dropdown-item" href="#">Versão 1.0.0</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close text-reset align-right" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li className="nav-item">
                            <hr />
                            <h6>Dashboard</h6>
                            <hr />
                            <Link className="nav-link" to="/home">
                                <i className="bi bi-house-door"></i> Início
                            </Link>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <h6>Ordem de Serviço</h6>
                            <hr />
                            <Link className="nav-link" to="/listaos">
                                <i className="bi bi-file-earmark-text"></i> Lista de OS
                            </Link>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <h6>Cadastros</h6>
                            <hr />
                            <Link className="nav-link" to="/clientes">
                                <i className="bi bi-person-plus"></i> Cadastro de Cliente
                            </Link>
                            <Link className="nav-link" to="/catalogos">
                                <i className="bi bi-file-earmark-richtext"></i> Catálogos de serviço
                            </Link>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <h6>Estoque</h6>
                            <hr />
                            <Link className="nav-link" to="/estoque">
                                <i className="bi bi-box"></i> Pesquisa de Estoque
                            </Link>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <h6>Relatórios</h6>
                            <hr />
                            <Link className="nav-link" to="#">
                                <i className="bi bi-file-earmark-text"></i> Relatório de Vendas
                            </Link>
                            <Link className="nav-link" to="#">
                                <i className="bi bi-file-earmark-bar-graph"></i> Relatório de Estoque
                            </Link>
                            <Link className="nav-link" to="#">
                                <i className="bi bi-file-earmark-spreadsheet"></i> Relatório Financeiro
                            </Link>
                            <Link className="nav-link" to="#">
                                <i className="bi bi-file-earmark-check"></i> Relatório de OS
                            </Link>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <h6>Pagamentos</h6>
                            <hr />
                            <Link className="nav-link" to="#">
                                <i className="bi bi-credit-card"></i> Pagamento com Cartão - Em breve
                            </Link>
                            <Link className="nav-link" to="#">
                                <i className="bi bi-upc-scan"></i> Pix QRCode - Em breve
                            </Link>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <h6>Equipe</h6>
                            <hr />
                            <Link className="nav-link" to="/usuarios">
                                <i className="bi bi-person-square"></i> Cadastro de funcionários
                            </Link>
                        </li>
                        <hr />
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
