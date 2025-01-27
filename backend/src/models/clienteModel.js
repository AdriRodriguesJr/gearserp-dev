const pool = require('../middlewares/db');

const getTodosCliente = async () => {
    const { rows } = await pool.query('SELECT * FROM cliente WHERE ativo = true');
    return rows;
};

const postNovoCliente = async (cliente) => {
    console.log('Iniciando inserção de novo cliente no modelo');
    console.log('Dados do cliente:', cliente);

    const query = `
        INSERT INTO cliente 
        (ativo, telefone, cpf, cep, endereco, numero, genero, estado, cidade, tipo, nome, email) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
    `;
    const { ativo = true, telefone, cpf, cep, endereco, numero, genero, estado, cidade, tipo, nome, email } = cliente;

    try {
        const result = await pool.query(query, [ativo, telefone, cpf, cep, endereco, numero, genero, estado, cidade, tipo, nome, email]);
        console.log('Resultado da inserção:', result.rows[0]);
        if (result.rows.length === 0) {
            throw new Error('Nenhuma linha foi inserida');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Erro na inserção do cliente:', error);
        throw error;
    }
};


const verificaCpfExistente = async (cpf) => {
    const query = 'SELECT COUNT(*) AS count FROM cliente WHERE cpf = $1 AND ativo = true';
    const { rows } = await pool.query(query, [cpf]);
    return rows[0].count > 0;
};

const putCliente = async (id, clienteAtualizado) => {
    const query = 'UPDATE cliente SET numero = $1, ativo = $2, telefone = $3, cpf = $4, cep = $5, endereco = $6, genero = $7, estado = $8, cidade = $9, tipo = $10, nome = $11, email = $12 WHERE id = $13 AND ativo = true';
    const { numero, ativo, telefone, cpf, cep, endereco, genero, estado, cidade, tipo, nome, email } = clienteAtualizado;

    await pool.query(query, [numero, ativo, telefone, cpf, cep, endereco, genero, estado, cidade, tipo, nome, email, id]);
};

const deleteCliente = async (id) => {
    const query = 'UPDATE cliente SET ativo = false WHERE id = $1';
    await pool.query(query, [id]);
};

const getClientePorId = async (id) => {
    const query = 'SELECT * FROM cliente WHERE id = $1 AND ativo = true';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

const buscarClientes = async (termo) => {
    const query = 'SELECT * FROM cliente WHERE (nome ILIKE $1 OR cpf ILIKE $1) AND ativo = true';
    const termoBusca = `%${termo}%`;
    const { rows } = await pool.query(query, [termoBusca]);
    return rows;
};

module.exports = { getTodosCliente, postNovoCliente, deleteCliente, verificaCpfExistente, putCliente, getClientePorId, buscarClientes };