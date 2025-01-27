const pool = require('../middlewares/db');
const bcrypt = require('bcrypt');

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const getTodosUsuarios = async () => {
    const query = 'SELECT * FROM usuario WHERE deleted_at IS NULL';
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw new AppError('Erro ao buscar usuários', 500);
    }
};

const postNovoUsuario = async (usuario) => {
    const { nome, email, senha, nivel_acesso, ativo } = usuario;

    if (!validarEmail(email)) {
        throw new AppError('E-mail inválido', 400);
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const query = `
        INSERT INTO usuario (nome, email, senha, nivel_acesso, ativo) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *
    `;
    try {
        const { rows } = await pool.query(query, [nome, email, senhaHash, nivel_acesso, ativo]);
        return rows[0];
    } catch (error) {
        if (error.code === '23505') {
            throw new AppError('E-mail já cadastrado', 409);
        }
        throw new AppError('Erro ao criar usuário', 500);
    }
};

const patchUsuario = async (id, camposAtualizados) => {
    const campos = Object.keys(camposAtualizados);
    const valores = Object.values(camposAtualizados);

    const sets = campos.map((campo, index) => `${campo} = $${index + 1}`).join(', ');

    const query = `
        UPDATE usuario 
        SET ${sets} 
        WHERE id = $${campos.length + 1} 
        RETURNING *
    `;
    try {
        const { rows } = await pool.query(query, [...valores, id]);
        return rows[0];
    } catch (error) {
        throw new AppError('Erro ao atualizar usuário', 500);
    }
};

const deleteUsuario = async (id) => {
    const query = `
        UPDATE usuario 
        SET deleted_at = CURRENT_TIMESTAMP 
        WHERE id = $1 
        RETURNING *
    `;
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        throw new AppError('Erro ao deletar usuário', 500);
    }
};

module.exports = { getTodosUsuarios, postNovoUsuario, patchUsuario, deleteUsuario };