import { useState, useEffect } from 'react';

const useWindowSize = () => {
  // Define o estado inicial como undefined
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Função que atualiza o estado com o tamanho atual da janela
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Adiciona o event listener quando o componente monta
    window.addEventListener("resize", handleResize);
    
    // Chama handleResize imediatamente para definir o tamanho inicial
    handleResize();

    // Cleanup: remove o event listener quando o componente desmonta
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Array vazio significa que só executa na montagem e desmontagem

  return windowSize;
};

export default useWindowSize;