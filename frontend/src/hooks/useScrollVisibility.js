import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing visibility based on scroll behavior
 * @param {Object} options - Configuration options
 * @param {number} options.hideThreshold - Scroll position to start hiding (default: 100)
 * @param {number} options.showSpeedThreshold - Minimum scroll speed to show on upward scroll (default: 10)
 * @param {number} options.scrollStopDelay - Delay to show after scrolling stops (default: 150)
 * @returns {Object} - { isVisible, isHovered, handleMouseEnter, handleMouseLeave }
 */
export const useScrollVisibility = (options = {}) => {
  const {
    hideThreshold = 100,
    showSpeedThreshold = 10,
    scrollStopDelay = 150
  } = options;

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = useCallback(() => {
    // Skip nav bar changes if scrolling is programmatic
    if (window.__programmaticScroll) return;
    
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY;
    const scrollSpeed = Math.abs(scrollDifference);
    
    // Hide when scrolling down past threshold
    if (currentScrollY > hideThreshold && scrollDifference > 0 && !isHovered) {
      setIsVisible(false);
    }
    // Show when scrolling up quickly or near top
    else if (scrollDifference < 0 && (scrollSpeed > showSpeedThreshold || currentScrollY < hideThreshold)) {
      setIsVisible(true);
    } else if (currentScrollY <= hideThreshold) {
      // Always show when at the top of the page
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isHovered, hideThreshold, showSpeedThreshold]);

  useEffect(() => {
    let scrollTimeout;
    
    const handleScrollWithTimeout = () => {
      handleScroll();
      
      // Clear any existing timeout
      clearTimeout(scrollTimeout);
      
      // Set a timeout to show after scrolling stops
      scrollTimeout = setTimeout(() => {
        if (window.scrollY < hideThreshold) {
          setIsVisible(true);
        }
      }, scrollStopDelay);
    };

    window.addEventListener('scroll', handleScrollWithTimeout, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollWithTimeout);
      clearTimeout(scrollTimeout);
    };
  }, [handleScroll, hideThreshold, scrollStopDelay]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return {
    isVisible,
    isHovered,
    handleMouseEnter,
    handleMouseLeave
  };
};
