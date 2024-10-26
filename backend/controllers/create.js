const parser = require('@babel/parser');
const types = require('@babel/types');
const generator = require('@babel/generator').default;
const Rules = require('../models/Rules/Rules.jsx');
const NetRule = require('../models/FinalRule/FinalRule.jsx');

// Function to combine ASTs
const combineASTs = (asts) => {
    return asts.reduce((combined, current) => {
        if (!combined) {
            return current;
        }
        return types.logicalExpression('||', combined, current);
    }, null);
};

// AddRule function to add a new rule and update the database
const AddRule = async (req, res) => {
    let data = '';
    req.on('data', (dt) => {
        data += dt;
    });
    req.on('end', async () => {
        try {
            data = JSON.parse(data);
            const newExpression = data.expression;

            // Create a new document in the Rules collection for the new expression
            const newRule = new Rules({ rulesArray: newExpression });
            await newRule.save();

            // Fetch all existing conditions from the database
            const allRules = await Rules.find();
            const conditions = allRules.map(rule => rule.rulesArray);

            // Add the new expression to the conditions array
            // conditions.push(newExpression);

            // Parse conditions into ASTs
            const conditionASTs = conditions.map(condition => {
                try {
                    const parsed = parser.parseExpression(condition);
                    return parsed;
                } catch (error) {
                    console.error(`Error parsing condition "${condition}":`, error.message);
                    return null;
                }
            }).filter(ast => ast !== null);

            // Combine the ASTs
            const combinedAST = combineASTs(conditionASTs);

            // Generate code from the combined AST
            const combinedASTCode = generator(combinedAST).code;

            // Update the existing NetRule or create a new one
            const netRule = await NetRule.findOneAndUpdate({}, { ruleString: combinedASTCode }, { new: true, upsert: true });

            res.status(201).json({ message: 'Rule saved successfully', netRule });
        } catch (error) {
            console.error('Error saving rule:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

module.exports = AddRule;
