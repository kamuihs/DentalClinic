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
