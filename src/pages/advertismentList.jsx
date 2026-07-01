import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdvertismentList = () => {
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState({ advtNo: '', advtName: '' });

  // Use the PRODUCTION URL
  const API_URL = 'https://advt-backend-xuoo.onrender.com';

  // 1. Wrap in useCallback so it's stable and can be used as a dependency
  const fetchAds = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/advertisements/search`, { params: search });
      setAds(res.data);
    } catch (err) { 
      console.error("Error fetching data:", err); 
    }
  }, [search]); // Re-runs when search state changes

  // 2. Safely call the memoized function
  useEffect(() => { 
    fetchAds(); 
  }, [fetchAds]);

  const togglePaymentStatus = async (ad) => {
    try {
      const updatedAd = { ...ad, isPaid: !ad.isPaid };
      await axios.put(`${API_URL}/api/advertisements/${ad.id}`, updatedAd);
      fetchAds(); // Now works perfectly
    } catch (err) { 
      alert("Error updating payment status."); 
    }
  };

  // ... rest of your code remains the same
  // Just make sure to update the PDF link below:
  // <a href={`${API_URL}/files/${ad.pdfPath ? ad.pdfPath.replace('uploads/', '') : ''}`} ...>
  
  const styles = {
    container: { padding: '20px', fontFamily: 'sans-serif' },
    searchBox: { padding: '8px', marginRight: '10px', width: '200px' },
    button: { padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: { backgroundColor: '#343a40', color: '#fff', padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' },
    td: { padding: '12px', border: '1px solid #dee2e6' }
  };

  return (
    <div style={styles.container}>
      <Link to="/add">Add New Advertisement</Link>
      <h2>Advertisement History</h2>
      <div>
        <input style={styles.searchBox} placeholder="Advt No" onChange={e => setSearch({...search, advtNo: e.target.value})} />
        <button style={styles.button} onClick={fetchAds}>Search</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr><th style={styles.th}>Advt No</th><th style={styles.th}>Name</th><th style={styles.th}>Dept</th><th style={styles.th}>Category</th><th style={styles.th}>Size</th><th style={styles.th}>Bill</th><th style={styles.th}>Date</th><th style={styles.th}>Status</th><th style={styles.th}>PDF</th></tr>
        </thead>
        <tbody>
          {ads.map(ad => (
            <tr key={ad.id}>
              <td style={styles.td}>{ad.advtNo}</td>
              <td style={styles.td}>{ad.advtName}</td>
              <td style={styles.td}>{ad.department}</td>
              <td style={styles.td}>{ad.category}</td>
              <td style={styles.td}>{ad.size}</td>
              <td style={styles.td}>₹{ad.billRupees}</td>
              <td style={styles.td}>{ad.publishingDate}</td>
              <td style={styles.td}>
                <button onClick={() => togglePaymentStatus(ad)}>{ad.isPaid ? 'Paid' : 'Pending'}</button>
              </td>
              <td style={styles.td}>
                <a href={`https://advt-backend-xuoo.onrender.com/files/${ad.pdfPath ? ad.pdfPath.replace('uploads/', '') : ''}`} target="_blank" rel="noreferrer">View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdvertismentList;