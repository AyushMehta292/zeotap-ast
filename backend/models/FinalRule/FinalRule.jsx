const mongoose = require('mongoose');

// Schema for storing a single string
const NetRuleSchema = new mongoose.Schema({
    ruleString: { type: String, required: true }
});

const NetRule = mongoose.model('NetRule', NetRuleSchema);

module.exports = NetRule;
