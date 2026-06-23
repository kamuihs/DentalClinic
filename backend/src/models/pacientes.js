const pool = require('../config/db');

async function getAllPacientes() {
  const result = await pool.query('SELECT * FROM pacientes');
  return result.rows;
}

async function createPaciente(paciente) {
  const { nome, cpf, data_nascimento, telefone, email, endereco } = paciente;
  const result = await pool.query(
    `INSERT INTO pacientes (nome, cpf, data_nascimento, telefone, email, endereco)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [nome, cpf, data_nascimento, telefone, email, endereco]
  );
  return result.rows[0];
}

module.exports = { getAllPacientes, createPaciente };
