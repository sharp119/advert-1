// src/hooks/useKeyboardControls.js
import { useKeyboardControls } from '@react-three/drei';
import { useState } from 'react';  // Add this


export const useMovementKeys = () => {
  const [sub] = useKeyboardControls();
  const [keys, setKeys] = useState({
    arrowUp: false,
    arrowDown: false,
    arrowLeft: false,
    arrowRight: false,
    shift: false,
    control: false
  });

  useEffect(() => {
    return sub(
      (state) => ({
        arrowUp: state.arrowUp,
        arrowDown: state.arrowDown,
        arrowLeft: state.arrowLeft,
        arrowRight: state.arrowRight,
        shift: state.shift,
        control: state.control
      }),
      (keys) => setKeys(keys)
    );
  }, []);

  return keys;
};