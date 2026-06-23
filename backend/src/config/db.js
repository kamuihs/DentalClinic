const { Pool } = require('pg');
require('dotenv').config();
console.log('Senha carregada:', process.env.DB_PASSWORD);


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('✅ Conectado ao PostgreSQL com sucesso!');
});

pool.on('error', (err) => {
  console.error('❌ Erro na conexão com o banco:', err);
});

module.exports = pool;
