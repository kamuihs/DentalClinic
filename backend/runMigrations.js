const fs = require('fs');
const path = require('path');
const pool = require('./src/config/db');

async function runMigrations() {
  try {
    const migrationsDir = path.join(__dirname, 'db/migrations');

    const files = fs.readdirSync(migrationsDir).sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      console.log(`🚀 Executando migration: ${file}`);
      await pool.query(sql);
    }

    console.log('✅ Todas as migrations foram aplicadas com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao aplicar migrations:', err);
    process.exit(1);
  }
}

runMigrations();
