import './styles/user_agent_zero.css';
import './styles/variables.css';
import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <title>Prometheus Studios</title>
        <meta name="description" content="World class improv in the Hudson Valley." />
        <meta name="keywords" content="improv, hudson valley, comedy, theater, acting, classes, workshops, instruction, fun, laughter, learning, community, performance, stage, theater, theatre, acting" />
        <meta property="og:title" content="Prometheus Studios" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prometheusstudios.org/" />
        <meta property="og:image" content="http://prometheusstudios.org/logo512.png" />
        <meta property="og:description" content="World class improv in the Hudson Valley." />
        <link rel="apple-touch-icon" href="https://prometheusstudios.org/logo192.png" />
        <link rel="manifest" href="https://prometheusstudios.org/manifest.json" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-404TGSM614"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-404TGSM614');
          `}
        </script>
      </Helmet>
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
