const pool = require('../middlewares/db');

const getLucroBruto = async (intervalo) => {
    let groupBy, dateFormat;

    switch (intervalo) {
        case 'dia':
            groupBy = "DATE(data_conclusao)";
            dateFormat = 'DD/MM/YYYY';
            break;
        case 'semana':
            groupBy = "DATE_TRUNC('week', data_conclusao)";
            dateFormat = 'DD/MM/YYYY';
            break;
        case 'ano':
            groupBy = "DATE_TRUNC('year', data_conclusao)";
            dateFormat = 'YYYY';
            break;
        default:
            throw new Error('Intervalo inválido');
    }

    const query = `
        SELECT 
            TO_CHAR(${groupBy}, '${dateFormat}') AS periodo,
            COUNT(*) as total_os,
            COALESCE(SUM(valor_total), 0) AS valor_total
        FROM os
        WHERE status = 'concluida'
        AND data_conclusao IS NOT NULL
        AND data_conclusao >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY ${groupBy}, TO_CHAR(${groupBy}, '${dateFormat}')
        ORDER BY ${groupBy} DESC
        LIMIT 7
    `;

    try {
        const { rows } = await pool.query(query);
        console.log('Dados recuperados:', rows); // Para debug
        return rows.map(row => ({
            ...row,
            valor_total: Number(row.valor_total),
            total_os: Number(row.total_os)
        }));
    } catch (error) {
        console.error('Erro na consulta:', error);
        throw error;
    }
};

const getServicosAprovados = async () => {
    const query = `
        SELECT 
            cs.nome_servico,
            COUNT(*) as total_aprovados
        FROM os
        JOIN catalogo_servicos cs ON os.servico_id = cs.id
        WHERE os.status = 'concluida' OR os.status = 'em andamento'
        GROUP BY cs.nome_servico
        ORDER BY total_aprovados DESC
        LIMIT 10
    `;

    const { rows } = await pool.query(query);
    return rows;
};

module.exports = { getLucroBruto, getServicosAprovados };
