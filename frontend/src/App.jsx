import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Clientes from './components/clienteComponents/Clientes';
import Estoque from './components/estoqueComponents/Estoque';
import Os from './components/osComponents/Os';
import Catalogos from './components/catalogosComponents/Catalogos';
import Usuarios from './components/usuarioComponents/Usuarios'
import Dashboard from './components/dashboardComponents/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Dashboard/>} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/listaos" element={<Os />} />
        <Route path="/catalogos" element={<Catalogos />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </Router>
  );
}

export default App;