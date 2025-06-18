import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for detecting scroll-to-bottom behavior for footer visibility
 * @param {Object} options - Configuration options
 * @param {number} options.showDelay - Delay before showing footer (default: 100ms)
 * @param {number} options.hideDelay - Delay before hiding footer (default: 200ms)
 * @param {number} options.overscrollThreshold - How much overscroll needed to trigger (default: 50px)
 * @returns {Object} - { isVisible }
 */
export const useScrollFooter = (options = {}) => {
  const {
    showDelay = 100,
    hideDelay = 200,
    overscrollThreshold = 50
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [overscrollAmount, setOverscrollAmount] = useState(0);

  const checkIfAtBottom = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    // Check if we're at the bottom (with small tolerance for floating point precision)
    const atBottom = scrollTop + windowHeight >= docHeight - 10;
    setIsAtBottom(atBottom);
    
    return atBottom;
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDifference = currentScrollY - lastScrollY;
    const atBottom = checkIfAtBottom();
    
    if (atBottom) {
      // User is at bottom and trying to scroll down further
      if (scrollDifference > 0) {
        setOverscrollAmount(prev => Math.min(prev + scrollDifference, overscrollThreshold));
      }
      // User scrolled up from bottom
      else if (scrollDifference < 0) {
        setOverscrollAmount(0);
        setIsVisible(false);
      }
    } else {
      // Not at bottom, reset everything
      setOverscrollAmount(0);
      if (isVisible) {
        setIsVisible(false);
      }
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY, overscrollThreshold, isVisible, checkIfAtBottom]);

  // Handle wheel events for better overscroll detection
  const handleWheel = useCallback((e) => {
    if (isAtBottom && e.deltaY > 0) {
      // User is trying to scroll down while at bottom
      setOverscrollAmount(prev => {
        const newAmount = Math.min(prev + Math.abs(e.deltaY), overscrollThreshold);
        return newAmount;
      });
    }
  }, [isAtBottom, overscrollThreshold]);

  // Show footer when overscroll threshold is reached
  useEffect(() => {
    let timeoutId;
    
    if (overscrollAmount >= overscrollThreshold && isAtBottom) {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, showDelay);
    }
    
    return () => clearTimeout(timeoutId);
  }, [overscrollAmount, overscrollThreshold, isAtBottom, showDelay]);

  // Hide footer with delay when not at bottom
  useEffect(() => {
    let timeoutId;
    
    if (!isAtBottom && isVisible) {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);
    }
    
    return () => clearTimeout(timeoutId);
  }, [isAtBottom, isVisible, hideDelay]);

  // Add scroll and wheel listeners
  useEffect(() => {
    // Initial check
    checkIfAtBottom();
    setLastScrollY(window.pageYOffset || document.documentElement.scrollTop);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('resize', checkIfAtBottom);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', checkIfAtBottom);
    };
  }, [handleScroll, handleWheel, checkIfAtBottom]);

  return {
    isVisible,
    isAtBottom,
    overscrollAmount
  };
};
