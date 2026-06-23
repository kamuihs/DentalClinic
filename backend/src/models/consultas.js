const pool = require('../config/db');

async function getAllConsultas() {
  const result = await pool.query(`
    SELECT c.id, p.nome AS paciente, pr.nome AS profissional, c.data_consulta, c.status, c.observacoes
    FROM consultas c
    JOIN pacientes p ON c.paciente_id = p.id
    JOIN profissionais pr ON c.profissional_id = pr.id
  `);
  return result.rows;
}

async function createConsulta(consulta) {
  const { paciente_id, profissional_id, data_consulta, status, observacoes } = consulta;
  const result = await pool.query(
    `INSERT INTO consultas (paciente_id, profissional_id, data_consulta, status, observacoes)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [paciente_id, profissional_id, data_consulta, status, observacoes]
  );
  return result.rows[0];
}

async function updateConsulta(id, consulta) {
  const { paciente_id, profissional_id, data_consulta, status, observacoes } = consulta;
  const result = await pool.query(
    `UPDATE consultas 
     SET paciente_id=$1, profissional_id=$2, data_consulta=$3, status=$4, observacoes=$5
     WHERE id=$6 RETURNING *`,
    [paciente_id, profissional_id, data_consulta, status, observacoes, id]
  );
  return result.rows[0];
}

async function deleteConsulta(id) {
  await pool.query('DELETE FROM consultas WHERE id=$1', [id]);
}

module.exports = { getAllConsultas, createConsulta, updateConsulta, deleteConsulta };
