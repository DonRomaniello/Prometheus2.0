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

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/courses', label: 'Courses' },
    { path: '/', label: 'Home' },
    { path: '/the_studio', label: 'The Studio' }
  ];
  
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
      className={`navigation floating-nav nav ${isVisible ? 'visible' : 'hidden'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        {isMobile ? (
          <>
            <div className="nav-header mobile">
              <div className="brand-container mobile">
                <Link to="/" className="brand-logo mobile" onClick={handleLinkClick}>
                    <img src="/img/branding.svg" alt="Prometheus Studios" />
                </Link>
              </div>
              <div className="hamburger-container mobile">
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
            {isOpen && <div className="nav-backdrop mobile" onClick={closeNav}></div>}
            <div className={`nav mobile${isOpen ? ' open' : ''}`}> 
              <ul className="nav-links mobile">
                {navLinks.map(({ path, label }) => (
                  <li key={path}>
                    <Link to={path} onClick={handleLinkClick}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <ul>
            {navLinks.map(({ path, label }) => (
              <li key={path}>
                <Link 
                  to={path}>
                  {label}
                  </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;