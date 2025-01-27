import axios from 'axios';

const API_URL = 'https://gearserp.onrender.com/api/pecas';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dmwp8u6ap/image/upload';

// GET - Buscar todas as peças
export const getPecas = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar peças: ' + error.message);
    }
};

// GET - Buscar peças por termo de busca
export const buscarPecas = async (termo) => {
    try {
        const response = await axios.get(`${API_URL}/buscar`, { params: { termo } });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar peças: ' + error.message);
    }
};

// Função auxiliar para upload de imagem no Cloudinary
const uploadImagemCloudinary = async (imagem) => {
    try {
        const formData = new FormData();
        formData.append('file', imagem);
        formData.append('api_key', '238722723988965');
        
        const response = await axios.post(CLOUDINARY_URL, formData);
        return response.data.secure_url;
    } catch (error) {
        throw new Error('Erro no upload da imagem: ' + error.message);
    }
};

// POST - Criar nova peça com upload de imagem
export const criarPeca = async (formData) => {
    try {
        // Upload da imagem se existir
        let imagem_url = null;
        const imagemFile = formData.get('imagem');
        
        if (imagemFile) {
            imagem_url = await uploadImagemCloudinary(imagemFile);
        }

        // Cria o objeto com os dados da peça
        const pecaData = {
            nome: formData.get('nome'),
            descricao: formData.get('descricao'),
            preco: formData.get('preco'),
            quantidade_estoque: formData.get('quantidade_estoque'),
            categoria: formData.get('categoria'),
            codigo_referencia: formData.get('codigo_referencia'),
            marca: formData.get('marca'),
            imagem_url
        };

        const response = await axios.post(API_URL, pecaData);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao criar peça: ' + error.message);
    }
};

// PUT - Atualizar peça existente com imagem
export const atualizarPeca = async (id, formData) => {
    try {
        // Verifica se tem nova imagem para upload
        let imagem_url = formData.get('imagem_url');
        const imagemFile = formData.get('imagem');
        
        if (imagemFile) {
            imagem_url = await uploadImagemCloudinary(imagemFile);
        }

        // Atualiza a peça com todos os dados
        const pecaData = {
            nome: formData.get('nome'),
            descricao: formData.get('descricao'),
            preco: formData.get('preco'),
            quantidade_estoque: formData.get('quantidade_estoque'),
            categoria: formData.get('categoria'),
            codigo_referencia: formData.get('codigo_referencia'),
            marca: formData.get('marca'),
            imagem_url
        };

        const response = await axios.put(`${API_URL}/${id}`, pecaData);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar peça: ' + error.message);
    }
};

// DELETE - Excluir peça
export const excluirPeca = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        // Se chegou aqui, mesmo com 404, consideramos sucesso
        return true;
    } catch (error) {
        // Se quiser verificar se é realmente um 404
        if (error.response?.status === 404) {
            // Item já foi excluído com sucesso
            return true;
        }
        // Para outros erros, mantemos o throw
        throw new Error('Erro ao excluir peça: ' + error.message);
    }
};