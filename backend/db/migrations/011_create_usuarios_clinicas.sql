CREATE TABLE IF NOT EXISTS usuarios_clinicas (
    usuario_id INT REFERENCES usuarios(id),
    clinica_id INT REFERENCES clinicas(id),
    PRIMARY KEY (usuario_id, clinica_id)
);
