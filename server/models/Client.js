const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const clientSchema = new mongoose.Schema({
    clientId: { type: String, required: true, unique: true },
    clientName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // For login
    companyName: { type: String, required: true },
    allowedAwardCategories: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
clientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
clientSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Client', clientSchema);
