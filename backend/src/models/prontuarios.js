const pool = require('../config/db');

async function getAllProntuarios() {
  const result = await pool.query(`
    SELECT pr.id, c.id AS consulta_id, p.nome AS paciente, pr.descricao, pr.anexos, pr.criado_em
    FROM prontuarios pr
    JOIN consultas c ON pr.consulta_id = c.id
    JOIN pacientes p ON c.paciente_id = p.id
  `);
  return result.rows;
}

async function createProntuario(prontuario) {
  const { consulta_id, descricao, anexos } = prontuario;
  const result = await pool.query(
    `INSERT INTO prontuarios (consulta_id, descricao, anexos)
     VALUES ($1, $2, $3) RETURNING *`,
    [consulta_id, descricao, anexos]
  );
  return result.rows[0];
}

async function updateProntuario(id, prontuario) {
  const { descricao, anexos } = prontuario;
  const result = await pool.query(
    `UPDATE prontuarios 
     SET descricao=$1, anexos=$2
     WHERE id=$3 RETURNING *`,
    [descricao, anexos, id]
  );
  return result.rows[0];
}

async function deleteProntuario(id) {
  await pool.query('DELETE FROM prontuarios WHERE id=$1', [id]);
}

module.exports = { getAllProntuarios, createProntuario, updateProntuario, deleteProntuario };
