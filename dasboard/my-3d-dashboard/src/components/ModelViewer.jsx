// src/components/ModelViewer.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import VolumeSegmentation from './VolumeSegmentation';
import GridRaycaster from './GridRaycaster'; // Import GridRaycaster

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={[0, 0, 0]} />;
}

const ModelViewer = ({ modelUrl, showSegmentation = false, selectedLayer, onLayerSelect }) => { // Receive selectedLayer and onLayerSelect
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [10, 10, 10], fov: 45 }}
        style={{ background: '#f0f0f0' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
          {showSegmentation && (
            <VolumeSegmentation
              modelUrl={modelUrl}
              selectedLayer={selectedLayer} // Pass selectedLayer to VolumeSegmentation
            />
          )}
        </Suspense>
        <OrbitControls />
        <GridRaycaster onLayerSelect={onLayerSelect} /> {/* Add GridRaycaster and pass onLayerSelect */}
      </Canvas>
    </div>
  );
};

export default ModelViewer;