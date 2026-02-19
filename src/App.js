import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Hadith from './pages/Hadith';

function App() {
  return (
    <Router>
      <div className="appFrame">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/hadith" element={<Hadith />} />
        </Routes>

        <nav className="mobileTabs" aria-label="Main sections">
          <NavLink to="/" end className={({ isActive }) => `tabLink${isActive ? ' tabLink--active' : ''}`}>
            Prayer
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => `tabLink${isActive ? ' tabLink--active' : ''}`}>
            Announcements
          </NavLink>
          <NavLink to="/hadith" className={({ isActive }) => `tabLink${isActive ? ' tabLink--active' : ''}`}>
            Hadith
          </NavLink>
        </nav>
      </div>
    </Router>
  );
}

export default App;
