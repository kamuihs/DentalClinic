const fs = require('fs');
const path = require('path');
const pool = require('./src/config/db');

async function runSeeds() {
  try {
    const seedsDir = path.join(__dirname, '/db/seeds');
    const files = fs.readdirSync(seedsDir).sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(seedsDir, file), 'utf8');
      console.log(`🌱 Executando seed: ${file}`);
      await pool.query(sql);
    }

    console.log('✅ Seeds aplicados com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao aplicar seeds:', err);
    process.exit(1);
  }
}

runSeeds();
