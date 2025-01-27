const Usuario = require('../models/usuarioModel');

const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validarSenha = (senha) => {
    return senha.length >= 8; // Exemplo: senha deve ter pelo menos 8 caracteres
};

const getTodosUsuarios = async (req, res) => {
    try {
        const results = await Usuario.getTodosUsuarios();
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).json({ error: err.message });
    }
};

const postNovoUsuario = async (req, res) => {
    const novoUsuario = req.body;

    if (!validarEmail(novoUsuario.email)) {
        return res.status(400).json({ message: 'E-mail inválido' });
    }

    if (!validarSenha(novoUsuario.senha)) {
        return res.status(400).json({ message: 'Senha deve ter pelo menos 8 caracteres' });
    }

    try {
        const result = await Usuario.postNovoUsuario(novoUsuario);
        res.status(201).json({ message: 'Usuário criado com sucesso!', id: result.id });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ message: 'E-mail já cadastrado' });
        }
        console.error('Erro ao criar usuário:', err);
        res.status(500).json({ error: err.message });
    }
};

const putUsuario = async (req, res) => {
    const id = req.params.id;
    const usuarioAtualizado = req.body;

    if (!validarEmail(usuarioAtualizado.email)) {
        return res.status(400).json({ message: 'E-mail inválido' });
    }

    if (!validarSenha(usuarioAtualizado.senha)) {
        return res.status(400).json({ message: 'Senha deve ter pelo menos 8 caracteres' });
    }

    try {
        const result = await Usuario.putUsuario(id, usuarioAtualizado);
        if (!result) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário atualizado com sucesso', usuario: result });
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).json({ error: err.message });
    }
};

const patchUsuario = async (req, res) => {
    const id = req.params.id;
    const camposAtualizados = req.body;

    if (Object.keys(camposAtualizados).length === 0) {
        return res.status(400).json({ message: 'Nenhum campo fornecido para atualização' });
    }

    try {
        const result = await Usuario.patchUsuario(id, camposAtualizados);
        if (!result) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário atualizado com sucesso', usuario: result });
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).json({ error: err.message });
    }
};

const deleteUsuario = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'ID do usuário é necessário' });
    }

    try {
        const result = await Usuario.deleteUsuario(id);
        if (!result) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário marcado como excluído com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getTodosUsuarios, postNovoUsuario, putUsuario, patchUsuario, deleteUsuario };