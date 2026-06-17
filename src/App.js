import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdvtForm from './pages/Addadvertiment';
import AdvertismentList from './pages/advertismentList';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      {/* internal stylesheet instead of external file */}
      <style>{`
        :root{font-family: Arial, Helvetica, sans-serif}
        body{margin:0;padding:0;background:#f5f7fb;color:#222}
        nav{background:#fff;border-bottom:1px solid #e1e4e8;padding:12px}
        nav a{color:#0366d6;text-decoration:none;margin-right:8px}
        nav a:hover{text-decoration:underline}
        .app-container{max-width:960px;margin:24px auto;padding:0 16px}
      `}</style>

      <Routes>
        <Route path="/AdvertismentList" element={<AdvertismentList />} />
        <Route path="/add" element={<AdvtForm />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;