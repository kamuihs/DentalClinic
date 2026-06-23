const express = require('express');
const router = express.Router();
const { getAllProntuarios, createProntuario, updateProntuario, deleteProntuario } = require('../models/prontuarios');

// GET todos os prontuários
router.get('/', async (req, res) => {
  try {
    const prontuarios = await getAllProntuarios();
    res.json(prontuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST criar prontuário
router.post('/', async (req, res) => {
  try {
    const novoProntuario = await createProntuario(req.body);
    res.status(201).json(novoProntuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT atualizar prontuário
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await updateProntuario(req.params.id, req.body);
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE remover prontuário
router.delete('/:id', async (req, res) => {
  try {
    await deleteProntuario(req.params.id);
    res.json({ message: 'Prontuário removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
