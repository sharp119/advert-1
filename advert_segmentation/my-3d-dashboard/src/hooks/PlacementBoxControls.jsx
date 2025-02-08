// src/components/PlacementBoxControls.jsx
import { useState, useEffect } from 'react';
import { useGridData } from './useGridData';

const PlacementBoxControls = ({ 
  isPlacing,
  onStartPlacement,
  onConfirmPlacement,
  onCancel
}) => {
  const { gridState } = useGridData();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">Box Placement Tool</h3>
      
      {!isPlacing ? (
        <button
          onClick={onStartPlacement}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Box Placement
        </button>
      ) : (
        <>
          <div className="space-y-2">
            <button
              onClick={onConfirmPlacement}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirm Position
            </button>
            <button
              onClick={onCancel}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel Placement
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p className="cursor-pointer underline" onClick={() => setShowHelp(!showHelp)}>
              Controls {showHelp ? '▲' : '▼'}
            </p>
            {showHelp && (
              <div className="mt-2 space-y-1">
                <p>← → ↑ ↓ : Move Box</p>
                <p>Shift: Slow Movement</p>
                <p>Ctrl: Fast Movement</p>
                <p>Grid Snap: {gridState.step.join(' x ')} units</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlacementBoxControls;