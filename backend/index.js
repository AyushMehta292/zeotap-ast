const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const types = require('@babel/types');
const generator = require('@babel/generator').default; // Import generator

const app = express();
app.use(cors());

// Load environment variables
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

// Original conditions
const conditions = [
    '(salary < 25 && branch === "sales") && (exp > 4)',
    '(salary < 25000 && branch === "sales") && (exp > 10)',
    '(salary < 30000 && branch === "hr") && (exp < 5)',
    '(salary > 20000 && branch === "marketing") && (age > 25)',
];

// Function to combine multiple ASTs with "||" (logical OR)
const combineASTs = (asts) => {
    return asts.reduce((combined, current) => {
        if (!combined) {
            return current;
        }
        return types.logicalExpression('||', combined, current);
    }, null);
};

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

// Combine all condition ASTs into one
const combinedAST = combineASTs(conditionASTs);
console.log('Combined AST:', combinedAST);




// Start the server
const CheckRoutes=require('./routes/check');
const CreateRoutes=require('./routes/add-rule');
const DeleteRoutes=require('./routes/delete');
const getRoutes=require('./routes/get');

app.use('/check',CheckRoutes);

app.use('/add-rule',CreateRoutes);

app.use('/delete',DeleteRoutes);

app.use('/get-rules',getRoutes)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(8080, (error) => {
    if (error) {
        console.error("Error in setting up the server:", error);
    }
});
