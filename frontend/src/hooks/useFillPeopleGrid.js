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
      
      if (!grid) {
        console.log('Grid ref is null');
        return;
      }
      
      // Count all direct children
      const childrenCount = grid.children.length;
      console.log('Grid children count:', childrenCount);
      
      // Let's see what the actual structure is
      console.log('Grid element:', grid);
      console.log('Grid children:', Array.from(grid.children));
      
      // Look for paragraph elements with images (which are the people squares)
      const paragraphsWithImages = grid.querySelectorAll('p img');
      console.log('Paragraphs with images count:', paragraphsWithImages.length);
      
      // Get the number of columns from the flexbox layout
      const computedStyles = window.getComputedStyle(grid);
      const containerWidth = grid.offsetWidth;
      const gap = parseInt(computedStyles.gap) || 32; // 2rem default from CSS
      
      // Get the first image to calculate item width
      const firstImage = paragraphsWithImages[0];
      let columnsPerRow = 3; // default fallback
      
      if (firstImage) {
        const itemWidth = firstImage.offsetWidth;
        console.log('Container width:', containerWidth);
        console.log('Item width:', itemWidth);
        console.log('Gap:', gap);
        
        if (itemWidth > 0) {
          columnsPerRow = Math.floor((containerWidth + gap) / (itemWidth + gap));
        }
      }
      
      console.log('Calculated columns per row:', columnsPerRow);
      
      // Calculate filler needed: F = N - (X % N)
      const X = paragraphsWithImages.length; // number of people images
      const N = columnsPerRow; // columns per row
      const remainder = X % N;
      const F = remainder === 0 ? 0 : N - remainder; // filler needed
      
      console.log('Filler calculation:');
      console.log(`X (images): ${X}`);
      console.log(`N (columns): ${N}`);
      console.log(`X % N (remainder): ${remainder}`);
      console.log(`F (filler needed): ${F}`);
      
      // Update the state
      setFillInfo({
        needsFilling: F > 0,
        fillerNeeded: F,
        columnsPerRow: N
      });
    };

    // Add a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      analyzeGrid();
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  
  return { gridRef, ...fillInfo };
}

export default useFillPeopleGrid;
