# Rule Engine with AST

## Objective

This project is a 3-tier rule engine application designed to determine user eligibility based on attributes like age, department, income, and experience. The system uses [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (AST) to represent conditional rules, allowing for dynamic creation, combination, and modification of these rules.

## Data Structure

The AST is represented using a Node data structure with the following fields:
- **type**: A string indicating the node type ("operator" for AND/OR, "operand" for conditions).
- **left**: Reference to another Node (left child).
- **right**: Reference to another Node (right child for operators).
- **value**: Optional value for operand nodes (e.g., number for comparisons).

## Data Storage

### Database Choice

The application uses [MongoDB](https://www.mongodb.com/) for storing rules and application metadata due to its flexibility in handling JSON-like documents.

### Schema

- **Rules Schema**: Stores individual rules as strings.
  ```javascript
  const RulesSchema = new mongoose.Schema({
      rulesArray: { type: String, required: true }
  });
  ```

- **NetRule Schema**: Stores the combined rule as a single string.
  ```javascript
  const NetRuleSchema = new mongoose.Schema({
      ruleString: { type: String, required: true }
  });
  ```

## Sample Rules

- **Rule 1**: `((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)`
- **Rule 2**: `((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)`

## API Design

1. **create_rule(rule_string)**: Parses a rule string into an AST Node object.
   - Implemented in the backend controller `create.js` using `[@babel/parser](https://babeljs.io/docs/en/babel-parser)`.

2. **combine_rules(rules)**: Combines multiple rule strings into a single AST.
   - Implemented using the `combineASTs` function in `create.js`.

3. **evaluate_rule(JSON data)**: Evaluates the combined rule's AST against provided data.
   - Implemented in `check.js` using `evaluateAST`.

## Test Cases

1. **Create Individual Rules**: Use `create_rule` to parse example rules and verify their AST representation.
2. **Combine Rules**: Use `combine_rules` to ensure the resulting AST reflects the combined logic.
3. **Evaluate Rule**: Test `evaluate_rule` with sample JSON data for different scenarios.

## Bonus Features

- **Error Handling**: Implemented error handling for invalid rule strings or data formats.
- **Attribute Validation**: Ensures attributes are part of a predefined catalog.
- **Rule Modification**: Allows modification of existing rules using additional functionalities.
- **User-Defined Functions**: Considered for future extension to support advanced conditions.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/rule-engine-ast.git
   cd rule-engine-ast
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Create a `.env` file and add your MongoDB URI:
     ```plaintext
     MONGO_URI=your_mongo_uri_here
     ```

4. **Run the Application**
   ```bash
   npm start
   ```

## Usage

- **Add Rule**: Use the `/add-rule` endpoint to add new rules.
- **Check Rule**: Use the `/check` endpoint to evaluate rules against user data.

## Contact

For questions or feedback, please contact [ayushmehta292@gmail.com](mailto:ayushmehta292@gmail.com).

        