const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthDate: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    expertise: { type: String, required: true },
    availability: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Data', DataSchema);
