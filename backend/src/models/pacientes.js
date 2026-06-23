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

async function updatePaciente(id, paciente) {
  const { nome, cpf, data_nascimento, telefone, email, endereco } = paciente;
  const result = await pool.query(
    `UPDATE pacientes 
     SET nome=$1, cpf=$2, data_nascimento=$3, telefone=$4, email=$5, endereco=$6
     WHERE id=$7 RETURNING *`,
    [nome, cpf, data_nascimento, telefone, email, endereco, id]
  );
  return result.rows[0];
}

async function deletePaciente(id) {
  await pool.query('DELETE FROM pacientes WHERE id=$1', [id]);
}

module.exports = { getAllPacientes, createPaciente, updatePaciente, deletePaciente };
