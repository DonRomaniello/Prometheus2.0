import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;
      const scrollSpeed = Math.abs(scrollDifference);
      
      // Hide navbar when scrolling down past 100px
      if (currentScrollY > 100 && scrollDifference > 0 && !isHovered) {
        setIsVisible(false);
      }
      // Show navbar when scrolling up quickly or at top
      else if (scrollDifference < 0 && (scrollSpeed > 10 || currentScrollY < 100)) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      
      // Clear any existing timeout
      clearTimeout(scrollTimeout);
      
      // Set a timeout to show navbar after scrolling stops
      scrollTimeout = setTimeout(() => {
        if (currentScrollY < 100) {
          setIsVisible(true);
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollY, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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