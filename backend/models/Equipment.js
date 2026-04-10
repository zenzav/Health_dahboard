const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, trim: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
    status: {
      type: String,
      enum: ['Available', 'In Use', 'Maintenance'],
      default: 'Available',
    },
    purchaseDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Equipment', equipmentSchema);
