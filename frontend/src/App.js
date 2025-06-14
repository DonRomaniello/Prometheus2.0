import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  About,
  Courses,
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
      <div>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
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
