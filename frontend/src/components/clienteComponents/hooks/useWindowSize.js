// clienteComponents/hooks/useWindowSize.js
import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  // Estado para dimensões da janela
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Atualiza dimensões da janela
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Adiciona listener
    window.addEventListener("resize", handleResize);
    
    // Define tamanho inicial
    handleResize();
    
    // Remove listener ao desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};