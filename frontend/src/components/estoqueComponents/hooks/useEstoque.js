import { useState, useCallback } from 'react';
import { getPecas, buscarPecas, excluirPeca } from '../api/estoqueApi';

export const useEstoque = () => {
    // Lista de peças carregadas
    const [pecas, setPecas] = useState([]);
    // Indica se está carregando dados
    const [loading, setLoading] = useState(false);
    // Mensagem de erro, se houver
    const [error, setError] = useState(null);

    // Busca todas as peças do servidor
    const fetchPecas = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getPecas();
            if (Array.isArray(data)) {
                setPecas(data);
            } else {
                setPecas([]);
            }
            setError(null);
        } catch (error) {
            setError(error.message);
            setPecas([]);
        }
        setLoading(false);
    }, []);

    // Busca peças com base no termo de pesquisa
    const handleBuscarPecas = useCallback(async (termo) => {
        setLoading(true);
        try {
            const data = await buscarPecas(termo);
            if (Array.isArray(data)) {
                setPecas(data);
            } else {
                setPecas([]);
            }
            setError(null);
        } catch (error) {
            setError(error.message);
            setPecas([]);
        }
        setLoading(false);
    }, []);

    // Exclui uma peça e atualiza a lista
    const handleExcluirPeca = useCallback(async (id) => {
        try {
            await excluirPeca(id);
            await fetchPecas();
            return { success: true };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        }
    }, [fetchPecas]);

    return {
        pecas,
        loading,
        error,
        fetchPecas,
        buscarPecas: handleBuscarPecas,
        excluirPeca: handleExcluirPeca
    };
};