const pool = require('./config/db');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Banco respondeu:', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('Erro ao consultar o banco:', err);
    process.exit(1);
  }
})();
