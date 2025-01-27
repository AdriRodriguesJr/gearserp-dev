const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Para carregar variáveis de ambiente
const app = express();
const Routes = require('./src/routes/Routes');

// Middleware para tratar erros em funções assíncronas
require('express-async-errors');

// Configuração de CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'https://gearserp.vercel.app'], // Ajuste conforme necessário
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Permite o envio de cookies, se necessário
};

app.use(cors(corsOptions));

// Parser para JSON
app.use(express.json());

// Rotas da API
app.use('/api', Routes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar o servidor
const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${port}`);
});
