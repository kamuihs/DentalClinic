CREATE TABLE IF NOT EXISTS estoque (
    id SERIAL PRIMARY KEY,
    nome_produto VARCHAR(150) NOT NULL,
    quantidade INT NOT NULL,
    unidade VARCHAR(50),
    valor_unitario NUMERIC(10,2),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
