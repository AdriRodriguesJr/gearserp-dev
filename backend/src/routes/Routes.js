const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const clienteController = require('../controllers/clienteController');
const osController = require('../controllers/osController');
const catalogoController = require('../controllers/catalogos/catalogoController');
const dashboardController = require('../controllers/dashboardController');
const PecaController = require('../controllers/pecaController')
const upload = require('../middlewares/uploadMiddleware')

// Middleware para tratar erros assíncronos
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/dashboard/lucro-bruto', asyncHandler(dashboardController.getLucroBruto));
router.get('/dashboard/servicos-aprovados', asyncHandler(dashboardController.getServicosAprovados));

// Rotas usuários
router.get('/usuarios', asyncHandler(usuarioController.getTodosUsuarios));
router.post('/usuarios', asyncHandler(usuarioController.postNovoUsuario));
router.put('/usuarios/:id', asyncHandler(usuarioController.putUsuario));
router.delete('/usuarios/:id', asyncHandler(usuarioController.deleteUsuario));

// Rotas cliente
router.get('/cliente', asyncHandler(clienteController.getTodosCliente));
router.get('/cliente/buscar', asyncHandler(clienteController.buscarClientes));
router.post('/cliente', asyncHandler(clienteController.postNovoCliente));
router.put('/cliente/:id', asyncHandler(clienteController.putCliente));
router.delete('/cliente/:id', asyncHandler(clienteController.deleteCliente));

// Rotas de OS
router.get('/os/orcamentos', asyncHandler(osController.getOrcamentos));
router.get('/os/aprovadas', asyncHandler(osController.getOrdensServico));
router.get('/os/finalizados', asyncHandler(osController.getFinalizados));
router.post('/os', asyncHandler(osController.postNovaOs));
router.get('/os/:id/pecas', asyncHandler(osController.getPecasOS));
router.post('/os/:id/pecas', asyncHandler(osController.postPecasOS));
router.delete('/os/:id/pecas/:pecaId', asyncHandler(osController.deletePecaOS));
router.put('/os/:id', asyncHandler(osController.putOs));
router.put('/os/:id/aprovar', asyncHandler(osController.aprovarOrcamento));
router.get('/os/buscar', asyncHandler(osController.buscarOs));

// Rota de catalogos
router.get('/catalogos', asyncHandler(catalogoController.getCatalogo));
router.get('/catalogos/:tipoVeiculo', asyncHandler(catalogoController.getCatalogoPorTipo)); // Modificado para evitar conflito
router.get('/catalogos/buscar', asyncHandler(catalogoController.buscarCatalogo));
router.post('/catalogos', asyncHandler(catalogoController.postCatalogo));
router.put('/catalogos/:id', asyncHandler(catalogoController.putCatalogo));
router.delete('/catalogos/:id', asyncHandler(catalogoController.deleteCatalogo));

router.get('/pecas', asyncHandler(PecaController.listarPecas));
router.get('/pecas/buscar', asyncHandler(PecaController.buscarPecas));
router.get('/pecas/:id', asyncHandler(PecaController.buscarPecaPorId));
router.post('/pecas', upload.single('imagem'), asyncHandler(PecaController.criarPeca));
router.put('/pecas/:id', upload.single('imagem'), asyncHandler(PecaController.atualizarPeca));
router.delete('/pecas/:id', asyncHandler(PecaController.deletarPeca));

module.exports = router;
