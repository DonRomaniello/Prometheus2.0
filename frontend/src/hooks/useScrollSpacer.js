import { useState, useEffect } from 'react';

/**
 * Custom hook for calculating spacer height to ensure pages are always scrollable
 * @param {Object} options - Configuration options
 * @param {number} options.bufferHeight - Extra height to add for overscroll detection (default: 100)
 * @param {number} options.recalculateDelay - Delay before recalculating after changes (default: 100ms)
 * @returns {number} spacerHeight - The height in pixels needed to make content scrollable
 */
export const useScrollSpacer = (options = {}) => {
  const {
    bufferHeight = 100,
    recalculateDelay = 100
  } = options;

  const [spacerHeight, setSpacerHeight] = useState(0);

  useEffect(() => {
    const calculateSpacerHeight = () => {
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const bodyHeight = document.body.scrollHeight;
      
      // Use the larger of the two height measurements
      const totalContentHeight = Math.max(documentHeight, bodyHeight);
      
      // Calculate minimum height needed for scrolling with buffer
      const minimumScrollableHeight = viewportHeight + bufferHeight;
      
      if (totalContentHeight < minimumScrollableHeight) {
        // Content is shorter than viewport, add enough height to make it scrollable
        const needed = minimumScrollableHeight - totalContentHeight;
        setSpacerHeight(needed);
      } else {
        // Content is already tall enough, just add small buffer for overscroll
        setSpacerHeight(bufferHeight);
      }
    };

    // Calculate on mount
    calculateSpacerHeight();

    // Recalculate when window resizes
    const handleResize = () => {
      setTimeout(calculateSpacerHeight, recalculateDelay);
    };

    // Recalculate when content changes
    const handleContentChange = () => {
      setTimeout(calculateSpacerHeight, recalculateDelay);
    };

    // Set up event listeners
    window.addEventListener('resize', handleResize);
    
    // Use MutationObserver to detect DOM changes that might affect content height
    const observer = new MutationObserver(handleContentChange);
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'] // Only watch for style/class changes that might affect layout
    });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [bufferHeight, recalculateDelay]);

  return spacerHeight;
};
