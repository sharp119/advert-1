// src/components/ModelViewer.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import VolumeSegmentation from './VolumeSegmentation';
import PlacementBoxTool from './PlacementBoxTool';
import { Box } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={[0, 0, 0]} />;
}

const ModelViewer = ({ 
  modelUrl, 
  showSegmentation, 
  placementMode,
  onBoxPlaced,
  placedBoxes
}) => {
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
          
          {showSegmentation && <VolumeSegmentation modelUrl={modelUrl} />}
          
          {placementMode && (
            <PlacementBoxTool onConfirm={onBoxPlaced} />
          )}

          {placedBoxes.map((box, index) => (
            <Box
              key={index}
              args={box.dimensions}
              position={box.position}
            >
              <meshStandardMaterial color="#00ff88" transparent opacity={0.2} />
              <Edges color="#ffffff" />
            </Box>
          ))}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;