// api/dashboardApi.js
import axios from 'axios';

// Configuração global do Axios
axios.defaults.baseURL = 'https://gearserp.onrender.com';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Interceptor para logging
axios.interceptors.request.use(request => {
    console.log('Iniciando requisição:', request.url);
    return request;
});

axios.interceptors.response.use(
    response => {
        console.log('Resposta recebida:', response.status);
        return response;
    },
    error => {
        console.log('Erro na requisição:', error.message);
        return Promise.reject(error);
    }
);

export const fetchLucroBruto = async (intervalo) => {
    try {
        const response = await axios.get('/api/dashboard/lucro-bruto', {
            params: { intervalo }
        });

        if (!response.data || !Array.isArray(response.data)) {
            throw new Error('Dados de lucro bruto inválidos ou não recebidos da API');
        }

        const formattedData = response.data.map(item => ({
            periodo: item.periodo,
            lucro_bruto: parseFloat(item.lucro_bruto) || 0
        }));

        return formattedData;
    } catch (error) {
        console.error('Erro ao buscar lucro bruto:', error);
        throw error;
    }
};

export const fetchServicosAprovados = async () => {
    try {
        const response = await axios.get('/api/dashboard/servicos-aprovados');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar serviços aprovados:', error);
        throw error;
    }
};