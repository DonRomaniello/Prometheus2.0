import React, { useState, useCallback } from 'react';

/**
 * Hook for managing expandable grid items with reordering capability
 * @param {Array} items - Array of items to manage
 * @param {React.RefObject} gridRef - Reference to the grid container element
 * @returns {object} - { expandedIdx, toggleExpanded, isExpanded, collapseAll, orderedItems }
 */
export const useExpandableGrid = (items = [], gridRef = null) => {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [orderedItems, setOrderedItems] = useState(items);

  // Update ordered items when items prop changes
  React.useEffect(() => {
    setOrderedItems(items);
    setExpandedIdx(null); // Reset expansion when items change
  }, [items]);

  const moveToFirst = useCallback((items, index) => {
    if (index <= 0 || index >= items.length) return items;
    const newItems = [...items];
    const [movedItem] = newItems.splice(index, 1);
    newItems.unshift(movedItem);
    return newItems;
  }, []);

  const scrollToExpandedItem = useCallback(() => {
    if (!gridRef?.current) return;
    
    // Use setTimeout to ensure the DOM has updated after expansion
    setTimeout(() => {
      const expandedCard = gridRef.current.querySelector('.person-card.expanded');
      if (expandedCard) {
        const rect = expandedCard.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const scrollOffset = elementCenter - viewportCenter;
        
        window.scrollBy({
          top: scrollOffset,
          behavior: 'smooth'
        });
      }
    }, 50); // Small delay to ensure expansion animation completes
  }, [gridRef]);

  const toggleExpanded = useCallback((idx) => {
    setExpandedIdx(prevExpandedIdx => {
      if (prevExpandedIdx === idx) {
        // Collapsing - no reordering needed
        return null;
      } else {
        // Expanding - move to first position
        setOrderedItems(prevItems => moveToFirst(prevItems, idx));
        // Scroll to center the expanded item
        scrollToExpandedItem();
        return 0; // New index will be 0 after moving to first
      }
    });
  }, [moveToFirst, scrollToExpandedItem]);

  const isExpanded = useCallback((idx) => expandedIdx === idx, [expandedIdx]);

  const collapseAll = useCallback(() => setExpandedIdx(null), []);

  return {
    expandedIdx,
    toggleExpanded,
    isExpanded,
    collapseAll,
    orderedItems
  };
};
