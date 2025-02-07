// src/components/GridRaycaster.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GridRaycaster = ({ onLayerSelect }) => {
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const { camera, scene, gl } = useThree();
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [intersectedObject, setIntersectedObject] = useState(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      // Normalize mouse coordinates to -1 to +1 range (viewport)
      mouse.current.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);

      // Raycast against GridHelpers in the scene
      const intersects = raycaster.current.intersectObjects(scene.children.filter(obj => obj.type === 'GridHelper'));

      if (intersects.length > 0) {
        const intersection = intersects[0];
        const gridObject = intersection.object;
        setIntersectedObject(gridObject);

        // Assuming GridHelper position.y represents the layer level
        const layer = Math.round(gridObject.position.y); // Round to nearest integer
        setSelectedLayer(layer);
        onLayerSelect(layer); // Notify parent component about layer selection

      } else {
        setSelectedLayer(null);
        setIntersectedObject(null);
        onLayerSelect(null); // Clear selection in parent component
      }
    };

    gl.domElement.addEventListener('pointerdown', handlePointerDown);

    return () => {
      gl.domElement.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [camera, scene, gl, onLayerSelect]);

  return null; // This component doesn't render anything directly
};

export default GridRaycaster;