'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Torus } from '@react-three/drei';

export default function SceneHome() {
  const boxRef = useRef();
  const torusRef = useRef();

  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.x += delta * 0.5;
      boxRef.current.rotation.y += delta * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x -= delta * 0.3;
      torusRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <Box ref={boxRef} args={[1, 1, 1]} position={[-1.5, 0, 0]}>
        <meshStandardMaterial color="orange" />
      </Box>

      <Torus ref={torusRef} args={[0.8, 0.2, 16, 100]} position={[1.5, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Torus>
    </>
  );
}
