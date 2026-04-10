const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');
const auth = require('../middleware/authMiddleware');

// GET /api/equipments
router.get('/', auth, async (req, res) => {
  try {
    const equipments = await Equipment.find()
      .populate('departmentId', 'name')
      .sort({ createdAt: -1 });
    res.json(equipments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/equipments/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const eq = await Equipment.findById(req.params.id).populate('departmentId', 'name');
    if (!eq) return res.status(404).json({ message: 'Equipment not found' });
    res.json(eq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/equipments
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, departmentId, status, purchaseDate } = req.body;
    if (!name) return res.status(400).json({ message: 'Equipment name is required' });

    const equipment = new Equipment({ name, type, departmentId: departmentId || null, status, purchaseDate });
    const saved = await equipment.save();
    const populated = await saved.populate('departmentId', 'name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/equipments/:id
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.body.departmentId === '') req.body.departmentId = null;
    const updated = await Equipment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('departmentId', 'name');
    if (!updated) return res.status(404).json({ message: 'Equipment not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/equipments/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Equipment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Equipment not found' });
    res.json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
