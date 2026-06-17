import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    try {
      // Replace with your actual Spring Boot login endpoint
      const res = await axios.post('http://localhost:8080/api/auth/login', credentials);
      console.log("Login Successful!", res.data);
      // Here you would usually save the JWT token and redirect to the Dashboard
      alert("Login successful!"); 
    } catch (err) {
      setError("Invalid username or password");
    }

    navigate('/AdvertismentList'); // Redirect to the Addadvertiment page after successful login
  };

  // Clean, modern CSS styles object
  const styles = {
    wrapper: { 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      height: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'sans-serif' 
    },
    card: { 
      backgroundColor: 'white', padding: '40px', borderRadius: '8px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '350px' 
    },
    header: { textAlign: 'center', marginBottom: '20px', color: '#333' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' },
    input: { 
      width: '100%', padding: '10px', boxSizing: 'border-box', 
      borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' 
    },
    button: { 
      width: '100%', padding: '12px', backgroundColor: '#007bff', 
      color: 'white', border: 'none', borderRadius: '4px', 
      fontSize: '16px', cursor: 'pointer', marginTop: '10px' 
    },
    errorText: { color: 'red', fontSize: '14px', marginBottom: '15px', textAlign: 'center' }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h3 style={styles.header}>साप्ताहिक काय चाललंय लॉगिन </h3>
        
        {error && <div style={styles.errorText}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username or Email</label>
            <input 
              style={styles.input} 
              type="text" 
              required
              placeholder="Enter your username"
              onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input 
              style={styles.input} 
              type="password" 
              required
              placeholder="Enter your password"
              onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;