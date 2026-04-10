const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const auth = require('../middleware/authMiddleware');

// GET /api/doctors
router.get('/', auth, async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate('departmentId', 'name')
      .sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/doctors/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('departmentId', 'name');
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/doctors
router.post('/', auth, async (req, res) => {
  try {
    const { name, specialization, phone, departmentId, status } = req.body;
    if (!name) return res.status(400).json({ message: 'Doctor name is required' });

    const doctor = new Doctor({ name, specialization, phone, departmentId: departmentId || null, status });
    const saved = await doctor.save();
    const populated = await saved.populate('departmentId', 'name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/doctors/:id
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.body.departmentId === '') req.body.departmentId = null;
    const updated = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('departmentId', 'name');
    if (!updated) return res.status(404).json({ message: 'Doctor not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/doctors/:id/toggle-status
router.patch('/:id/toggle-status', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    doctor.status = doctor.status === 'Active' ? 'Inactive' : 'Active';
    await doctor.save();
    await doctor.populate('departmentId', 'name');
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/doctors/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
