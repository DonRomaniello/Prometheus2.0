import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for detecting mouse hover over bottom percentage of viewport
 * @param {Object} options - Configuration options
 * @param {number} options.bottomPercentage - Percentage of viewport height from bottom to trigger (default: 10)
 * @param {number} options.showDelay - Delay before showing footer (default: 100ms)
 * @param {number} options.hideDelay - Delay before hiding footer (default: 300ms)
 * @returns {Object} - { isVisible, handleMouseEnter, handleMouseLeave }
 */
export const useViewportHover = (options = {}) => {
  const {
    bottomPercentage = 10,
    showDelay = 100,
    hideDelay = 300
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Calculate the trigger threshold based on viewport height
  const getTriggerThreshold = useCallback(() => {
    return window.innerHeight * (bottomPercentage / 100);
  }, [bottomPercentage]);

  // Handle mouse movement to detect if cursor is in bottom area
  const handleMouseMove = useCallback((e) => {
    const viewportHeight = window.innerHeight;
    const mouseY = e.clientY;
    const triggerThreshold = getTriggerThreshold();
    
    const isInBottomArea = mouseY >= (viewportHeight - triggerThreshold);
    
    if (isInBottomArea && !isHovering) {
      setIsHovering(true);
    } else if (!isInBottomArea && isHovering) {
      setIsHovering(false);
    }
  }, [isHovering, getTriggerThreshold]);

  // Handle visibility with delays
  useEffect(() => {
    let timeoutId;

    if (isHovering) {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, showDelay);
    } else {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);
    }

    return () => clearTimeout(timeoutId);
  }, [isHovering, showDelay, hideDelay]);

  // Add/remove mouse move listener
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // Manual handlers for the trigger zone
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return {
    isVisible,
    isHovering,
    handleMouseEnter,
    handleMouseLeave
  };
};
