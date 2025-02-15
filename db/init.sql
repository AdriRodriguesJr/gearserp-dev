DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'gearserp') THEN
        CREATE DATABASE gearserp WITH OWNER = arodrigues;
    END IF;
END $$;

CREATE TYPE nivel_acesso_enum AS ENUM ('administrador', 'gerente', 'operador');

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nivel_acesso nivel_acesso_enum NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL, -- Deve ser um hash seguro no backend!
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TYPE genero_enum AS ENUM('M', 'F', 'O');
CREATE TYPE tipo_cliente_enum AS ENUM('fisica', 'juridica');

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    ativo BOOLEAN DEFAULT true,
    telefone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    cep VARCHAR(9),
    endereco VARCHAR(255),
    numero INT,
    genero genero_enum,
    estado CHAR(2),
    cidade VARCHAR(100),
    tipo tipo_cliente_enum,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE INDEX idx_cpf ON cliente(cpf);
CREATE INDEX idx_nome ON cliente(nome);

CREATE TYPE tipo_veiculo_enum AS ENUM('carro', 'moto', 'van', 'caminhão', 'aquatico', 'outros');

CREATE TABLE veiculo (
    id SERIAL PRIMARY KEY,
    tipo tipo_veiculo_enum,
    ano INT,
    montadora VARCHAR(100),
    modelo VARCHAR(100),
    placa VARCHAR(9) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE INDEX idx_placa ON veiculo(placa);

CREATE TABLE fornecedores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    contato VARCHAR(100),
    telefone VARCHAR(20),
    email VARCHAR(255),
    endereco VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE itens (
    id SERIAL PRIMARY KEY,
    nome_peca VARCHAR(255) NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    quantidade INT DEFAULT 0,
    valor_unitario DECIMAL(10,2),
    fornecedor_id INT REFERENCES fornecedores(id),
    localizacao VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TYPE status_os_enum AS ENUM(
    'orcamento_em_andamento', 
    'orcamento_aprovado', 
    'orcamento_reprovado', 
    'pendente', 
    'em_andamento', 
    'concluida'
);

CREATE TABLE os (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL REFERENCES cliente(id),
    modelo VARCHAR(255),
    ano INT,
    descricao TEXT,
    valor_total DECIMAL(10,2),
    status status_os_enum DEFAULT 'orcamento_em_andamento',
    data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    previsao_entrega TIMESTAMP,
    data_conclusao TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE os_itens (
    id SERIAL PRIMARY KEY,
    os_id INT NOT NULL REFERENCES os(id),
    item_id INT NOT NULL REFERENCES itens(id),
    quantidade INT DEFAULT 1,
    valor_unitario DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuario (nivel_acesso, nome, email, senha, ativo, created_at)
VALUES (
    'administrador', 
    'Adriano Rodrigues', 
    'adriano.rodrigues.junior01@gmail.com', 
    'teste123',
    true,
    CURRENT_TIMESTAMP
);
