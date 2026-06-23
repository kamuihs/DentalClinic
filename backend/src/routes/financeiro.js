const express = require('express');
const router = express.Router();
const { getAllFinanceiro, createFinanceiro, updateFinanceiro, deleteFinanceiro } = require('../models/financeiro');

// GET todos os registros financeiros
router.get('/', async (req, res) => {
  try {
    const registros = await getAllFinanceiro();
    res.json(registros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST criar registro financeiro
router.post('/', async (req, res) => {
  try {
    const novoRegistro = await createFinanceiro(req.body);
    res.status(201).json(novoRegistro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT atualizar registro financeiro
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await updateFinanceiro(req.params.id, req.body);
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE remover registro financeiro
router.delete('/:id', async (req, res) => {
  try {
    await deleteFinanceiro(req.params.id);
    res.json({ message: 'Registro financeiro removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
