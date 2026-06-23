CREATE TABLE IF NOT EXISTS pacientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    endereco TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profissionais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    especialidade VARCHAR(100),
    registro_profissional VARCHAR(50) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS consultas (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    profissional_id INT REFERENCES profissionais(id),
    data_consulta TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'Agendada',
    observacoes TEXT
);
CREATE TABLE IF NOT EXISTS prontuarios (
  id SERIAL PRIMARY KEY,
  consulta_id INT NOT NULL REFERENCES consultas(id) ON DELETE CASCADE,
  descricao TEXT NOT NULL,
  anexos TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS estoque (
    id SERIAL PRIMARY KEY,
    nome_produto VARCHAR(150) NOT NULL,
    quantidade INT NOT NULL,
    unidade VARCHAR(50),
    valor_unitario NUMERIC(10,2),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS movimentacoes_estoque (
    id SERIAL PRIMARY KEY,
    produto_id INT REFERENCES estoque(id),
    tipo VARCHAR(50) NOT NULL,
    quantidade INT NOT NULL,
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacoes TEXT
);
CREATE TABLE IF NOT EXISTS crm (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    tipo_contato VARCHAR(50),
    descricao TEXT,
    data_contato TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    proximo_contato TIMESTAMP
);
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS financeiro (
  id SERIAL PRIMARY KEY,
  consulta_id INT NOT NULL REFERENCES consultas(id) ON DELETE CASCADE,
  valor NUMERIC(10,2) NOT NULL,
  tipo VARCHAR(20) NOT NULL, -- 'Receita' ou 'Despesa'
  status VARCHAR(20) DEFAULT 'Pendente', -- 'Pendente', 'Pago', 'Cancelado'
  data_pagamento DATE,
  observacoes TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS agenda (
  id SERIAL PRIMARY KEY,
  profissional_id INT NOT NULL REFERENCES profissionais(id) ON DELETE CASCADE,
  data_hora TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'Disponível', -- Disponível, Reservado, Cancelado
  observacoes TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
