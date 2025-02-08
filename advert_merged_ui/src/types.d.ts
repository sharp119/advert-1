// src/types.d.ts
/// <reference types="@react-three/fiber" />
/// <reference types="three" />

declare namespace JSX {
    interface IntrinsicElements {
      primitive: any;
      ambientLight: any;
      pointLight: any;
      group: any;
      mesh: any;
      bufferGeometry: any;
      lineSegments: any;
      gridHelper: any;
    }
  }
  
  declare module "*.glb" {
    const content: string;
    export default content;
  }
  
  declare module "*.gltf" {
    const content: string;
    export default content;
  }