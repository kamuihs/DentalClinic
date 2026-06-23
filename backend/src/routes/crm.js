const express = require('express');
const router = express.Router();
const { getAllCrm, createCrm, updateCrm, deleteCrm } = require('../models/crm');

// GET todos os contatos
router.get('/', async (req, res) => {
  try {
    const contatos = await getAllCrm();
    res.json(contatos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST criar contato
router.post('/', async (req, res) => {
  try {
    const novoContato = await createCrm(req.body);
    res.status(201).json(novoContato);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT atualizar contato
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await updateCrm(req.params.id, req.body);
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE remover contato
router.delete('/:id', async (req, res) => {
  try {
    await deleteCrm(req.params.id);
    res.json({ message: 'Contato removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
