import { useMemo } from 'react';

/**
 * Hook for managing dynamic titles based on expanded state
 * @param {string} defaultTitle - The default title when nothing is expanded
 * @param {object|null} expandedItem - The currently expanded item (with name property)
 * @returns {string} - The title to display, formatted appropriately
 */
export const useDynamicTitle = (defaultTitle, expandedItem) => {
  return useMemo(() => {
    if (expandedItem && expandedItem.name) {
      // Format person name as H1 when it becomes the title
      return `# ${expandedItem.name}`;
    }
    return defaultTitle;
  }, [defaultTitle, expandedItem]);
};
