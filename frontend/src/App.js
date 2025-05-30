import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import GridDemo from './pages/GridDemo';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/grid-demo" element={<GridDemo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
