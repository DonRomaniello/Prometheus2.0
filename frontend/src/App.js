import './styles/user_agent_zero.css';
import './styles/variables.css';
import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Home from './pages/Home';
import TheStudio from './pages/TheStudio';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import Testimonials from './pages/Testimonials';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/the_studio" element={<TheStudio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/testimonials" element={<Testimonials />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
