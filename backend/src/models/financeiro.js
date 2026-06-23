const pool = require('../config/db');

async function getAllFinanceiro() {
  const result = await pool.query(`
    SELECT f.id, c.id AS consulta_id, p.nome AS paciente, f.valor, f.tipo, f.status, f.data_pagamento, f.observacoes
    FROM financeiro f
    JOIN consultas c ON f.consulta_id = c.id
    JOIN pacientes p ON c.paciente_id = p.id
  `);
  return result.rows;
}

async function createFinanceiro(financeiro) {
  const { consulta_id, valor, tipo, status, data_pagamento, observacoes } = financeiro;
  const result = await pool.query(
    `INSERT INTO financeiro (consulta_id, valor, tipo, status, data_pagamento, observacoes)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [consulta_id, valor, tipo, status, data_pagamento, observacoes]
  );
  return result.rows[0];
}

async function updateFinanceiro(id, financeiro) {
  const { valor, tipo, status, data_pagamento, observacoes } = financeiro;
  const result = await pool.query(
    `UPDATE financeiro 
     SET valor=$1, tipo=$2, status=$3, data_pagamento=$4, observacoes=$5
     WHERE id=$6 RETURNING *`,
    [valor, tipo, status, data_pagamento, observacoes, id]
  );
  return result.rows[0];
}

async function deleteFinanceiro(id) {
  await pool.query('DELETE FROM financeiro WHERE id=$1', [id]);
}

module.exports = { getAllFinanceiro, createFinanceiro, updateFinanceiro, deleteFinanceiro };
