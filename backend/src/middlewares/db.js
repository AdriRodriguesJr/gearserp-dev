const { Pool } = require('pg');

const pool = new Pool({
    host: 'erp-db',
    user: 'arodrigues',
    password: '123456',
    database: 'gearserp',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
    max: 10,
    idleTimeoutMillis: 10000,
});

// Testando a conexão
pool.connect()
    .then(() => console.log('Conectado ao banco de dados PostgreSQL!'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

module.exports = pool;
