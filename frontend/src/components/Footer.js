import { Link } from 'react-router-dom';
import { useScrollFooter } from '../hooks/useViewportHover';
import { useState, useEffect } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import '../styles/components/footer.css';

const Footer = () => {
  const { isMobile, isSmallMobile } = useIsMobile(768);
  const { isVisible } = useScrollFooter({
    showDelay: 100,
    hideDelay: 200,
    overscrollThreshold: 50
  });

  const [spacerHeight, setSpacerHeight] = useState(0);

  // Calculate required spacer height to ensure scrollability
  useEffect(() => {
    const calculateSpacerHeight = () => {
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const bodyHeight = document.body.scrollHeight;
      
      // Use the larger of the two height measurements
      const totalContentHeight = Math.max(documentHeight, bodyHeight);
      
      // If content is shorter than viewport, add enough height to make it scrollable
      // Plus additional buffer for overscroll detection
      const minimumScrollableHeight = viewportHeight + 100; // 100px buffer for overscroll
      
      if (totalContentHeight < minimumScrollableHeight) {
        const needed = minimumScrollableHeight - totalContentHeight;
        setSpacerHeight(needed);
      } else {
        // Content is already tall enough, just add small buffer
        setSpacerHeight(100);
      }
    };

    // Calculate on mount
    calculateSpacerHeight();

    // Recalculate when window resizes or content changes
    const handleResize = () => {
      setTimeout(calculateSpacerHeight, 100); // Small delay to ensure DOM updates
    };

    window.addEventListener('resize', handleResize);
    
    // Use MutationObserver to detect content changes
    const observer = new MutationObserver(() => {
      setTimeout(calculateSpacerHeight, 100);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Only animate on desktop, inline on mobile
  if (isMobile) {
    return (
      <footer className={`footer mobile${isSmallMobile ? ' small-mobile' : ''}`} style={{ position: 'static', transform: 'none', opacity: 1 }}>
        <div className="footer-content">
          <div className="footer-top-row">
            <nav className="footer-nav">
              <ul className={`footer-links mobile${isSmallMobile ? ' small-mobile' : ''}`}>
                <li>
                  <Link to="/contact" className={`footer-link mobile${isSmallMobile ? ' small-mobile' : ''}`}>Contact</Link>
                </li>
                <li>
                  <Link to="/privacy" className={`footer-link mobile${isSmallMobile ? ' small-mobile' : ''}`}>Privacy</Link>
                </li>
                <li>
                  <Link to="/terms" className={`footer-link mobile${isSmallMobile ? ' small-mobile' : ''}`}>Terms of Service</Link>
                </li>
                <li>
                  <Link to="/faq" className={`footer-link mobile${isSmallMobile ? ' small-mobile' : ''}`}>FAQ</Link>
                </li>
                <li>
                  <Link to="/testimonials" className={`footer-link mobile${isSmallMobile ? ' small-mobile' : ''}`}>Testimonials</Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Bottom row - can be used for additional content */}
          <div className="footer-bottom-row">
            {/* This row is available for future content */}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <>
      {/* Dynamic spacer to ensure there's always enough content to scroll */}
      <div 
        className="footer-scroll-spacer" 
        style={{ height: `${spacerHeight}px` }}
      />
      
      <footer className={`footer ${isVisible ? 'footer-visible' : 'footer-hidden'}`}>
        <div className="footer-content">
          {/* Top row with navigation links */}
          <div className="footer-top-row">
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
          
          {/* Bottom row - can be used for additional content */}
          <div className="footer-bottom-row">
            {/* This row is available for future content */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
