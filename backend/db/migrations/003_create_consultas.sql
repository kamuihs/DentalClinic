CREATE TABLE IF NOT EXISTS consultas (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    profissional_id INT REFERENCES profissionais(id),
    data_consulta TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'Agendada',
    observacoes TEXT
);
