-- Pacientes
CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Profissionais
CREATE TABLE profissionais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    especialidade VARCHAR(100),
    registro_profissional VARCHAR(50) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Consultas
CREATE TABLE consultas (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    profissional_id INT REFERENCES profissionais(id),
    data_consulta TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'Agendada',
    observacoes TEXT
);


-- Prontuário
CREATE TABLE prontuario (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    consulta_id INT REFERENCES consultas(id),
    descricao TEXT NOT NULL,
    anexos TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financeiro (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    valor NUMERIC(10,2) NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- Ex: pagamento, fatura
    status VARCHAR(50) DEFAULT 'Pendente',
    data_vencimento DATE,
    data_pagamento DATE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE estoque (
    id SERIAL PRIMARY KEY,
    nome_produto VARCHAR(150) NOT NULL,
    quantidade INT NOT NULL,
    unidade VARCHAR(50),
    valor_unitario NUMERIC(10,2),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movimentacoes_estoque (
    id SERIAL PRIMARY KEY,
    produto_id INT REFERENCES estoque(id),
    tipo VARCHAR(50) NOT NULL, -- entrada ou saída
    quantidade INT NOT NULL,
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacoes TEXT
);

CREATE TABLE crm (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    tipo_interacao VARCHAR(50), -- ligação, email, mensagem
    descricao TEXT,
    data_interacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) NOT NULL, -- admin, profissional, recepcionista
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clinicas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cnpj VARCHAR(14) UNIQUE,
    endereco TEXT,
    telefone VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios_clinicas (
    usuario_id INT REFERENCES usuarios(id),
    clinica_id INT REFERENCES clinicas(id),
    PRIMARY KEY (usuario_id, clinica_id)
);
