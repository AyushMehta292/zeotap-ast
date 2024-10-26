const Rules = require('../models/Rules/Rules.jsx');
const getRule = async(req,res)=>{
    const allRules = await Rules.find();
    res.send(allRules);
}
module.exports = getRule;