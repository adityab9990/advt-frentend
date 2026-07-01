import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // इथे डिफॉल्ट व्हॅल्यू सेट केली आहे
  const [credentials, setCredentials] = useState({ username: 'admin', password: '123' });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://advt-backend-xuoo.onrender.com/api/auth/login', credentials);
      localStorage.setItem('user', JSON.stringify(res.data));
      alert("Login successful!"); 
      navigate('/AdvertismentList'); 
    } catch (err) {
      const message = err.response?.data?.message || "Invalid username or password";
      setError(message);
    }
  }; // <--- हा ब्रेस महत्त्वाचा आहे, जो तुम्ही चुकून काढला होता

  const styles = {
    wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'sans-serif' },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '350px' },
    header: { textAlign: 'center', marginBottom: '20px', color: '#333' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', color: '#666', fontSize: '14px' },
    input: { width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' },
    button: { width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' },
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
              value={credentials.username} // 'value' ॲट्रिब्यूट वापरणे चांगले
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
              value={credentials.password} // 'value' ॲट्रिब्यूट वापरणे चांगले
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