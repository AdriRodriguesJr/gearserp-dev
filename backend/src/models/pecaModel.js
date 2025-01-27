const pool = require('../middlewares/db');

// Funções para peças
const getTodosPecas = async () => {
    const query = 'SELECT * FROM pecas ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    return rows;
};

const getPecaPorId = async (id) => {
    const query = 'SELECT * FROM pecas WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

const postNovaPeca = async (peca) => {
    const query = `INSERT INTO pecas (nome, descricao, preco, quantidade_estoque, imagem_url, categoria, codigo_referencia, marca) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const { nome, descricao, preco, quantidade_estoque, imagem_url, categoria, codigo_referencia, marca } = peca;
    const { rows } = await pool.query(query, [nome, descricao, preco, quantidade_estoque, imagem_url, categoria, codigo_referencia, marca]);
    return rows[0];
};

const putPeca = async (id, peca) => {
    const query = `UPDATE pecas 
    SET nome = $1, descricao = $2, preco = $3, quantidade_estoque = $4, imagem_url = $5, categoria = $6, codigo_referencia = $7, 
    marca = $8, updated_at = CURRENT_TIMESTAMP WHERE id = $9 RETURNING *`;
    const { nome, descricao, preco, quantidade_estoque, imagem_url, categoria, codigo_referencia, marca } = peca;
    const { rows } = await pool.query(query, [nome, descricao, preco, quantidade_estoque, imagem_url, categoria, codigo_referencia, marca, id]);
    return rows[0];
};

const deletePeca = async (id) => {
    const pecaId = parseInt(id, 10);
    const query = 'DELETE FROM pecas WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [pecaId]);
    return rows[0];
};

const buscarPecas = async (termo) => {
    const query = `SELECT * FROM pecas WHERE nome ILIKE $1 OR descricao ILIKE $1 OR categoria ILIKE $1 OR marca ILIKE $1ORDER BY created_at DESC`;
    const { rows } = await pool.query(query, [`%${termo}%`]);
    return rows;
};

module.exports = { getTodosPecas, getPecaPorId, postNovaPeca, putPeca, deletePeca, buscarPecas };