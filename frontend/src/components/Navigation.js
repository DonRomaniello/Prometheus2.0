import { Link } from 'react-router-dom';
import { useScrollVisibility } from '../hooks/useScrollVisibility';
import { useMobileNavigation } from '../hooks/useMobileNavigation';
import '../styles/components/navigation.css';

const Navigation = () => {
  const { isVisible, handleMouseEnter, handleMouseLeave } = useScrollVisibility({
    hideThreshold: 100,
    showSpeedThreshold: 10,
    scrollStopDelay: 150
  });
  const { isOpen, isMobile, toggleNav, closeNav } = useMobileNavigation();

  const handleLinkClick = () => {
    if (isMobile) closeNav();
  };

  return (
    <nav
      className={`navigation floating-nav ${isVisible ? 'nav-visible' : 'nav-hidden'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        {isMobile ? (
          <>
            <div className="mobile-nav-header">
              <Link to="/" className="brand-logo" onClick={handleLinkClick}>
                Prometheus Studios
              </Link>
              <div className="hamburger-container">
              <button
                className={`hamburger-button${isOpen ? ' open' : ''}`}
                onClick={toggleNav}
                aria-label="Toggle navigation menu"
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
              </div>
            </div>
            {isOpen && <div className="mobile-nav-backdrop" onClick={closeNav}></div>}
            <div className={`mobile-nav${isOpen ? ' open' : ''}`}>
              <div className="mobile-nav-header-menu">
                <span className="brand-logo-menu">Prometheus2.0</span>
                <button className="close-button" onClick={closeNav} aria-label="Close navigation menu">×</button>
              </div>
              <ul className="mobile-nav-links">
                <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
                <li><Link to="/classes" onClick={handleLinkClick}>Classes</Link></li>
                <li><Link to="/the_studio" onClick={handleLinkClick}>The Studio</Link></li>
                <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
              </ul>
            </div>
          </>
        ) : (
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/classes">Classes</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/the_studio">The Studio</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;