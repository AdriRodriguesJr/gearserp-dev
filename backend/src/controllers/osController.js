const osModel = require('../models/osModel');

const getOrcamentos = async (req, res) => {
    try {
        const results = await osModel.getOrcamentos();
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar orçamentos:', err);
        res.status(500).json({ error: err.message });
    }
};

const getOrdensServico = async (req, res) => {
    try {
        const results = await osModel.getOrdensServico();
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar ordens de serviço:', err);
        res.status(500).json({ error: err.message });
    }
};

const getFinalizados = async (req, res) => {
    try {
        const results = await osModel.getFinalizados();
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar ordens finalizadas:', err);
        res.status(500).json({ error: err.message });
    }
};

const postNovaOs = async (req, res) => {
    const novaOs = req.body;
    try {
        const result = await osModel.postNovaOs(novaOs);
        res.status(201).json({ message: 'Ordem de serviço criada com sucesso!', id: result.id });
    } catch (err) {
        console.error('Erro ao criar ordem de serviço:', err);
        res.status(500).json({ error: err.message });
    }
};

const getPecasOS = async (req, res) => {
    try {
        const results = await osModel.getPecasOS(req.params.id);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar peças da OS:', err);
        res.status(500).json({ error: err.message });
    }
};

const postPecasOS = async (req, res) => {
    try {
        const result = await osModel.postPecasOS(req.params.id, req.body.pecas);
        res.json({ message: 'Peças adicionadas com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar peças à OS:', err);
        res.status(500).json({ error: err.message });
    }
};

const deletePecaOS = async (req, res) => {
    try {
        const result = await osModel.deletePecaOS(req.params.pecaId);
        if (!result) {
            return res.status(404).json({ message: 'Peça não encontrada na OS' });
        }
        res.json({ message: 'Peça removida com sucesso' });
    } catch (err) {
        console.error('Erro ao remover peça da OS:', err);
        res.status(500).json({ error: err.message });
    }
};

const putOs = async (req, res) => {
    const id = req.params.id;
    const osData = req.body;
    try {
        const result = await osModel.putOs(id, osData);
        if (!result) {
            return res.status(404).json({ message: 'Ordem de serviço não encontrada' });
        }
        res.json({ message: 'Ordem de serviço atualizada com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar ordem de serviço:', err);
        res.status(500).json({ error: err.message });
    }
};

const deleteOs = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await osModel.deleteOs(id);
        if (!result) {
            return res.status(404).json({ message: 'Ordem de serviço não encontrada' });
        }
        res.json({ message: 'Ordem de serviço excluída com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir ordem de serviço:', err);
        res.status(500).json({ error: err.message });
    }
};

const aprovarOrcamento = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await osModel.aprovarOrcamento(id);
        res.json({ message: "Orçamento aprovado com sucesso", id: id });
    } catch (err) {
        console.error('Erro ao aprovar orçamento:', err);
        res.status(500).json({ message: "Erro ao aprovar orçamento", error: err.message });
    }
};

const buscarOs = async (req, res) => {
    const { termo, tipo } = req.query;
    try {
        const results = await osModel.buscarOs(termo, tipo);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar ordens de serviço:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getOrcamentos,
    getOrdensServico,
    getFinalizados,
    postNovaOs,
    postPecasOS,
    getPecasOS,
    deletePecaOS,
    putOs,
    deleteOs,
    aprovarOrcamento,
    buscarOs
};
