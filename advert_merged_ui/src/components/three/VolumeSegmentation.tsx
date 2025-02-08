// src/components/three/VolumeSegmentation.tsx
'use client';

import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { GridHelper, Box3, Vector3, LineSegments, BufferGeometry, Float32BufferAttribute, LineBasicMaterial } from 'three';
import { useGLTF } from '@react-three/drei';

interface VolumeSegmentationProps {
  modelUrl: string;
  blockSize: number;
  heightLevels: number;
}

const VolumeSegmentation: React.FC<VolumeSegmentationProps> = ({ 
  modelUrl, 
  blockSize = 2,
  heightLevels = 1 
}) => {
  const { scene } = useGLTF(modelUrl);
  const { scene: threeScene } = useThree();

  useEffect(() => {
    if (scene) {
      const box = new Box3().setFromObject(scene);
      const min = box.min;
      const max = box.max;
      const center = new Vector3();
      box.getCenter(center);

      const size = new Vector3();
      box.getSize(size);

      const gridSizeXZ = Math.max(size.x, size.z);
      const gridDivisions = Math.floor(gridSizeXZ / blockSize);
      const gridCornerPoints: Record<number, Vector3[]> = {};

      // Create horizontal grids
      for (let y = min.y; y <= max.y; y += heightLevels) {
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

        // Store corner points
        const points: Vector3[] = [];
        const halfSize = gridSizeXZ / 2;
        const step = gridSizeXZ / gridDivisions;

        for (let i = 0; i <= gridDivisions; i++) {
          for (let j = 0; j <= gridDivisions; j++) {
            points.push(new Vector3(
              center.x - halfSize + i * step,
              y,
              center.z - halfSize + j * step
            ));
          }
        }
        gridCornerPoints[y] = points;
      }

      // Add vertical lines
      const verticalLineGeometry = new BufferGeometry();
      const verticalLineMaterial = new LineBasicMaterial({ 
        color: 0x0000ff, 
        transparent: true, 
        opacity: 0.3 
      });
      const verticalLineVertices: number[] = [];

      Object.keys(gridCornerPoints).forEach((yLevel, index, array) => {
        if (index < array.length - 1) {
          const currentLevel = Number(yLevel);
          const nextLevel = Number(array[index + 1]);
          const currentPoints = gridCornerPoints[currentLevel];
          const nextPoints = gridCornerPoints[nextLevel];

          currentPoints.forEach((point, pointIndex) => {
            verticalLineVertices.push(point.x, point.y, point.z);
            verticalLineVertices.push(
              nextPoints[pointIndex].x,
              nextPoints[pointIndex].y,
              nextPoints[pointIndex].z
            );
          });
        }
      });

      verticalLineGeometry.setAttribute(
        'position', 
        new Float32BufferAttribute(verticalLineVertices, 3)
      );
      const verticalLines = new LineSegments(verticalLineGeometry, verticalLineMaterial);
      threeScene.add(verticalLines);
    }

    return () => {
      const grids = threeScene.children.filter(child => child instanceof GridHelper);
      grids.forEach(grid => threeScene.remove(grid));
      const lines = threeScene.children.filter(child => child instanceof LineSegments);
      lines.forEach(line => threeScene.remove(line));
    };
  }, [scene, threeScene, blockSize, heightLevels]);

  return null;
};

export default VolumeSegmentation;