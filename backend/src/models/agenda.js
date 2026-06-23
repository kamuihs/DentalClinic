const pool = require('../config/db');

async function getAllAgenda() {
  const result = await pool.query(`
    SELECT a.id, pr.nome AS profissional, a.data_hora, a.status, a.observacoes
    FROM agenda a
    JOIN profissionais pr ON a.profissional_id = pr.id
    ORDER BY a.data_hora ASC
  `);
  return result.rows;
}

async function createAgenda(agenda) {
  const { profissional_id, data_hora, status, observacoes } = agenda;
  const result = await pool.query(
    `INSERT INTO agenda (profissional_id, data_hora, status, observacoes)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [profissional_id, data_hora, status, observacoes]
  );
  return result.rows[0];
}

async function updateAgenda(id, agenda) {
  const { profissional_id, data_hora, status, observacoes } = agenda;
  const result = await pool.query(
    `UPDATE agenda 
     SET profissional_id=$1, data_hora=$2, status=$3, observacoes=$4
     WHERE id=$5 RETURNING *`,
    [profissional_id, data_hora, status, observacoes, id]
  );
  return result.rows[0];
}

async function deleteAgenda(id) {
  await pool.query('DELETE FROM agenda WHERE id=$1', [id]);
}

module.exports = { getAllAgenda, createAgenda, updateAgenda, deleteAgenda };
