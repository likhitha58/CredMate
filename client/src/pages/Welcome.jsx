// src/pages/Welcome.jsx
import React from 'react';

import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: '4rem' }}>
      <div style={styles.container}>
        <h1>Welcome to CredMate</h1>
        <p>Your smart AI-powered loan advisor</p>
        <div style={styles.btnGroup}>
          <button onClick={() => navigate('/login')} style={styles.btn}>Login</button>
          <button onClick={() => navigate('/signup')} style={styles.btnOutline}>Signup</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '4rem 1rem',
  },
  btnGroup: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  btn: {
    padding: '0.75rem 2rem',
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  btnOutline: {
    padding: '0.75rem 2rem',
    backgroundColor: 'transparent',
    color: '#0077cc',
    border: '2px solid #0077cc',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Welcome;
