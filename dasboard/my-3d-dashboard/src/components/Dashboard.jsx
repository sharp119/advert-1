// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { Maximize2, ZoomIn, Box, Layers } from 'lucide-react';
import Card from './ui/Card';
import ModelViewer from './ModelViewer';

const Dashboard = () => {
  const [selectedTool, setSelectedTool] = useState('view');
  const [selectedModel, setSelectedModel] = useState(null);
  const [showSegmentation, setShowSegmentation] = useState(false);
  const [segmentationConfig, setSegmentationConfig] = useState({
    dimensions: [5, 5, 5],
    segmentSize: 1,
    segments: []
  });

  // Sample model data with GLB URLs
  const sampleModels = [
    { id: 1, name: 'Model 1', url: '/path/to/your/model1.glb' },
    { id: 2, name: 'Model 2', url: '/path/to/your/model2.glb' },
    { id: 3, name: 'Model 3', url: '/path/to/your/model3.glb' },
  ];

  // Tools data
  const tools = [
    { id: 'view', name: 'View', icon: <Maximize2 size={20} /> },
    { id: 'zoom', name: 'Zoom', icon: <ZoomIn size={20} /> },
    { 
      id: 'segment', 
      name: 'Segment', 
      icon: <Box size={20} />,
      action: () => setShowSegmentation(!showSegmentation)
    },
    { id: 'layers', name: 'Layers', icon: <Layers size={20} /> },
  ];

  const handleToolClick = (tool) => {
    setSelectedTool(tool.id);
    if (tool.action) {
      tool.action();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Tools */}
      <Card className="w-64 m-2">
        <h2 className="text-lg font-bold mb-4">Tools</h2>
        <div className="space-y-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className={`flex items-center space-x-2 w-full p-2 rounded ${
                selectedTool === tool.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              {tool.icon}
              <span>{tool.name}</span>
            </button>
          ))}
        </div>
        
        {/* Segmentation Controls */}
        {selectedTool === 'segment' && (
          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Segmentation Settings</h3>
            <div>
              <label className="block text-sm">Grid Size</label>
              <select 
                className="w-full p-1 border rounded"
                onChange={(e) => {
                  const size = parseInt(e.target.value);
                  setSegmentationConfig(prev => ({
                    ...prev,
                    dimensions: [size, size, size]
                  }));
                }}
                value={segmentationConfig.dimensions[0]}
              >
                <option value="3">3x3x3</option>
                <option value="5">5x5x5</option>
                <option value="7">7x7x7</option>
                <option value="10">10x10x10</option>
              </select>
            </div>
          </div>
        )}
      </Card>

      {/* Main Content Area */}
      <Card className="flex-1 m-2">
        <div className="h-full">
          <ModelViewer 
             modelUrl="park.glb"
             showSegmentation={selectedTool === 'segment'}
             segmentSize={2}
          />
        </div>
      </Card>

      {/* Right Sidebar - Model Browser */}
      <Card className="w-64 m-2">
        <h2 className="text-lg font-bold mb-4">Models</h2>
        <div className="space-y-2">
          {sampleModels.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className={`w-full p-2 text-left rounded ${
                selectedModel?.id === model.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;