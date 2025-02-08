// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { Box, Eye } from 'lucide-react';
import Card from './ui/Card';
import ModelViewer from './ModelViewer';
// import PlacementBoxControls from '../hooks/PlacementBoxControls';

// src/components/Dashboard.jsx
import PlacementBoxControls from './PlacementBoxControls';  // Correct path


const Dashboard = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [placementMode, setPlacementMode] = useState(false);
  const [placedBoxes, setPlacedBoxes] = useState([]);

  const handleConfirmPlacement = (boxData) => {
    setPlacedBoxes([...placedBoxes, boxData]);
    setPlacementMode(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <Card className="w-64 m-2 flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-bold mb-4">Visualization</h2>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`flex items-center space-x-2 w-full p-2 rounded ${
              showGrid ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
          >
            {showGrid ? <Box size={20} /> : <Eye size={20} />}
            <span>{showGrid ? 'Hide Grid' : 'Show Grid'}</span>
          </button>
        </div>

        <PlacementBoxControls 
          isPlacing={placementMode}
          onStartPlacement={() => setPlacementMode(true)}
          onConfirmPlacement={() => setPlacementMode(false)}
          onCancel={() => setPlacementMode(false)}
        />
      </Card>

      {/* Main Content */}
      <Card className="flex-1 m-2">
        <div className="h-full">
          <ModelViewer 
            modelUrl="park.glb"
            showSegmentation={showGrid}
            placementMode={placementMode}
            onBoxPlaced={handleConfirmPlacement}
            placedBoxes={placedBoxes}
          />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;