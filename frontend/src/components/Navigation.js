import { Link, useLocation } from 'react-router-dom';
import { useScrollVisibility } from '../hooks/useScrollVisibility';
import useIsMobile from '../hooks/useIsMobile';
import { useState, useEffect } from 'react';
import '../styles/components/navigation.css';

/**
 * Navigation component with responsive and scroll-aware behavior.
 * Handles mobile/desktop layouts and accessibility for navigation menu.
 */
const Navigation = () => {
  const location = useLocation();
  
  // Check if we're on a person's expanded page (e.g., /the_studio/person-1)
  const isPersonExpanded = location.pathname.startsWith('/the_studio/') && 
                          location.pathname !== '/the_studio';
  
  const { isVisible, handleMouseEnter, handleMouseLeave } = useScrollVisibility({
    hideThreshold: 100,
    showSpeedThreshold: 10,
    scrollStopDelay: 150,
    forceHide: isPersonExpanded
  });
  const { isMobile } = useIsMobile(768);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleNav = () => setIsOpen((v) => !v);
  const closeNav = () => setIsOpen(false);

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
              <ul className="mobile-nav-links">
                <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
                <li><Link to="/courses" onClick={handleLinkClick}>Courses</Link></li>
                <li><Link to="/the_studio" onClick={handleLinkClick}>The Studio</Link></li>
              </ul>
            </div>
          </>
        ) : (
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/the_studio">The Studio</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;