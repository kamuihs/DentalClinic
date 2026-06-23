const express = require('express');
const cors = require('cors');
const pacientesRoutes = require('./routes/pacientes');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/pacientes', pacientesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
