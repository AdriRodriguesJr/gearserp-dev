const pool = require('../middlewares/db');

// Busca todos os orçamentos em andamento
const getOrcamentos = async () => {
    const query = "SELECT * FROM os WHERE status = 'orcamento em andamento' AND deleted_at IS NULL";
    const { rows } = await pool.query(query);
    return rows;
};

// Busca todas as ordens de serviço pendentes ou em andamento
const getOrdensServico = async () => {
    const query = "SELECT * FROM os WHERE status IN ('pendente', 'em andamento') AND deleted_at IS NULL";
    const { rows } = await pool.query(query);
    return rows;
};

// Busca todas as ordens de serviço finalizadas (reprovadas ou concluídas)
const getFinalizados = async () => {
    const query = "SELECT * FROM os WHERE status IN ('orcamento reprovado', 'concluida')";
    const { rows } = await pool.query(query);
    return rows;
};

// Insere uma nova ordem de serviço
const postNovaOs = async (osData) => {
    const { cliente_id, veiculo_tipo, servico_id, concessionaria, modelo, ano, descricao, valor_total, status, previsao_entrega } = osData;
    const query = 'INSERT INTO os (cliente_id, veiculo_tipo, servico_id, concessionaria, modelo, ano, descricao, valor_total, status, previsao_entrega, data_entrada) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP) RETURNING *';
    const { rows } = await pool.query(query, [cliente_id, veiculo_tipo, servico_id, concessionaria, modelo, ano, descricao, valor_total, status || 'orcamento em andamento', previsao_entrega]);
    return rows[0];
};

const postPecasOS = async (osId, pecas) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const peca of pecas) {
            await client.query(
                'INSERT INTO os_pecas (os_id, peca_id, quantidade_usada, valor_unitario, valor_total) VALUES ($1, $2, $3, $4, $5)',
                [osId, peca.id, peca.quantidade_usada, peca.preco, peca.valor_total]
            );

            await client.query(
                'UPDATE pecas SET quantidade_estoque = quantidade_estoque - $1 WHERE id = $2',
                [peca.quantidade_usada, peca.id]
            );
        }

        await client.query('COMMIT');
        return true;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Busca peças de uma OS
const getPecasOS = async (osId) => {
    const query = `
        SELECT p.*, op.quantidade_usada, op.valor_unitario, op.valor_total
        FROM os_pecas op 
        JOIN pecas p ON p.id = op.peca_id 
        WHERE op.os_id = $1
    `;
    const { rows } = await pool.query(query, [osId]);
    return rows;
};

// Remove uma peça da OS
const deletePecaOS = async (osPecaId) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { rows } = await client.query(
            'SELECT peca_id, quantidade_usada FROM os_pecas WHERE id = $1',
            [osPecaId]
        );

        if (rows.length === 0) {
            return null;
        }

        await client.query(
            'UPDATE pecas SET quantidade_estoque = quantidade_estoque + $1 WHERE id = $2',
            [rows[0].quantidade_usada, rows[0].peca_id]
        );

        await client.query('DELETE FROM os_pecas WHERE id = $1', [osPecaId]);

        await client.query('COMMIT');
        return { success: true };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Atualiza uma ordem de serviço existente
const putOs = async (id, osData) => {
    const { cliente_id, veiculo_tipo, servico_id, concessionaria, modelo, ano, descricao, valor_total, status, previsao_entrega } = osData;
    const query = 'UPDATE os SET cliente_id = $1, veiculo_tipo = $2, servico_id = $3, concessionaria = $4, modelo = $5, ano = $6, descricao = $7, valor_total = $8, status = $9, previsao_entrega = $10, updated_at = CURRENT_TIMESTAMP WHERE id = $11 AND deleted_at IS NULL RETURNING *';
    const { rows } = await pool.query(query, [cliente_id, veiculo_tipo, servico_id, concessionaria, modelo, ano, descricao, valor_total, status, previsao_entrega, id]);
    return rows[0];
};

// Realiza uma exclusão lógica de uma ordem de serviço
const deleteOs = async (id) => {
    const query = 'UPDATE os SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

// Aprova um orçamento, mudando seu status para "pendente"
const aprovarOrcamento = async (id) => {
    const query = "UPDATE os SET status = 'pendente', updated_at = CURRENT_TIMESTAMP WHERE id = $1 AND status = 'orcamento em andamento' RETURNING *";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

// Busca ordens de serviço com base em um termo de pesquisa e tipo (orçamento ou OS)
const buscarOs = async (termo, tipo) => {
    let query = 'SELECT os.*, cliente.nome AS nome_cliente, catalogo_servicos.nome_servico FROM os LEFT JOIN cliente ON os.cliente_id = cliente.id LEFT JOIN catalogo_servicos ON os.servico_id = catalogo_servicos.id WHERE (cliente.nome ILIKE $1 OR os.modelo ILIKE $1 OR catalogo_servicos.nome_servico ILIKE $1) AND os.deleted_at IS NULL';
    const params = [`%${termo}%`];

    if (tipo === 'orcamento') {
        query += " AND os.status IN ('orcamento em andamento', 'orcamento aprovado', 'orcamento reprovado')";
    } else if (tipo === 'os') {
        query += " AND os.status IN ('pendente', 'em andamento', 'concluída')";
    }

    const { rows } = await pool.query(query, params);
    return rows;
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