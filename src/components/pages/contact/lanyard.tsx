'use client';
import { useGLTF, useTexture } from '@react-three/drei';
import { Canvas, extend } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import Band from '@/components/ui/band';

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload('/assets/3d/card.glb');
useTexture.preload('/assets/images/tag_texture.png');

export const Lanyard = () => {
  return (
    <div className="flex h-[80vh] w-full">
      <Canvas
        camera={{ position: [0, 0, 13], fov: 25 }}
        style={{ backgroundColor: 'transparent' }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics
          debug={false}
          interpolate
          gravity={[0, -40, 0]}
          timeStep={1 / 60}
        >
          <Band />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Lanyard;
