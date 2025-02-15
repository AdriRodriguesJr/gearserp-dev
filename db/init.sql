CREATE DATABASE gearserp;

\c gearserp;

CREATE TYPE nivel_acesso_enum AS ENUM ('administrador', 'gerente', 'operador');

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nivel_acesso nivel_acesso_enum NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
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
    placa VARCHAR(8) UNIQUE,
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

CREATE INDEX idx_nome ON fornecedores(nome);
CREATE INDEX idx_cnpj ON fornecedores(cnpj);

CREATE TABLE itens (
    id SERIAL PRIMARY KEY,
    nome_peca VARCHAR(255) NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    quantidade INT DEFAULT 0,
    valor_unitario DECIMAL(10,2),
    data_entrada DATE DEFAULT CURRENT_DATE,
    fornecedor_id INT,
    localizacao VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)
);

CREATE INDEX idx_nome_peca ON itens(nome_peca);

CREATE TYPE tipo_veiculo_servico_enum AS ENUM('carro', 'moto', 'caminhao', 'outros');

CREATE TABLE catalogo_servicos (
    id SERIAL PRIMARY KEY,
    nome_servico VARCHAR(255) NOT NULL,
    tipo_veiculo tipo_veiculo_servico_enum,
    descricao TEXT,
    preco DECIMAL(10,2),
    tempo_estimado VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TYPE veiculo_tipo_enum AS ENUM('Carro', 'Moto', 'Caminhonete', 'Caminhão', 'Outros');
CREATE TYPE status_os_enum AS ENUM(
    'orcamento em andamento', 
    'orcamento aprovado', 
    'orcamento reprovado', 
    'pendente', 
    'em andamento', 
    'concluída'
);

CREATE TABLE os (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL,
    veiculo_tipo veiculo_tipo_enum,
    servico_id INT,
    concessionaria VARCHAR(255),
    modelo VARCHAR(255),
    ano INT,
    descricao TEXT,
    valor_total DECIMAL(10,2),
    status status_os_enum DEFAULT 'orcamento em andamento',
    data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    previsao_entrega TIMESTAMP,
    data_conclusao TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (servico_id) REFERENCES catalogo_servicos(id)
);

CREATE INDEX idx_status ON os(status);
CREATE INDEX idx_data_entrada ON os(data_entrada);

CREATE TABLE os_itens (
    id SERIAL PRIMARY KEY,
    os_id INT NOT NULL,
    item_id INT NOT NULL,
    quantidade INT DEFAULT 1,
    valor_unitario DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (os_id) REFERENCES os(id),
    FOREIGN KEY (item_id) REFERENCES itens(id)
);

INSERT INTO usuario (nivel_acesso, nome, email, senha, ativo, created_at)
VALUES (
    'administrador', 
    'Adriano Rodrigues', 
    'adriano.rodrigues.junior01@gmail.com', 
    'Gearserp@2023',
    true,
    CURRENT_TIMESTAMP
);