const express = require('express');
const router = express.Router();
const { getAllPacientes, createPaciente } = require('../models/pacientes');

// GET todos os pacientes
router.get('/', async (req, res) => {
  try {
    const pacientes = await getAllPacientes();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST criar paciente
router.post('/', async (req, res) => {
  try {
    const novoPaciente = await createPaciente(req.body);
    res.status(201).json(novoPaciente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
