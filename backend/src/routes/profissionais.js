const express = require('express');
const router = express.Router();
const { getAllProfissionais, createProfissional, updateProfissional, deleteProfissional } = require('../models/profissionais');

// GET todos os profissionais
router.get('/', async (req, res) => {
  try {
    const profissionais = await getAllProfissionais();
    res.json(profissionais);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST criar profissional
router.post('/', async (req, res) => {
  try {
    const novoProfissional = await createProfissional(req.body);
    res.status(201).json(novoProfissional);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT atualizar profissional
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await updateProfissional(req.params.id, req.body);
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE remover profissional
router.delete('/:id', async (req, res) => {
  try {
    await deleteProfissional(req.params.id);
    res.json({ message: 'Profissional removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
