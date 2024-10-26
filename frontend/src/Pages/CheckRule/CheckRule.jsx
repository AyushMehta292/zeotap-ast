import React, { useState } from 'react';
import { motion } from 'framer-motion';

function CheckRule() {
  const [salary, setSalary] = useState(''); // For storing salary input
  const [age, setAge] = useState(''); // For storing age input
  const [experience, setExperience] = useState(''); // For storing experience input
  const [branch, setBranch] = useState(''); // For storing branch input
  const [output, setOutput] = useState(''); // For displaying response

  // Handle form submission and send POST request
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a JSON object with the form values
    const checksData = {
      checks: {
        salary: salary,
        age: age,
        exp: experience,
        branch: branch,
      },
    };

    try {
      // Send POST request to localhost:8080/check
      const response = await fetch('https://zeotap-ast.onrender.com/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checksData),
      });

      // Handle response from the server
      if (response.ok) {
        const jsonResponse = await response.json();
        setOutput(`Response: ${JSON.stringify(jsonResponse)}`);
      } else {
        setOutput('Error: Failed to check rule. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setOutput('Error: Server issue or invalid request.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.animatedHeading}>Check Your Validity...</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Salary input */}
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter your salary"
          required
          style={styles.input}
        />
        {/* Age input */}
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
          required
          style={styles.input}
        />
        {/* Experience input */}
        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Enter your experience (in years)"
          required
          style={styles.input}
        />
        {/* Branch input */}
        <input
          type="text"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          placeholder="Enter your branch"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      
      <div style={styles.outputSpace}>
        {output}
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  animatedHeading: {
    fontSize: '2em',
    animation: 'fadeIn 2s ease-in-out',
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
        transform: 'translateY(-20px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },
  form: {
    margin: '20px 0',
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    width: '300px',
    marginBottom: '10px',
    display: 'block',
    margin: '10px auto',
  },
  button: {
    padding: '10px 15px',
    fontSize: '1em',
    cursor: 'pointer',
    marginTop: '10px',
  },
  outputSpace: {
    marginTop: '20px',
    fontSize: '1.5em',
  },
};

export default CheckRule;
