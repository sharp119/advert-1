// src/components/LayerUI.jsx
 import React from 'react';

 const LayerUI = ({ layers, selectedLayer, onLayerSelect }) => {
   return (
     <div>
       <h3 className="text-sm font-bold mb-2">Select Layer (Y-Level)</h3>
       <div className="overflow-y-auto h-40 border rounded p-2">
         {layers.map((layer) => (
           <button
             key={layer}
             onClick={() => onLayerSelect(layer)}
             className={`block w-full text-left p-2 rounded hover:bg-gray-100 ${
               selectedLayer === layer ? 'bg-blue-200 font-semibold' : ''
             }`}
           >
             Layer Y = {layer}
           </button>
         ))}
       </div>
     </div>
   );
 };

 export default LayerUI;