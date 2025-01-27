const { Pool } = require('pg');

const pool = new Pool({
    host: 'dpg-csmou6ij1k6c73dm57qg-a.oregon-postgres.render.com',
    user: 'arodrigues',
    password: 'lk80lQjtIgs4OOoaGLItWUCDZRn1zE1b',
    database: 'gearserp_ts8d',
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
