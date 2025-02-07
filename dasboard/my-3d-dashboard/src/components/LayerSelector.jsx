// src/components/LayerSelector.jsx
import React from 'react';

const LayerSelector = ({ layers, onLayerSelect, selectedLayer }) => {
  return (
    <div>
      <label htmlFor="layer-select" className="block text-sm font-medium text-gray-700">
        Select Layer (Y-Level)
      </label>
      <select
        id="layer-select"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        value={selectedLayer !== null ? selectedLayer : ''} // Handle null initial value
        onChange={(e) => {
          const layerValue = e.target.value === '' ? null : parseInt(e.target.value, 10); // Parse back to number or null
          onLayerSelect(layerValue);
        }}
      >
        <option value="">-- Select Layer --</option> {/* Default option */}
        {layers.map((layer) => (
          <option key={layer} value={layer}>
            Y = {layer}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LayerSelector;