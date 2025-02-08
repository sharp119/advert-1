// src/components/VolumeSegmentation.jsx
import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { GridHelper, Box3, Vector3, LineSegments, BufferGeometry, Float32BufferAttribute, LineBasicMaterial } from 'three';
import { useGLTF } from '@react-three/drei';
import { useGridData } from '../hooks/useGridData';

const VolumeSegmentation = ({ modelUrl }) => {
    const { scene } = useGLTF(modelUrl);
    const { scene: threeScene } = useThree();
    const { setGridData } = useGridData();

    useEffect(() => {
        if (scene) {
            const box = new Box3().setFromObject(scene);
            const min = box.min;
            const max = box.max;
            const size = new Vector3();
            box.getSize(size);

            // Calculate grid parameters
            const divisions = Math.max(Math.ceil(size.x), Math.ceil(size.z));
            const stepX = size.x / divisions;
            const stepZ = size.z / divisions;
            const layers = Array.from({ length: Math.ceil(size.y) }, (_, i) => min.y + i);

            // Update grid context
            setGridData({
                step: [stepX, 1, stepZ],
                bounds: {
                    min: [min.x, min.y, min.z],
                    max: [max.x, max.y, max.z]
                },
                layers
            });

            // Grid creation logic
            const gridSizeXZ = Math.max(size.x, size.z);
            const gridCornerPoints = {};
            const gridElements = [];

            // Create horizontal grids (XZ planes)
            layers.forEach(y => {
                const grid = new GridHelper(
                    gridSizeXZ,
                    divisions,
                    0x0000ff,
                    0x0000ff
                );
                grid.position.set(
                    min.x + size.x/2,
                    y,
                    min.z + size.z/2
                );
                grid.material.opacity = 0.2;
                grid.material.transparent = true;
                threeScene.add(grid);
                gridElements.push(grid);

                // Store corner points for vertical lines
                const points = [];
                const halfSize = gridSizeXZ / 2;
                const centerX = min.x + size.x/2;
                const centerZ = min.z + size.z/2;

                for (let i = 0; i <= divisions; i++) {
                    for (let j = 0; j <= divisions; j++) {
                        points.push(new Vector3(
                            centerX - halfSize + i * stepX,
                            y,
                            centerZ - halfSize + j * stepZ
                        ));
                    }
                }
                gridCornerPoints[y] = points;
            });

            // Create vertical connecting lines
            const verticalLineGeometry = new BufferGeometry();
            const verticalLineMaterial = new LineBasicMaterial({ 
                color: 0x0000ff, 
                transparent: true, 
                opacity: 0.3 
            });
            
            const verticalLineVertices = [];
            for (let i = 0; i < layers.length - 1; i++) {
                const currentY = layers[i];
                const nextY = layers[i + 1];
                
                gridCornerPoints[currentY].forEach((point, index) => {
                    const nextPoint = gridCornerPoints[nextY][index];
                    verticalLineVertices.push(
                        point.x, point.y, point.z,
                        nextPoint.x, nextPoint.y, nextPoint.z
                    );
                });
            }

            verticalLineGeometry.setAttribute(
                'position',
                new Float32BufferAttribute(verticalLineVertices, 3)
            );
            
            const verticalLines = new LineSegments(
                verticalLineGeometry, 
                verticalLineMaterial
            );
            threeScene.add(verticalLines);
            gridElements.push(verticalLines);

            // Cleanup function
            return () => {
                gridElements.forEach(element => {
                    if (element instanceof GridHelper) {
                        threeScene.remove(element);
                        element.geometry.dispose();
                        element.material.dispose();
                    }
                    if (element instanceof LineSegments) {
                        threeScene.remove(element);
                        element.geometry.dispose();
                        element.material.dispose();
                    }
                });
            };
        }
    }, [scene, setGridData, threeScene]);

    return null;
};

export default VolumeSegmentation;