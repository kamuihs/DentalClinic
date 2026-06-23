const pool = require('../config/db');

async function getAllCrm() {
  const result = await pool.query(`
    SELECT c.id, p.nome AS paciente, c.tipo_contato, c.descricao, c.data_contato, c.proximo_contato, c.status
    FROM crm c
    JOIN pacientes p ON c.paciente_id = p.id
    ORDER BY c.data_contato DESC
  `);
  return result.rows;
}

async function createCrm(crm) {
  const { paciente_id, tipo_contato, descricao, proximo_contato, status } = crm;
  const result = await pool.query(
    `INSERT INTO crm (paciente_id, tipo_contato, descricao, proximo_contato, status)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [paciente_id, tipo_contato, descricao, proximo_contato, status]
  );
  return result.rows[0];
}

async function updateCrm(id, crm) {
  const { tipo_contato, descricao, proximo_contato, status } = crm;
  const result = await pool.query(
    `UPDATE crm 
     SET tipo_contato=$1, descricao=$2, proximo_contato=$3, status=$4
     WHERE id=$5 RETURNING *`,
    [tipo_contato, descricao, proximo_contato, status, id]
  );
  return result.rows[0];
}

async function deleteCrm(id) {
  await pool.query('DELETE FROM crm WHERE id=$1', [id]);
}

module.exports = { getAllCrm, createCrm, updateCrm, deleteCrm };
