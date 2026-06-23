CREATE TABLE IF NOT EXISTS crm (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    tipo_interacao VARCHAR(50),
    descricao TEXT,
    data_interacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
