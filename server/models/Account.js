const mongoose = require('mongoose');

const accountProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  addedAt: { type: Date, default: Date.now },
});

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [accountProductSchema],
});

module.exports = mongoose.model('Account', accountSchema);
