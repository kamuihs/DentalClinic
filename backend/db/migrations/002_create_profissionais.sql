CREATE TABLE IF NOT EXISTS profissionais (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    especialidade VARCHAR(100),
    registro_profissional VARCHAR(50) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
