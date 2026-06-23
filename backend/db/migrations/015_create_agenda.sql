CREATE TABLE IF NOT EXISTS agenda (
  id SERIAL PRIMARY KEY,
  profissional_id INT NOT NULL REFERENCES profissionais(id) ON DELETE CASCADE,
  data_hora TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'Disponível', -- Disponível, Reservado, Cancelado
  observacoes TEXT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
