const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const Rules = require('../models/Rules/Rules.jsx');

const types = require('@babel/types');
const NetRule = require('../models/FinalRule/FinalRule.jsx');

const generator = require('@babel/generator').default; // Import generator
// const conditions = [
//     '(salary < 25 && branch === "sales") && (exp > 4)',
//     '(salary > 25000 && branch === "sales") && (exp > 10)',
//     '(salary > 30000 && branch === "hr") && (exp < 5)',
//     '(salary > 20000 && branch === "marketing") && (age > 25)',
// ];

const combineASTs = (asts) => {
    return asts.reduce((combined, current) => {
        if (!combined) {
            return current;
        }
         
        return types.logicalExpression('||', combined, current);
    }, null);
};
const Delete=async(req,res)=>{
    let data="";
    req.on("data",(dt)=>{
        data=dt;
    });
    
    req.on("end",async ()=>{
        data=JSON.parse(data);
        const deleteExp=data.deleteExp;
        //removing the expression to be deleted from the initial array
        console.log(deleteExp);
        await Rules.deleteMany({ rulesArray: deleteExp });
        

        const allRules = await Rules.find();
        const conditions = allRules.map(rule => rule.rulesArray);


        let conditionASTs = conditions.map(condition => {
            try {
                
                if(deleteExp!=condition){
                    const parsed = parser.parseExpression(condition);
                    return parsed;
                }
                return null;
            } catch (error) {
                console.error(`Error parsing condition "${condition}":`, error.message);
                return null;
            }
        }).filter(ast => ast !== null);
        
        

        const combinedAST = combineASTs(conditionASTs);
        if (!combinedAST) {
            console.error("No valid conditions to combine into an AST.");
            res.status(400).send(JSON.stringify({ error: "No valid conditions found." }));
            return; // Exit the function early if combinedAST is null
        }
        let newCode = generator(combinedAST).code;
        //sending new code after deletion
        
        const netRule = await NetRule.findOneAndUpdate({}, { ruleString: newCode }, { new: true, upsert: true });
        res.send(JSON.stringify({
            expression:newCode
        }));
    })
}
module.exports=Delete;
