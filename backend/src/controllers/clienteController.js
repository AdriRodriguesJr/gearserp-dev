const cliente = require('../models/clienteModel');

const getTodosCliente = async (req, res) => {
    console.log('Iniciando getTodosCliente');
    try {
        const results = await cliente.getTodosCliente();
        console.log(`${results.length} clientes encontrados`);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        res.status(500).json({ error: 'Erro ao buscar clientes', details: err.message });
    }
};

const postNovoCliente = async (req, res) => {
    console.log('Iniciando postNovoCliente no controlador');
    console.log('Dados recebidos:', req.body);
    const novoCliente = req.body;
    try {
        const existe = await cliente.verificaCpfExistente (novoCliente.cpf);
        if (existe) {
            console.log('CPF já cadastrado:', novoCliente.cpf);
            return res.status(400).json({ message: 'CPF já cadastrado' });
        }
        const result = await cliente.postNovoCliente(novoCliente);
        console.log('Novo cliente criado:', result);
        if (!result || !result.id) {
            throw new Error('Falha ao criar cliente: ID não gerado');
        }
        res.status(201).json({ message: 'Cliente criado com sucesso!', id: result.id });
    } catch (err) {
        console.error('Erro ao criar cliente:', err);
        res.status(500).json({ error: 'Erro ao criar cliente', details: err.message });
    }
};


const putCliente = async (req, res) => {
    console.log('Iniciando putCliente');
    const id = req.params.id;
    const clienteAtualizado = req.body;
    console.log(`Atualizando cliente ID: ${id}`, clienteAtualizado);

    if (!id) {
        return res.status(400).json({ message: 'ID do cliente é necessário' });
    }

    try {
        const result = await cliente.putCliente(id, clienteAtualizado);
        if (!result) {
            console.log(`Cliente não encontrado para atualização. ID: ${id}`);
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        console.log('Cliente atualizado com sucesso');
        res.json({ message: 'Cliente atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({ error: 'Erro ao atualizar cliente', details: err.message });
    }
};

const deleteCliente = async (req, res) => {
    console.log('Iniciando deleteCliente');
    const id = req.params.id;
    console.log(`Deletando cliente ID: ${id}`);

    if (!id) {
        return res.status(400).json({ message: 'ID do cliente é necessário' });
    }

    try {
        const result = await cliente.deleteCliente(id);
        if (!result) {
            console.log(`Cliente não encontrado para exclusão. ID: ${id}`);
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        console.log('Cliente deletado com sucesso');
        res.json({ message: 'Cliente deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).json({ error: 'Erro ao deletar cliente', details: err.message });
    }
};

const getClientePorId = async (req, res) => {
    console.log('Iniciando getClientePorId');
    const id = req.params.id;
    console.log(`Buscando cliente ID: ${id}`);

    try {
        const result = await cliente.getClientePorId(id);
        if (!result) {
            console.log(`Cliente não encontrado. ID: ${id}`);
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        console.log('Cliente encontrado:', result);
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro ao buscar cliente', details: err.message });
    }
};

const buscarClientes = async (req, res) => {
    console.log('Iniciando buscarClientes');
    const termo = req.query.termo;
    console.log(`Termo de busca: "${termo}"`);

    if (!termo) {
        return res.status(400).json({ message: 'Termo de busca é necessário' });
    }

    try {
        const results = await cliente.buscarClientes(termo);
        console.log(`${results.length} clientes encontrados para o termo "${termo}"`);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        res.status(500).json({ error: 'Erro ao buscar clientes', details: err.message });
    }
};

module.exports = {
    getTodosCliente,
    postNovoCliente,
    putCliente,
    deleteCliente,
    getClientePorId,
    buscarClientes
};
