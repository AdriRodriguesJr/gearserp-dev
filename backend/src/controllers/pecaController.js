const PecaModel = require('../models/pecaModel');
const cloudinary = require('../middlewares/clourdinary');

const listarPecas = async (req, res) => {
    try {
        const pecas = await PecaModel.getTodosPecas();
        return res.status(200).json(pecas);
    } catch (error) {
        console.error('Erro ao listar peças:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const buscarPecaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const peca = await PecaModel.getPecaPorId(id);

        if (!peca) {
            return res.status(404).json({ error: 'Peça não encontrada' });
        }

        return res.status(200).json(peca);
    } catch (error) {
        console.error('Erro ao buscar peça:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const criarPeca = async (req, res) => {
    try {
        console.log('Iniciando criação de peça');
        console.log('Body recebido:', req.body);
        console.log('Arquivo recebido:', req.file);

        let imagem_url = null;

        if (req.file) {
            console.log('Iniciando upload para Cloudinary');
            try {
                const resultado = await cloudinary.uploader.upload(req.file.path, {
                    transformation: [
                        { width: 1000, height: 1000, crop: "limit" },
                        { quality: "auto" },
                        { fetch_format: "auto" }
                    ],
                    folder: "pecas"
                });
                imagem_url = resultado.secure_url;
                console.log('Upload no Cloudinary bem sucedido:', imagem_url);
            } catch (uploadError) {
                console.error('Erro no upload Cloudinary:', uploadError);
                throw uploadError; // Propaga o erro para ser capturado no catch principal
            }
        }

        console.log('Preparando dados para criar peça:', {
            ...req.body,
            imagem_url
        });

        const pecaData = {
            ...req.body,
            imagem_url
        };

        console.log('Chamando model para criar peça');
        const novaPeca = await PecaModel.postNovaPeca(pecaData);
        console.log('Peça criada com sucesso:', novaPeca);

        return res.status(201).json(novaPeca);
    } catch (error) {
        console.error('Erro detalhado ao criar peça:', error);
        return res.status(500).json({ 
            error: 'Erro interno do servidor',
            details: error.message 
        });
    }
};

const atualizarPeca = async (req, res) => {
    try {
        const { id } = req.params;
        const pecaAtual = await PecaModel.getPecaPorId(id);

        if (!pecaAtual) {
            return res.status(404).json({ error: 'Peça não encontrada' });
        }

        let imagem_url = pecaAtual.imagem_url;

        if (req.file) {
            const resultado = await cloudinary.uploader.upload(req.file.path);
            imagem_url = resultado.secure_url;
        }

        const pecaAtualizada = await PecaModel.putPeca(id, {
            ...req.body,
            imagem_url
        });

        return res.status(200).json(pecaAtualizada);
    } catch (error) {
        console.error('Erro ao atualizar peça:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const deletarPeca = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await PecaModel.deletePeca(id);

        if (!resultado.success) {
            return res.status(404).json({ error: resultado.message });
        }

        // Se tiver imagem, deleta da Cloudinary
        if (resultado.deletedPeca?.imagem_url) {
            const publicId = resultado.deletedPeca.imagem_url.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        return res.status(200).json({ message: resultado.message });
    } catch (error) {
        console.error('Erro ao deletar peça:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const buscarPecas = async (req, res) => {
    try {
        const { termo } = req.query;
        const pecas = await PecaModel.buscarPecas(termo);
        return res.status(200).json(pecas);
    } catch (error) {
        console.error('Erro ao buscar peças:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = { listarPecas, buscarPecaPorId, criarPeca, atualizarPeca, deletarPeca, buscarPecas };