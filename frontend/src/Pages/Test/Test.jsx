import React, { useState } from 'react';

function Test() {
  const [details, setDetails] = useState('');
  const [output, setOutput] = useState('');

  const handleChange = (e) => {
    setDetails(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example output logic (modify as needed)
    setOutput(`You entered: ${details}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.animatedHeading}>Check Your Validity...</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          value={details} 
          onChange={handleChange} 
          placeholder="Enter your details" 
          required 
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      
      <div style={styles.outputSpace}>
        {output}
      </div>

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
    marginRight: '10px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '1em',
    cursor: 'pointer',
  },
  outputSpace: {
    marginTop: '20px',
    fontSize: '1.5em',
  },
};

export default Test;
