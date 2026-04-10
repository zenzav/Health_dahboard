const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const auth = require('../middleware/authMiddleware');

// GET /api/staff
router.get('/', auth, async (req, res) => {
  try {
    const staff = await Staff.find()
      .populate('departmentId', 'name')
      .sort({ createdAt: -1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/staff/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const member = await Staff.findById(req.params.id).populate('departmentId', 'name');
    if (!member) return res.status(404).json({ message: 'Staff member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/staff
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, departmentId, role, status } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });

    const member = new Staff({ name, email, phone, departmentId: departmentId || null, role, status });
    const saved = await member.save();
    const populated = await saved.populate('departmentId', 'name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/staff/:id
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.body.departmentId === '') req.body.departmentId = null;
    const updated = await Staff.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('departmentId', 'name');
    if (!updated) return res.status(404).json({ message: 'Staff member not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/staff/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Staff.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Staff member not found' });
    res.json({ message: 'Staff member deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
