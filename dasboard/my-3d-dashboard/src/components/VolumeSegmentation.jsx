// src/components/VolumeSegmentation.jsx
import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { GridHelper, Box3, Vector3, LineSegments, BufferGeometry, Float32BufferAttribute, LineBasicMaterial, Color } from 'three';
import { useGLTF } from '@react-three/drei';

const VolumeSegmentation = ({ modelUrl, selectedLayer }) => { // Receive selectedLayer prop
  const { scene } = useGLTF(modelUrl);
  const { scene: threeScene } = useThree();

  useEffect(() => {
    if (scene) {
      const box = new Box3().setFromObject(scene);
      const min = box.min;
      const max = box.max;
      const center = new Vector3();
      box.getCenter(center);

      // Calculate integer grid positions within model bounds
      const startY = Math.ceil(min.y);
      const endY = Math.floor(max.y);
      const startZ = Math.ceil(min.z);
      const endZ = Math.floor(max.z);
      const startX = Math.ceil(min.x);
      const endX = Math.floor(max.x);

      // Calculate actual model dimensions
      const size = new Vector3();
      box.getSize(size);

      const gridSizeXZ = Math.max(size.x, size.z);
      const gridDivisions = Math.max(Math.ceil(size.x), Math.ceil(size.z)); // Use integer divisions

      // Store corner points for vertical lines
      const gridCornerPoints = {};
      const createdGrids = []; // To store created grids for highlighting

      // XZ Planes (horizontal) - Blue Grids and Corner Points
      for (let y = startY; y <= endY; y++) {
        const grid = new GridHelper(
          gridSizeXZ,
          gridDivisions,
          0x0000ff,
          0x0000ff
        );
        grid.position.set(center.x, y, center.z);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        threeScene.add(grid);
        createdGrids.push(grid); // Store the grid

        // Calculate corner points for this grid level
        const points = [];
        const halfSize = gridSizeXZ / 2;
        const step = gridSizeXZ / gridDivisions;
        const gridCenterX = center.x;
        const gridCenterZ = center.z;

        for (let i = 0; i <= gridDivisions; i++) {
          for (let j = 0; j <= gridDivisions; j++) {
            points.push(new Vector3(
              gridCenterX - halfSize + i * step,
              y,
              gridCenterZ - halfSize + j * step
            ));
          }
        }
        gridCornerPoints[y] = points;
      }

      // Create vertical lines connecting corners
      const verticalLineGeometry = new BufferGeometry();
      const verticalLineMaterial = new LineBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.3 });
      const verticalLineVertices = [];

      for (let y = startY; y < endY; y++) {
        const currentLevelPoints = gridCornerPoints[y];
        const nextLevelPoints = gridCornerPoints[y + 1];

        if (currentLevelPoints && nextLevelPoints) {
          for (let i = 0; i < currentLevelPoints.length; i++) {
            verticalLineVertices.push(currentLevelPoints[i].x, currentLevelPoints[i].y, currentLevelPoints[i].z);
            verticalLineVertices.push(nextLevelPoints[i].x, nextLevelPoints[i].y, nextLevelPoints[i].z);
          }
        }
      }

      verticalLineGeometry.setAttribute('position', new Float32BufferAttribute(verticalLineVertices, 3));
      const verticalLines = new LineSegments(verticalLineGeometry, verticalLineMaterial);
      threeScene.add(verticalLines);

      // --- Layer Highlighting ---
      if (selectedLayer !== null) {
        createdGrids.forEach(grid => {
          if (Math.round(grid.position.y) === selectedLayer) {
            grid.material.color = new Color(0xffff00); // Highlight color - yellow
            grid.material.opacity = 0.7; // Make highlighted grid more opaque
          } else {
            grid.material.color = new Color(0x0000ff); // Default grid color - blue
            grid.material.opacity = 0.2; // Default opacity
          }
        });
      }


      // Commenting out vertical grids as per user request
      /*
      // XY Planes (vertical along Z) - Green Grids
      for (let z = startZ; z <= endZ; z++) {
          const grid = new GridHelper(
              Math.max(size.x, size.y),
              Math.max(size.x, size.y),
              0x00ff00,
              0x00ff00
          );
          grid.rotation.x = Math.PI / 2;
          grid.position.set(center.x, center.y, z);
          grid.material.opacity = 0.2;
          grid.material.transparent = true;
          threeScene.add(grid);
      }

      // YZ Planes (vertical along X) - Red Grids
      for (let x = startX; x <= endX; x++) {
          const grid = new GridHelper(
              Math.max(size.y, size.z),
              Math.max(size.y, size.z),
              0xff0000,
              0xff0000
          );
          grid.rotation.z = Math.PI / 2;
          grid.position.set(x, center.y, z);
          grid.material.opacity = 0.2;
          grid.material.transparent = true;
          threeScene.add(grid);
      }
      */
    }

    return () => {
      const grids = threeScene.children.filter(child => child instanceof GridHelper);
      grids.forEach(grid => threeScene.remove(grid));
      const lines = threeScene.children.filter(child => child instanceof LineSegments);
      lines.forEach(line => threeScene.remove(line));
    };
  }, [scene, threeScene, selectedLayer]); // React to selectedLayer changes

  return null;
};

export default VolumeSegmentation;