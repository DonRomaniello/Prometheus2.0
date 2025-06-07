import React, { useState, useCallback } from 'react';

/**
 * Hook for managing expandable grid items with reordering capability
 * @param {Array} items - Array of items to manage
 * @param {React.RefObject} gridRef - Reference to the grid container element
 * @param {string|null} initialExpandedSlug - Slug of initially expanded item
 * @param {function} onExpand - Callback when expansion state changes (slug)
 * @returns {object} - { expandedIdx, toggleExpanded, isExpanded, collapseAll, orderedItems, expandedItem }
 */
export const useExpandableGrid = (items = [], gridRef = null, initialExpandedSlug = null, onExpand = null) => {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [orderedItems, setOrderedItems] = useState(items);

  const moveToFirst = useCallback((items, index) => {
    if (index <= 0 || index >= items.length) return items;
    const newItems = [...items];
    const [movedItem] = newItems.splice(index, 1);
    newItems.unshift(movedItem);
    return newItems;
  }, []);

  const scrollToExpandedItem = useCallback(() => {
    if (!gridRef?.current) return;
    
    // Set a flag to indicate programmatic scrolling
    window.__programmaticScroll = true;
    
    // Use setTimeout to ensure the DOM has updated after expansion
    setTimeout(() => {
      const expandedCard = gridRef.current.querySelector('.person-card.expanded');
      const contentHeader = document.querySelector('.content-header'); // The title area
    
      if (expandedCard) {
        const expandedRect = expandedCard.getBoundingClientRect();
        const headerRect = contentHeader ? contentHeader.getBoundingClientRect() : null;
      
        // Calculate scroll to show both the title and the expanded card
        let targetScrollTop;
      
        if (headerRect) {
          // Scroll so the header (person's name) is visible at the top with some padding
          const headerTop = headerRect.top + window.scrollY;
          targetScrollTop = headerTop - 20; // 20px padding from top
        } else {
          // Fallback: center the expanded card if no header found
          const viewportHeight = window.innerHeight;
          const elementCenter = expandedRect.top + window.scrollY + expandedRect.height / 2;
          const viewportCenter = viewportHeight / 2;
          targetScrollTop = elementCenter - viewportCenter;
        }
      
        window.scrollTo({
          top: Math.max(0, targetScrollTop), // Don't scroll above the document
          behavior: 'smooth'
        });
        
        // Clear the flag after scrolling completes
        setTimeout(() => {
          window.__programmaticScroll = false;
        }, 1000); // Give enough time for smooth scroll to complete
      }
    }, 50);
  }, [gridRef]);

  // Update ordered items when items prop changes
  React.useEffect(() => {
    setOrderedItems(items);
    setExpandedIdx(null); // Reset expansion when items change
  }, [items]);

  // Handle initial expansion from URL
  React.useEffect(() => {
    if (initialExpandedSlug && items.length > 0) {
      const index = items.findIndex(item => item.slug === initialExpandedSlug);
      if (index !== -1) {
        // Move item to first position and expand
        const newOrderedItems = moveToFirst(items, index);
        setOrderedItems(newOrderedItems);
        setExpandedIdx(0);
        // Scroll after a delay to ensure DOM is ready
        setTimeout(() => scrollToExpandedItem(), 100);
      }
    }
  }, [initialExpandedSlug, items, moveToFirst, scrollToExpandedItem]);

  const toggleExpanded = useCallback((idx) => {
    setExpandedIdx(prevExpandedIdx => {
      if (prevExpandedIdx === idx) {
        // Collapsing - no reordering needed
        onExpand?.(null); // Update URL to remove person slug
        return null;
      } else {
        // Expanding - move to first position
        const newOrderedItems = moveToFirst(orderedItems, idx);
        setOrderedItems(newOrderedItems);
        
        // Get the expanded person and update URL
        const expandedPerson = orderedItems[idx];
        onExpand?.(expandedPerson.slug);
        
        // Scroll to center the expanded item
        scrollToExpandedItem();
        return 0; // New index will be 0 after moving to first
      }
    });
  }, [moveToFirst, scrollToExpandedItem, orderedItems, onExpand]);

  const isExpanded = useCallback((idx) => expandedIdx === idx, [expandedIdx]);

  const collapseAll = useCallback(() => setExpandedIdx(null), []);

  // Get the currently expanded item
  const expandedItem = expandedIdx !== null ? orderedItems[expandedIdx] : null;

  return {
    expandedIdx,
    toggleExpanded,
    isExpanded,
    collapseAll,
    orderedItems,
    expandedItem
  };
};
