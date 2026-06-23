CREATE TABLE IF NOT EXISTS financeiro (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    valor NUMERIC(10,2) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pendente',
    data_vencimento DATE,
    data_pagamento DATE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
