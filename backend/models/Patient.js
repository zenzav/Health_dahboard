const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, min: 0 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    contact: { type: String, trim: true },
    admissionDate: { type: Date, default: Date.now },
    medicineDetails: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
