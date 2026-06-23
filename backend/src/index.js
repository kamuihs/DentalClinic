const express = require('express');
const cors = require('cors');
const pacientesRoutes = require('./routes/pacientes');
const profissionaisRoutes = require('./routes/profissionais');
const consultasRoutes = require('./routes/consultas');
const prontuariosRoutes = require('./routes/prontuarios');
const financeiroRoutes = require('./routes/financeiro');
const agendaRoutes = require('./routes/agenda');
const crmRoutes = require('./routes/crm');






const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));
// Rotas
app.use('/pacientes', pacientesRoutes);
app.use('/profissionais', profissionaisRoutes);
app.use('/consultas', consultasRoutes);
app.use('/prontuarios', prontuariosRoutes);
app.use('/financeiro', financeiroRoutes);
app.use('/agenda', agendaRoutes);
app.use('/crm', crmRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
