import { useState } from 'react';

/**
 * Hook for managing expandable grid items
 * @param {number} itemCount - Total number of items in the grid
 * @returns {object} - { expandedIdx, toggleExpanded, isExpanded, collapseAll }
 */
export const useExpandableGrid = (itemCount = 0) => {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const toggleExpanded = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  const isExpanded = (idx) => expandedIdx === idx;

  const collapseAll = () => setExpandedIdx(null);

  return {
    expandedIdx,
    toggleExpanded,
    isExpanded,
    collapseAll
  };
};
