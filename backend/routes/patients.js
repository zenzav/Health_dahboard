const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const auth = require('../middleware/authMiddleware');

// GET /api/patients  (supports ?startDate=&endDate= filters)
router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = {};

    if (startDate || endDate) {
      filter.admissionDate = {};
      if (startDate) filter.admissionDate.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.admissionDate.$lte = end;
      }
    }

    const patients = await Patient.find(filter).sort({ admissionDate: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/patients/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/patients
router.post('/', auth, async (req, res) => {
  try {
    const { name, age, gender, contact, admissionDate, medicineDetails } = req.body;
    if (!name) return res.status(400).json({ message: 'Patient name is required' });

    const patient = new Patient({ name, age, gender, contact, admissionDate, medicineDetails });
    const saved = await patient.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/patients/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Patient not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/patients/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
