const pool = require('../config/db');

async function getAllProfissionais() {
  const result = await pool.query('SELECT * FROM profissionais');
  return result.rows;
}

async function createProfissional(profissional) {
  const { nome, especialidade, registro_profissional, telefone, email } = profissional;
  const result = await pool.query(
    `INSERT INTO profissionais (nome, especialidade, registro_profissional, telefone, email)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nome, especialidade, registro_profissional, telefone, email]
  );
  return result.rows[0];
}

async function updateProfissional(id, profissional) {
  const { nome, especialidade, registro_profissional, telefone, email } = profissional;
  const result = await pool.query(
    `UPDATE profissionais 
     SET nome=$1, especialidade=$2, registro_profissional=$3, telefone=$4, email=$5
     WHERE id=$6 RETURNING *`,
    [nome, especialidade, registro_profissional, telefone, email, id]
  );
  return result.rows[0];
}

async function deleteProfissional(id) {
  await pool.query('DELETE FROM profissionais WHERE id=$1', [id]);
}

module.exports = { getAllProfissionais, createProfissional, updateProfissional, deleteProfissional };
