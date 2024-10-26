const mongoose = require('mongoose');

// Schema for storing an array of strings
const RulesSchema = new mongoose.Schema({
    rulesArray: { type: String, required: true }
});

const Rules = mongoose.model('Rules', RulesSchema);

module.exports = Rules;
