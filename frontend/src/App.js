import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Classes from './pages/Classes';
import Contact from './pages/Contact';
import Home from './pages/Home';
import TheStudio from './pages/TheStudio';
import Navigation from './components/Navigation';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary">
        <Navigation />
        <main>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Home />} />
            <Route path="/the_studio" element={<TheStudio />} />




          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
