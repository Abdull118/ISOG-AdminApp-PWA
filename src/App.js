import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Hadith from './pages/Hadith';

function App() {

  return (
    <>
      <div className='tabs'>
        <a href='/'><button>Prayer Tab</button></a>
        <a href='/admin'><button>Announcement Tab</button></a>
        <a href='/hadith'><button>Hadith Tab</button></a>
      </div>
    <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/admin' element={<Admin />}/>
          <Route path='/hadith' element={<Hadith />}/>
        </Routes>
      </Router>

      
      </>
  );
}

export default App;
