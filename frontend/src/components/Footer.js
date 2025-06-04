import { Link } from 'react-router-dom';
import { useViewportHover } from '../hooks/useViewportHover';
import '../styles/components/footer.css';

const Footer = () => {
  const { isVisible, handleMouseEnter, handleMouseLeave } = useViewportHover({
    bottomPercentage: 10, // Trigger when hovering over bottom 10% of viewport
    showDelay: 100,
    hideDelay: 300
  });

  return (
    <>
      {/* Invisible trigger zone for bottom 10% of viewport */}
      <div 
        className="footer-trigger-zone"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Footer component */}
      <footer className={`footer ${isVisible ? 'footer-visible' : 'footer-hidden'}`}>
        <div className="footer-content">
          <nav className="footer-nav">
            <ul className="footer-links">
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-link">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="footer-link">
                  Testimonials
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Footer;
