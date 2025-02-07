// src/components/VolumeSegmentation.jsx
import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Box3, Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';

const CubeSegment = ({ position, size, status = 'available' }) => {
  const colors = {
    owned: '#ff0000',
    available: '#00ff00',
    notAvailable: '#808080'
  };

  return (
    <group position={position}>
      {/* Transparent faces */}
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={colors[status]}
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>
      
      {/* Visible edges */}
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial
          color={colors[status]}
          wireframe
          wireframeLinewidth={2}
        />
      </mesh>
    </group>
  );
};

const VolumeSegmentation = ({ modelUrl, segmentSize = 2 }) => {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (scene) {
      // Calculate bounds of the model
      const box = new Box3().setFromObject(scene);
      const size = new Vector3();
      box.getSize(size);

      // Calculate number of segments needed in each dimension
      const segments = {
        x: Math.ceil(size.x / segmentSize),
        y: Math.ceil(size.y / segmentSize),
        z: Math.ceil(size.z / segmentSize)
      };

      // Calculate starting position (bottom-left-front corner)
      const start = new Vector3();
      box.getCenter(start);
      start.x -= (segments.x * segmentSize) / 2;
      start.y -= (segments.y * segmentSize) / 2;
      start.z -= (segments.z * segmentSize) / 2;

      // Generate segments
      const newSegments = [];
      for (let x = 0; x < segments.x; x++) {
        for (let y = 0; y < segments.y; y++) {
          for (let z = 0; z < segments.z; z++) {
            newSegments.push({
              position: [
                start.x + (x * segmentSize) + (segmentSize / 2),
                start.y + (y * segmentSize) + (segmentSize / 2),
                start.z + (z * segmentSize) + (segmentSize / 2)
              ],
              size: segmentSize,
              status: 'available'
            });
          }
        }
      }

      // Store segments in ref for rendering
      groupRef.current = newSegments;

      // Adjust camera position based on model size
      const maxDim = Math.max(size.x, size.y, size.z);
      camera.position.set(maxDim * 2, maxDim * 2, maxDim * 2);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [scene, segmentSize, camera]);

  return (
    <group>
      {groupRef.current?.map((segment, index) => (
        <CubeSegment
          key={index}
          position={segment.position}
          size={segment.size}
          status={segment.status}
        />
      ))}
    </group>
  );
};

export default VolumeSegmentation;