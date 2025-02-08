// src/components/PlacementBoxTool.jsx
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Edges, Text } from '@react-three/drei';
import { Vector3 } from 'three';
import { useMovementKeys } from '../hooks/useKeyboardControls';
import { useGridData } from '../hooks/useGridData';

const PlacementBoxTool = ({ onConfirm }) => {
  const ref = useRef();
  const keys = useMovementKeys();
  const { gridState } = useGridData();
  const { camera } = useThree();
  
  const [rawPosition, setRawPosition] = useState(new Vector3(0, 0, 0));
  const [isSnapped, setIsSnapped] = useState(true);

  // Movement constraints
  const constrainPosition = (pos) => {
    return pos.clamp(
      new Vector3(...gridState.bounds.min),
      new Vector3(...gridState.bounds.max)
    );
  };

  // Grid snapping logic
  const snapToGrid = (position) => {
    return position.clone().divide(gridState.step).floor().multiply(gridState.step);
  };

  useFrame((_, delta) => {
    if (!keys) return;
    
    // Calculate movement speed
    const baseSpeed = 2;
    const speedMultiplier = keys.shift ? 0.5 : keys.control ? 2 : 1;
    const speed = baseSpeed * speedMultiplier * delta;

    // Calculate movement vector
    const moveDelta = new Vector3();
    if (keys.arrowUp) moveDelta.z -= speed;
    if (keys.arrowDown) moveDelta.z += speed;
    if (keys.arrowLeft) moveDelta.x -= speed;
    if (keys.arrowRight) moveDelta.x += speed;

    // Apply movement
    const newPosition = constrainPosition(rawPosition.clone().add(moveDelta));
    setRawPosition(newPosition);

    // Check snapping state
    const snappedPos = snapToGrid(newPosition);
    setIsSnapped(snappedPos.distanceTo(newPosition) < 0.01);
  });

  // src/components/PlacementBoxTool.jsx
useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleConfirm();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [rawPosition]);

  // Handle final position confirmation
  const handleConfirm = () => {
    const finalPosition = snapToGrid(rawPosition);
    onConfirm({
      position: finalPosition.toArray(),
      dimensions: [1, 1, 1] // Default size, can be made adjustable
    });
  };

  // Actual position with smoothing
  const currentPosition = rawPosition.clone().lerp(
    snapToGrid(rawPosition), 
    isSnapped ? 1 : 0.2
  );

  return (
    <group ref={ref} position={currentPosition}>
      <Box args={[1, 1, 1]}>
        <meshStandardMaterial 
          color={isSnapped ? '#00ff88' : '#ff8800'} 
          transparent 
          opacity={0.6} 
        />
        <Edges color={isSnapped ? '#ffffff' : '#ff0000'} />
      </Box>
      
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.2}
        color={isSnapped ? 'white' : 'red'}
        anchorX="center"
        anchorY="middle"
      >
        {isSnapped ? 'Snapped' : 'Moving...'}
      </Text>
    </group>
  );
};

export default PlacementBoxTool;