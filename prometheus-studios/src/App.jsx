import './styles/user_agent_zero.css';
import './styles/variables.css';
import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  About,
  Courses,
  SolidFoundations,
  Contact,
  Home,
  TheStudio,
  Privacy,
  Terms,
  FAQ,
  Testimonials
} from './pages';
import { Navigation, Footer } from './components';

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
            <Route path="/solid_foundations" element={<SolidFoundations />} />
            <Route path="/the_studio" element={<TheStudio />} />
            <Route path="/the_studio/:personSlug" element={<TheStudio />} />
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
