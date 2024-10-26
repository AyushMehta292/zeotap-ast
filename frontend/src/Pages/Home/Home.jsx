// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion for animations

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* Animated Introductory Text */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }} // Start off-screen
        animate={{ opacity: 1, y: 0 }} // Fade in and move into position
        transition={{ duration: 1 }} // Duration of the animation
        style={{ fontSize: '2.5rem', color: '#4A90E2' }}
      >
        Welcome to the AST Rule Engine
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }} // Start off-screen
        animate={{ opacity: 1 }} // Fade in
        transition={{ duration: 1.5, delay: 0.5 }} // Delay before animation starts
        style={{ fontSize: '1.2rem', marginTop: '20px' }}
      >
        A powerful tool for rule management and evaluation.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }} // Start off-screen
        animate={{ opacity: 1 }} // Fade in
        transition={{ duration: 2, delay: 1 }} // Delay for the next line
        style={{ fontSize: '1.1rem', marginTop: '10px' }}
      >
        Easily create, edit, and check rules to optimize your workflows and automate decision-making.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }} // Start off-screen
        animate={{ opacity: 1 }} // Fade in
        transition={{ duration: 2.5, delay: 1.5 }} // Delay for the next line
        style={{ fontSize: '1.1rem', marginTop: '10px' }}
      >
        Join us in enhancing productivity through effective rule management.
      </motion.p>

      <p style={{ marginTop: '30px', fontSize: '1.2rem' }}>Select an option to proceed:</p>
      
      <div style={{ marginTop: '30px' }}>
        <Link to="/addRule" style={linkStyle}>
          Go to Add Rule Page
        </Link>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/CheckRule" style={linkStyle}>
          Go to Check Rule Page
        </Link>
      </div>
    </div>
  );
}

// Simple styles for the links
const linkStyle = {
  textDecoration: 'none',
  padding: '10px 15px',
  backgroundColor: '#4A90E2',
  color: 'white',
  borderRadius: '5px',
  transition: 'background-color 0.3s',
  display: 'inline-block', // Makes the link behave like a button
};

export default Home;
