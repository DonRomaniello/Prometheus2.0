import { useEffect, useRef, useState } from 'react';

export function useFillPeopleGrid({ fillerContent = [] }) {
  const gridRef = useRef(null);
  const [fillInfo, setFillInfo] = useState({
    needsFilling: false,
    fillerNeeded: 0,
    columnsPerRow: 3
  });

  useEffect(() => {
    const analyzeGrid = () => {
      const grid = gridRef.current;
      
      if (!grid) return;
      
      // Look for paragraph elements with images (which are the people squares)
      const paragraphsWithImages = grid.querySelectorAll('p img');
      
      // Get the number of columns from the flexbox layout
      const computedStyles = window.getComputedStyle(grid);
      const containerWidth = grid.offsetWidth;
      const gap = parseInt(computedStyles.gap) || 32; // 2rem default from CSS
      
      // Get the first image to calculate item width
      const firstImage = paragraphsWithImages[0];
      let columnsPerRow = 3; // default fallback
      
      if (firstImage) {
        const itemWidth = firstImage.offsetWidth;
        
        if (itemWidth > 0) {
          columnsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap));
        }
      }
      
      // Calculate filler needed: F = N - (X % N)
      const X = paragraphsWithImages.length; // number of people images
      const N = columnsPerRow; // columns per row
      const remainder = X % N;
      const F = remainder === 0 ? 0 : N - remainder; // filler needed
      
      // Only update state if values actually changed to prevent unnecessary re-renders
      setFillInfo(prev => {
        if (prev.fillerNeeded !== F || prev.columnsPerRow !== N) {
          return {
            needsFilling: F > 0,
            fillerNeeded: F,
            columnsPerRow: N
          };
        }
        return prev;
      });
    };

    // Initial analysis
    analyzeGrid();

    // Re-analyze on resize with reduced debounce for faster response
    const handleResize = debounce(analyzeGrid, 100);
    window.addEventListener('resize', handleResize);
    
    // Re-analyze when images might have loaded
    window.addEventListener('load', analyzeGrid);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', analyzeGrid);
    };
  }, [fillerContent]);
  
  return { gridRef, ...fillInfo };
}

// Debounce helper function
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default useFillPeopleGrid;
