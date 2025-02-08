// src/hooks/useGridData.js
import { createContext, useContext, useState } from 'react';

const GridContext = createContext();

export const GridProvider = ({ children }) => {
  const [gridData, setGridData] = useState({
    step: [1, 1, 1],          // Grid spacing in X/Y/Z
    bounds: {                 // Model boundaries
      min: [0, 0, 0],
      max: [10, 10, 10]
    },
    layers: []                // Available Y-level layers
  });

  return (
    <GridContext.Provider value={{ gridData, setGridData }}>
      {children}
    </GridContext.Provider>
  );
};

export const useGridData = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('useGridData must be used within a GridProvider');
  }
  return context;
};