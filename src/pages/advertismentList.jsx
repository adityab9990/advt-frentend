import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // 1. All States
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState({ advtNo: '', advtName: '', category: '', publicationDate: '' });
  const [editingAd, setEditingAd] = useState(null);

  // 2. All Functions
  const fetchAds = async () => {
    try {
      const params = Object.fromEntries(
        Object.entries(search).filter(([_, value]) => value !== '')
      );
      const res = await axios.get('http://localhost:8080/api/advertisements/search', { params });
      setAds(res.data);
    } catch (err) { alert("Error fetching data"); }
  };

  // Optional: Load all data immediately when the page opens
  useEffect(() => {
    fetchAds();
    // eslint-disable-next-line
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch(prev => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingAd(prev => ({ ...prev, [name]: value }));
  };

  const saveUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/advertisements/${editingAd.id}`, editingAd);
      alert("Updated successfully!");
      setEditingAd(null);
      fetchAds();
    } catch (err) {
      alert("Error updating data. Check your backend console.");
    }
  };

  // 3. Styles Object (MUST be defined before the return statement)
  const styles = {
    container: { padding: '20px', fontFamily: 'sans-serif' },
    header: { color: '#333' },
    searchBox: { padding: '8px', marginRight: '10px', width: '250px', marginBottom: '10px' },
    button: { padding: '8px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' },
    editButton: { padding: '6px 12px', backgroundColor: '#ffc107', color: '#000', border: 'none', cursor: 'pointer', borderRadius: '4px' },
    cancelButton: { padding: '8px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', marginLeft: '10px' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: { backgroundColor: '#f8f9fa', padding: '12px', border: '1px solid #dee2e6', textAlign: 'left' },
    td: { padding: '12px', border: '1px solid #dee2e6' },
    editCard: { backgroundColor: '#f8f9fa', padding: '20px', border: '1px solid #dee2e6', marginBottom: '20px', borderRadius: '5px' }
  };

  // 4. Return Statement (The actual UI)
  return (
    <div style={styles.container}>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/add" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Add New Advertisement</Link>
      </nav>
      
      <h2 style={styles.header}>Advertisement History</h2>

      {/* The Edit Form */}
      {editingAd && (
        <div style={styles.editCard}>
          <h3>Update Advertisement (ID: {editingAd.id})</h3>
          <div>
            <input name="advtNo" value={editingAd.advtNo || ''} style={styles.searchBox} placeholder="Advt No" onChange={handleEditChange} />
            <input name="advtName" value={editingAd.advtName || ''} style={styles.searchBox} placeholder="Name" onChange={handleEditChange} />
            <input name="department" value={editingAd.department || ''} style={styles.searchBox} placeholder="Department" onChange={handleEditChange} />
            <input name="category" value={editingAd.category || ''} style={styles.searchBox} placeholder="Category" onChange={handleEditChange} />
            <input name="size" value={editingAd.size || ''} style={styles.searchBox} placeholder="Size" onChange={handleEditChange} />
            <input name="billRupees" value={editingAd.billRupees || ''} type="number" style={styles.searchBox} placeholder="Bill Amount" onChange={handleEditChange} />
            <input name="publishingDate" value={editingAd.publishingDate || ''} type="date" style={styles.searchBox} onChange={handleEditChange} />
          </div>
          <button style={styles.button} onClick={saveUpdate}>Save Changes</button>
          <button style={styles.cancelButton} onClick={() => setEditingAd(null)}>Cancel</button>
        </div>
      )}
      
      {/* Search Bar - Fixed to match your new advtName state */}
      <div>
        <input name="advtNo" value={search.advtNo} style={styles.searchBox} placeholder="Advt No" onChange={handleSearchChange} />
        <input name="advtName" value={search.advtName} style={styles.searchBox} placeholder="Advertisement Name" onChange={handleSearchChange} />
        <button style={styles.button} onClick={fetchAds}>Search</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Advt No</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Size</th>
            <th style={styles.th}>Bill Amount</th>
            <th style={styles.th}>Publication Date</th>
            <th style={styles.th}>PDF</th>
            <th style={styles.th}>Actions</th>
          </tr>
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
              <td style={styles.td}>
                {ad.publishingDate ? new Date(ad.publishingDate).toLocaleDateString() : 'N/A'}
              </td>
              <td style={styles.td}>
                {/* Fallback added in case pdfPath is null */}
                {ad.pdfPath ? (
                  <a href={`http://localhost:8080/files/${ad.pdfPath.replace('uploads/', '')}`} target="_blank" rel="noreferrer">
                    View PDF
                  </a>
                ) : 'No PDF'}
              </td>
              <td style={styles.td}>
                <button style={styles.editButton} onClick={() => setEditingAd(ad)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard; 