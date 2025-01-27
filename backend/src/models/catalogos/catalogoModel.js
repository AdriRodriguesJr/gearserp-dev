const pool = require('../../middlewares/db');

const Catalogo = {
    // Obter todos os itens do catálogo
    getCatalogo: async () => {
        const query = 'SELECT * FROM catalogo_servicos WHERE deleted_at IS NULL';
        const { rows } = await pool.query(query);
        return rows;
    },

    // Obter itens do catálogo por tipo de veículo
    getCatalogoPorTipo: async (tipoVeiculo) => {
        const query = 'SELECT * FROM catalogo_servicos WHERE tipo_veiculo = $1 AND deleted_at IS NULL';
        const { rows } = await pool.query(query, [tipoVeiculo]);
        return rows;
    },

    // Buscar itens no catálogo
    buscarCatalogo: async (termo) => {
        const query = `
            SELECT * FROM catalogo_servicos 
            WHERE (nome_servico ILIKE $1 OR descricao ILIKE $1) 
            AND deleted_at IS NULL
        `;
        const { rows } = await pool.query(query, [`%${termo}%`]);
        return rows;
    },

    // Adicionar um novo serviço ao catálogo
    postCatalogo: async (novoCatalogo) => {
        const { nome_servico, tipo_veiculo, descricao, preco, tempo_estimado } = novoCatalogo;
        const query = `
            INSERT INTO catalogo_servicos (nome_servico, tipo_veiculo, descricao, preco, tempo_estimado)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        const { rows } = await pool.query(query, [nome_servico, tipo_veiculo, descricao, preco, tempo_estimado]);
        return rows[0];
    },

    // Atualizar um serviço do catálogo
    putCatalogo: async (id, catalogoAtualizado) => {
        const { nome_servico, tipo_veiculo, descricao, preco, tempo_estimado } = catalogoAtualizado;
        const query = `
            UPDATE catalogo_servicos
            SET nome_servico = $1, tipo_veiculo = $2, descricao = $3, preco = $4, tempo_estimado = $5, updated_at = CURRENT_TIMESTAMP
            WHERE id = $6 AND deleted_at IS NULL
            RETURNING *
        `;
        const { rows } = await pool.query(query, [nome_servico, tipo_veiculo, descricao, preco, tempo_estimado, id]);
        return rows[0];
    },

    // Deletar um serviço do catálogo (soft delete)
    deleteCatalogo: async (id) => {
        const query = `
            UPDATE catalogo_servicos
            SET deleted_at = CURRENT_TIMESTAMP
            WHERE id = $1 AND deleted_at IS NULL
            RETURNING *
        `;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }
};

module.exports = Catalogo;
