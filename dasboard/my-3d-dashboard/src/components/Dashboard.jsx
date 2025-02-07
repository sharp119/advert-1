// src/components/Dashboard.jsx
import React, { useState, useCallback } from 'react';
import { Box, Eye } from 'lucide-react';
import Card from './ui/Card';
import ModelViewer from './ModelViewer';
import LayerUI from './LayerUI'; // Import LayerUI

const Dashboard = () => {
  const [showGrid, setShowGrid] = useState(true); // Grid initially visible
  const [selectedLayer, setSelectedLayer] = useState(null); // Track selected layer
  const [availableLayers, setAvailableLayers] = useState([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]); // Example layers - will be dynamically set

  // Callback function to handle layer selection from both Raycaster and LayerUI
  const handleLayerSelect = useCallback((layer) => {
    setSelectedLayer(layer);
    console.log("Selected Layer in Dashboard:", layer); // Debugging
  }, []);


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <Card className="w-64 m-2 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">Tools</h2>
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

        {/* Layer UI Component */}
        <LayerUI
          layers={availableLayers}
          selectedLayer={selectedLayer}
          onLayerSelect={handleLayerSelect}
        />
      </Card>

      {/* Main Content */}
      <Card className="flex-1 m-2">
        <div className="h-full">
          <ModelViewer
            modelUrl="park.glb"
            showSegmentation={showGrid}
            selectedLayer={selectedLayer} // Pass selectedLayer to ModelViewer
            onLayerSelect={handleLayerSelect} // Pass handleLayerSelect to ModelViewer
          />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;