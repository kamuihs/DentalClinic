const express = require('express');
const router = express.Router();
const { getAllAgenda, createAgenda, updateAgenda, deleteAgenda } = require('../models/agenda');

// GET todos os horários
router.get('/', async (req, res) => {
  try {
    const horarios = await getAllAgenda();
    res.json(horarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST criar horário
router.post('/', async (req, res) => {
  try {
    const novoHorario = await createAgenda(req.body);
    res.status(201).json(novoHorario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT atualizar horário
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await updateAgenda(req.params.id, req.body);
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE remover horário
router.delete('/:id', async (req, res) => {
  try {
    await deleteAgenda(req.params.id);
    res.json({ message: 'Horário removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
