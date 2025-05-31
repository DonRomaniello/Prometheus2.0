import { useState, useEffect } from 'react';

/**
 * Custom hook for detecting mobile devices and screen properties
 * @param {number} breakpoint - Screen width breakpoint for mobile detection (default: 960)
 * @returns {Object} Mobile detection state and device information
 */
const useIsMobile = (breakpoint = 960) => {
  const [isMobile, setIsMobile] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    isMobileDevice: false,
    isPortrait: false,
    isMobileScreen: false,
    screenWidth: 0,
    screenHeight: 0
  });

  useEffect(() => {
    const checkIsMobile = () => {
      // Check if it's a mobile device by user agent
      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent
      );
      
      // Check orientation
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      
      // Check screen size
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMobileScreen = screenWidth <= breakpoint;
      
      // Determine if mobile using your original logic
      const mobile = (isMobileDevice && isPortrait) || isMobileScreen;
      
      // Update device info
      const newDeviceInfo = {
        isMobileDevice,
        isPortrait,
        isMobileScreen,
        screenWidth,
        screenHeight
      };
      
      console.log('Mobile Detection:', {
        isMobile: mobile,
        ...newDeviceInfo
      });
      
      setIsMobile(mobile);
      setDeviceInfo(newDeviceInfo);
    };

    // Initial check
    checkIsMobile();

    // Create media query listeners
    const orientationQuery = window.matchMedia("(orientation: portrait)");
    const screenQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    
    // Event listeners
    const handleResize = () => checkIsMobile();
    const handleOrientationChange = () => {
      // Small delay to ensure orientation change is complete
      setTimeout(checkIsMobile, 100);
    };

    // Add listeners
    window.addEventListener('resize', handleResize);
    orientationQuery.addEventListener('change', handleOrientationChange);
    screenQuery.addEventListener('change', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      orientationQuery.removeEventListener('change', handleOrientationChange);
      screenQuery.removeEventListener('change', handleResize);
    };
  }, [breakpoint]);

  return {
    isMobile,
    ...deviceInfo,
    // Utility functions for common breakpoints
    isTablet: deviceInfo.screenWidth > 768 && deviceInfo.screenWidth <= breakpoint,
    isDesktop: deviceInfo.screenWidth > breakpoint,
    isLandscape: !deviceInfo.isPortrait,
    // Responsive breakpoint helpers
    isSmallMobile: deviceInfo.screenWidth <= 480,
    isMediumMobile: deviceInfo.screenWidth > 480 && deviceInfo.screenWidth <= 768,
    isLargeMobile: deviceInfo.screenWidth > 768 && deviceInfo.screenWidth <= breakpoint
  };
};

export default useIsMobile;
