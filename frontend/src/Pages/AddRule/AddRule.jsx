import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animations
import { Link } from 'react-router-dom'; // Import Link for navigation

function AddRule() {
  const [ruleInput, setRuleInput] = useState(''); // State to store the rule input
  const [responseMessage, setResponseMessage] = useState(''); // State to store server response
  const [rules, setRules] = useState([]); // State to store fetched rules

  // Function to fetch the rules from the server when the component loads
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await fetch('/api/get_rules');
        if (response.ok) {
          const data = await response.json();
          
          // Assuming data is an array of objects and each object contains a 'rulesArray'
          const extractedRules = data.flatMap(item => item.rulesArray || []); // Flatten arrays and handle empty cases
          setRules(extractedRules); // Update state with the rule strings
        } else {
          console.error('Failed to fetch rules');
        }
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };

    fetchRules(); // Call the fetch function when the component loads
  }, []); // Empty dependency array to run once when the component mounts

  // Function to handle form submission and send the POST request
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the JSON object from the input string
    const ruleData = { expression: ruleInput };

    try {
      // Send the POST request to localhost:8080/add_rule
      const response = await fetch('/api/add_rule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ruleData),
      });

      // Check if the response is OK and update responseMessage
      if (response.ok) {
        setResponseMessage('Rule added successfully!');
        setRuleInput(''); // Clear the input field after submission
        fetchRules(); // Refresh the list of rules
      } else {
        setResponseMessage('Failed to add rule. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred. Please check the server.');
    }
  };

  // Function to handle deleting a rule
  const handleDelete = async (rule) => {
    try {
      const response = await fetch('/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleteExp: rule }),
      });

      if (response.ok) {
        setResponseMessage(`Rule "${rule}" deleted successfully!`);
        setRules(rules.filter((r) => r !== rule)); // Update state to remove the deleted rule
      } else {
        setResponseMessage(`Failed to delete rule: "${rule}".`);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred while deleting. Please check the server.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* Animated heading using framer-motion */}
      <motion.h1
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ fontSize: '2.5rem', color: '#4A90E2' }}
      >
        RULE ENGINE AST
      </motion.h1>

      {/* Input section for entering the rule */}
      <div style={{ marginTop: '30px' }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="ruleInput" style={{ fontSize: '1.2rem', marginBottom: '10px', display: 'block' }}>
            Input your rule as a string:
          </label>
          <motion.input
            type="text"
            id="ruleInput"
            placeholder="Enter your rule here"
            value={ruleInput}
            onChange={(e) => setRuleInput(e.target.value)}
            style={{
              width: '300px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
            whileFocus={{ scale: 1.05 }} // Scale slightly on focus
          />
          <div style={{ marginTop: '20px' }}>
            <motion.button
              type="submit"
              style={{ ...buttonStyle, backgroundColor: '#4A90E2', color: 'white', border: 'none' }}
              whileHover={{ scale: 1.1 }} // Scale up on hover
              whileTap={{ scale: 0.9 }} // Scale down on tap
            >
              Submit Rule
            </motion.button>
          </div>
        </form>
      </div>

      {/* Display response message */}
      {responseMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '20px', color: '#4A90E2', fontSize: '1.2rem' }}
        >
          {responseMessage}
        </motion.div>
      )}

      {/* Display the fetched rules if available */}
      {rules.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#333' }}>Existing Rules:</h2>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ listStyleType: 'none', padding: 0 }}
          >
            {rules.map((rule, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }} // Slightly enlarge the rule on hover
                style={{
                  fontSize: '1.2rem',
                  color: '#555',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {rule}
                <motion.button
                  onClick={() => handleDelete(rule)}
                  style={{
                    marginLeft: '20px',
                    padding: '5px 10px',
                    backgroundColor: '#E94E4E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: '#d43f3f' }} // Add a hover effect to delete button
                  whileTap={{ scale: 0.9 }}
                >
                  Delete
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      )}

      {/* Animated Go Back button */}
      <div style={{ marginTop: '30px' }}>
        <Link to="/" style={buttonStyle}>
          <motion.button
            style={{ ...buttonStyle, backgroundColor: '#4A90E2', color: 'white', border: 'none' }}
            whileHover={{ scale: 1.1 }} // Scale up on hover
            whileTap={{ scale: 0.9 }} // Scale down on tap
          >
            Go Back to Home
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

// Button style
const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background-color 0.3s',
};

export default AddRule;
