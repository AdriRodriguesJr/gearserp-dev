const Catalogo = require('../../models/catalogos/catalogoModel');

// Controller para obter todos os itens do catálogo
const getCatalogo = async (req, res) => {
    try {
        const results = await Catalogo.getCatalogo();
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar catálogo:', err);
        res.status(500).json({ error: err.message });
    }
};

// Controller para obter itens do catálogo por tipo de veículo
const getCatalogoPorTipo = async (req, res) => {
    const tipoVeiculo = req.params.tipoVeiculo;
    try {
        const results = await Catalogo.getCatalogoPorTipo(tipoVeiculo);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar catálogo por tipo:', err);
        res.status(500).json({ error: err.message });
    }
};

// Controller para buscar itens no catálogo
const buscarCatalogo = async (req, res) => {
    const termo = req.query.termo;
    try {
        const results = await Catalogo.buscarCatalogo(termo);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar no catálogo:', err);
        res.status(500).json({ error: err.message });
    }
};

// Controller para adicionar um novo serviço ao catálogo
const postCatalogo = async (req, res) => {
    const novoCatalogo = req.body;

    if (!novoCatalogo.nome_servico) {
        return res.status(400).json({ error: "O campo Nome do Serviço é obrigatório." });
    }

    try {
        const result = await Catalogo.postCatalogo(novoCatalogo);
        res.status(201).json({ message: 'Serviço adicionado com sucesso!', id: result.id });
    } catch (err) {
        console.error('Erro ao adicionar serviço:', err);
        res.status(500).json({ error: err.message });
    }
};

// Controller para atualizar um serviço do catálogo
const putCatalogo = async (req, res) => {
    const id = req.params.id;
    const catalogoAtualizado = req.body;

    if (!catalogoAtualizado.nome_servico) {
        return res.status(400).json({ error: "O campo Nome do Serviço é obrigatório." });
    }

    try {
        const result = await Catalogo.putCatalogo(id, catalogoAtualizado);
        if (!result) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        res.json({ message: 'Serviço atualizado com sucesso!' });
    } catch (err) {
        console.error('Erro ao atualizar serviço:', err);
        res.status(500).json({ error: err.message });
    }
};

// Controller para deletar um serviço do catálogo
const deleteCatalogo = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Catalogo.deleteCatalogo(id);
        if (!result) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        res.json({ message: 'Serviço deletado com sucesso!' });
    } catch (err) {
        console.error('Erro ao deletar serviço:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    getCatalogo, 
    getCatalogoPorTipo, 
    buscarCatalogo, 
    postCatalogo, 
    putCatalogo, 
    deleteCatalogo 
};
