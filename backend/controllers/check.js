const generator = require('@babel/generator').default;
const parser = require('@babel/parser');
const NetRule = require('../models/FinalRule/FinalRule.jsx');

// Function to fetch and parse the latest NetRule
const getNetRule = async () => {
    try {
        const netRule = await NetRule.findOne(); // Fetch the latest NetRule document
        if (netRule && netRule.ruleString) {
            console.log('Fetched ruleString:', netRule.ruleString);
            return parser.parseExpression(netRule.ruleString); // Parse the rule string into an AST
        } else {
            console.log('No NetRule found or ruleString is empty.');
            return null; // Return null if no document is found or ruleString is empty
        }
    } catch (error) {
        console.error('Error fetching the NetRule:', error);
        return null;
    }
};

// Function to evaluate the AST
const evaluateAST = (ast, data) => {
    try {
        // Generate JavaScript code from the AST
        const generatedCode = generator(ast).code;
        console.log('Generated code:', generatedCode);
        console.log('Data provided for evaluation:', data);

        // Check if the required properties are present in the data
        const requiredProperties = ['salary', 'branch', 'exp', 'age'];
        const missingProperties = requiredProperties.filter(prop => !(prop in data));

        if (missingProperties.length > 0) {
            console.error('Missing required properties in data:', missingProperties);
            return false;
        }

        // Create a function that evaluates the generated code with the provided data
        const conditionFunction = new Function('data', `
            try {
                const { salary, branch, exp, age } = data; // Destructure data properties
                return ${generatedCode};
            } catch (error) {
                console.error('Error evaluating generated code:', error.message);
                return false;
            }
        `);

        // Execute the function and return the result
        return conditionFunction(data);
    } catch (error) {
        console.error('Error in evaluateAST function:', error.message);
        return false;
    }
};

// Validate function to handle incoming requests
const Validate = async (req, res) => {
    let data = "";

    req.on("data", (dt) => {
        data += dt;
    });

    req.on("end", async () => {
        try {
            // Safely parse incoming data
            let parsedData;
            try {
                parsedData = JSON.parse(data).checks;
            } catch (parseError) {
                console.error('Error parsing incoming data:', parseError.message);
                res.status(400).send('Invalid JSON format.');
                return;
            }

            // Ensure parsed data is valid
            if (!parsedData) {
                console.error('No checks data received.');
                res.status(400).send('No checks data provided.');
                return;
            }

            // Fetch and parse the NetRule expression
            const sampleAst = await getNetRule();
            if (!sampleAst) {
                res.status(400).send('No valid NetRule found.');
                return;
            }

            // Evaluate the AST with the provided data
            const isValid = evaluateAST(sampleAst, parsedData);

            // Respond with the evaluation result
            res.send({ isValid });
        } catch (error) {
            console.error('Error during validation:', error.message);
            res.status(500).send('Error during validation.');
        }
    });
};

module.exports = Validate;
