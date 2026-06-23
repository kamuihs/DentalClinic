CREATE TABLE IF NOT EXISTS prontuario (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    consulta_id INT REFERENCES consultas(id),
    descricao TEXT NOT NULL,
    anexos TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
