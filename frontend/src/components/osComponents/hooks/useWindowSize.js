import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adiciona auxiliares de breakpoint
  const isMobile = windowSize.width <= 430;
  const isTablet = windowSize.width > 430 && windowSize.width <= 768;
  const isDesktop = windowSize.width > 768;

  return {
    ...windowSize,
    isMobile,
    isTablet,
    isDesktop
  };
};

export default useWindowSize;