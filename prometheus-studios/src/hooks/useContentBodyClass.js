/**
 * Hook for composing content body class names based on layout and device
 * @param {string} layout - The layout string
 * @param {boolean} isMobile - Whether device is mobile
 * @param {boolean} isSmallMobile - Whether device is small mobile
 * @returns {string} - The composed class name
 */
export const useContentBodyClass = (layout, isMobile, isSmallMobile) => {
  const isPeopleGrid = layout.includes('people-grid');
  
  let contentBodyClass = 'content-body';
  if (isPeopleGrid) {
    // if (isSmallMobile) {
    //   contentBodyClass += ' small-mobile';
    // }
    if (isMobile) {
      contentBodyClass += ' mobile';
    }
  }
  
  return contentBodyClass;
};
