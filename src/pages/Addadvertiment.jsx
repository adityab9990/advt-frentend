import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdvtForm = () => {
  const [formData, setFormData] = useState({
    advtNo: '', advtName: '', department: '', category: 'PCMC',
    size: '', billRupees: '', publishingDate: '', file: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Add these console logs to see what you are actually sending
    console.log("Form Data:", formData);

    data.append('file', formData.file);
    data.append('advtNo', formData.advtNo);
    data.append('advtName', formData.advtName);
    data.append('department', formData.department);
    data.append('category', formData.category);
    data.append('size', formData.size);
    data.append('billRupees', formData.billRupees);
    data.append('publishingDate', formData.publishingDate);
    
    try {
        const response = await axios.post('http://localhost:8080/api/advertisements/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log("Success:", response.data);
        alert("Advertisement added successfully!");
    } catch (err) {
        // This will print the full backend error message
        console.error("Backend Error:", err.response ? err.response.data : err.message);
    }
};
  const formStyle = {
    position: 'relative',
    maxWidth: '520px',
    margin: '40px auto',
    padding: '32px',
    background: 'linear-gradient(180deg, #f7fbff 0%, #ffffff 100%)',
    border: '1px solid rgba(59, 130, 246, 0.18)',
    borderRadius: '24px',
    boxShadow: '0 24px 60px rgba(59, 130, 246, 0.16)',
    fontFamily: 'Inter, system-ui, sans-serif'
  };

  const navStyle = {
    position: 'relative',
    margin: '0 0 12px 0'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    margin: '10px 0',
    border: '1px solid rgba(15, 23, 42, 0.12)',
    borderRadius: '14px',
    backgroundColor: '#f8fafc',
    fontSize: '15px',
    color: '#0f172a',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: 'linear-gradient(45deg, transparent 50%, #0f172a 50%), linear-gradient(135deg, #0f172a 50%, transparent 50%)',
    backgroundPosition: 'calc(100% - 18px) center, calc(100% - 14px) center',
    backgroundSize: '6px 6px, 6px 6px',
    backgroundRepeat: 'no-repeat',
    paddingRight: '40px'
  };

  const buttonStyle = {
    width: '100%',
    marginTop: '18px',
    padding: '14px 18px',
    borderRadius: '16px',
    border: 'none',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
    boxShadow: '0 14px 30px rgba(37, 99, 235, 0.24)',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  };

  
// ... inside your AdvtForm component
  return (
    <div style={{ maxWidth: formStyle.maxWidth, margin: formStyle.margin }}>
      <nav style={navStyle}>
        <Link to="/advertismentList">Search Advt</Link>
      </nav>
      <form onSubmit={handleSubmit} style={formStyle}>
      
      <h2 style={{ marginBottom: '16px', color: '#0f172a', fontSize: '24px' }}>Add Advertisement</h2>
      
      <input type="text" placeholder="Advt No" onChange={e => setFormData({...formData, advtNo: e.target.value})} style={inputStyle} />
      <input type="text" placeholder="Advt Name" onChange={e => setFormData({...formData, advtName: e.target.value})} style={inputStyle} />
      <input type="text" placeholder="Department" onChange={e => setFormData({...formData, department: e.target.value})} style={inputStyle} />
      
      <select onChange={e => setFormData({...formData, category: e.target.value})} style={selectStyle}>
        <option value="PCMC">PCMC</option>
        <option value="GOV">GOV</option>
      </select>

      <input type="text" placeholder="Size" onChange={e => setFormData({...formData, size: e.target.value})} style={inputStyle} />
      <input type="number" placeholder="Bill Rupees" onChange={e => setFormData({...formData, billRupees: e.target.value})} style={inputStyle} />
      <input type="date" onChange={e => setFormData({...formData, publishingDate: e.target.value})} style={inputStyle} />
      
      <input type="file" onChange={e => setFormData({...formData, file: e.target.files[0]})} style={inputStyle} />
      <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};
export default AdvtForm;