import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollVisibility } from '../hooks/useScrollVisibility';

const Navigation = () => {
  const { isVisible, handleMouseEnter, handleMouseLeave } = useScrollVisibility({
    hideThreshold: 100,
    showSpeedThreshold: 10,
    scrollStopDelay: 150
  });

  return (
    <nav 
      className={`navigation floating-nav ${isVisible ? 'nav-visible' : 'nav-hidden'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;