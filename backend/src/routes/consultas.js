const express = require('express');
const router = express.Router();
const { getAllConsultas, createConsulta, updateConsulta, deleteConsulta } = require('../models/consultas');

// GET todas as consultas
router.get('/', async (req, res) => {
  try {
    const consultas = await getAllConsultas();
    res.json(consultas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST criar consulta
router.post('/', async (req, res) => {
  try {
    const novaConsulta = await createConsulta(req.body);
    res.status(201).json(novaConsulta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT atualizar consulta
router.put('/:id', async (req, res) => {
  try {
    const atualizada = await updateConsulta(req.params.id, req.body);
    res.json(atualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE remover consulta
router.delete('/:id', async (req, res) => {
  try {
    await deleteConsulta(req.params.id);
    res.json({ message: 'Consulta removida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
