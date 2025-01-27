import { useState, useCallback } from 'react';
import { criarPeca, atualizarPeca } from '../api/estoqueApi';

// Estado inicial do formulário
const initialFormData = {
    nome: '',
    descricao: '',
    preco: '',
    quantidade_estoque: '',
    categoria: '',
    codigo_referencia: '',
    marca: '',
    imagem: null,
    imagem_url: ''
};

export const useEstoqueForm = () => {
    // Estado para dados do formulário
    const [formData, setFormData] = useState(initialFormData);
    // Estado para preview da imagem
    const [imagemPreview, setImagemPreview] = useState(null);
    // Estado para controlar loading durante operações
    const [loading, setLoading] = useState(false);
    // Estado para armazenar erros do formulário
    const [error, setError] = useState(null);

    // Atualiza um campo específico do formulário
    const handleInputChange = useCallback((name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    // Gerencia o upload e preview da imagem
    const handleImagemChange = useCallback((file) => {
        if (file) {
            // Cria URL temporária para preview
            const previewUrl = URL.createObjectURL(file);
            setImagemPreview(previewUrl);
            setFormData(prev => ({ ...prev, imagem: file }));
        }
    }, []);

    // Salva ou atualiza uma peça
    const salvarPeca = useCallback(async (peca, isEditing) => {
        setLoading(true);
        try {
            // Prepara o FormData com todos os campos
            const formDataToSend = new FormData();
            Object.keys(peca).forEach(key => {
                if (key === 'imagem' && peca[key]) {
                    formDataToSend.append('imagem', peca[key]);
                } else {
                    formDataToSend.append(key, peca[key]);
                }
            });

            if (isEditing) {
                await atualizarPeca(peca.id, formDataToSend);
            } else {
                await criarPeca(formDataToSend);
            }
            setError(null);
            setLoading(false);
            return { success: true };
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return { success: false, error: error.message };
        }
    }, []);

    // Limpa o formulário e preview da imagem
    const resetForm = useCallback(() => {
        setFormData(initialFormData);
        setImagemPreview(null);
        setError(null);

        // Limpa URLs de preview
        if (imagemPreview) {
            URL.revokeObjectURL(imagemPreview);
        }
    }, [imagemPreview]);

    return {
        formData,
        imagemPreview,
        loading,
        error,
        handleInputChange,
        handleImagemChange,
        salvarPeca,
        resetForm,
        setFormData
    };
};