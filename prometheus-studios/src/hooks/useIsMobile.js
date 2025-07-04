'use client';

import { useState, useEffect } from 'react';

/**
 * Centralized device detection hook
 * @param {number} breakpoint - Screen width breakpoint for mobile detection (default: 960)
 * @returns {Object} Device information and breakpoint status
 */
const useDevice = (breakpoint = 960) => {
  const [device, setDevice] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isSmallMobile: false,
    isTablet: false,
    isDesktop: false,
    isPortrait: false,
    isLandscape: false,
  });

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width <= breakpoint;
      const isSmallMobile = width <= 480;
      const isTablet = width > 480 && width <= breakpoint;
      const isDesktop = width > breakpoint;
      const isPortrait = height >= width;
      const isLandscape = width > height;
      setDevice({
        width,
        height,
        isMobile,
        isSmallMobile,
        isTablet,
        isDesktop,
        isPortrait,
        isLandscape,
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [breakpoint]);
  return device;
};

export default useDevice;
