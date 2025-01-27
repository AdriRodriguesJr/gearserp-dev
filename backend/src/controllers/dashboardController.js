const dashboardModel = require('../models/dashboardModel');

const getLucroBruto = async (req, res) => {
    const { intervalo } = req.query;
    try {
        const results = await dashboardModel.getLucroBruto(intervalo);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar lucro bruto:', err);
        res.status(500).json({ error: err.message });
    }
};

const getServicosAprovados = async (req, res) => {
    try {
        const results = await dashboardModel.getServicosAprovados();
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar serviços aprovados:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getLucroBruto,
    getServicosAprovados
};
