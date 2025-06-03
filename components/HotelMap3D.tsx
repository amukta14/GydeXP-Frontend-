import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import * as THREE from 'three';
import dynamic from 'next/dynamic';

interface RoomProps {
  position: [number, number, number];
  size: [number, number, number];
  title: string;
  color?: string;
}

function Room({ position, size, title, color = '#4B5563' }: RoomProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={hovered ? '#60A5FA' : color} 
        metalness={0.5}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
      <Html
        position={[0, size[1] / 2 + 0.5, 0]}
        center
        style={{
          pointerEvents: 'none',
          transform: 'translate3d(-50%, -50%, 0)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap"
        >
          {title}
        </motion.div>
      </Html>
    </mesh>
  );
}

function HotelFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#E5E7EB" metalness={0.1} roughness={0.8} />
    </mesh>
  );
}

function HotelWalls() {
  return (
    <>
      {/* Back wall */}
      <mesh position={[0, 5, -10]}>
        <boxGeometry args={[50, 10, 0.5]} />
        <meshStandardMaterial color="#F3F4F6" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial color="#F3F4F6" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Right wall */}
      <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial color="#F3F4F6" metalness={0.1} roughness={0.8} />
      </mesh>
    </>
  );
}

function Scene() {
  const rooms: RoomProps[] = [
    { position: [-4, 0, -4] as [number, number, number], size: [3, 3, 3] as [number, number, number], title: 'Spa', color: '#F472B6' },
    { position: [4, 0, -4] as [number, number, number], size: [3, 3, 3] as [number, number, number], title: 'Gym', color: '#60A5FA' },
    { position: [-4, 0, 4] as [number, number, number], size: [3, 3, 3] as [number, number, number], title: 'Restaurant', color: '#34D399' },
    { position: [4, 0, 4] as [number, number, number], size: [3, 3, 3] as [number, number, number], title: 'Pool', color: '#818CF8' },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <HotelFloor />
      <HotelWalls />
      {rooms.map((room, index) => (
        <Room key={index} {...room} />
      ))}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
      />
    </>
  );
}

function HotelMap3DComponent() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <Scene />
      </Canvas>
      <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
        <FaInfoCircle />
        <span>Click and drag to explore</span>
      </div>
    </div>
  );
}

// Use dynamic import with SSR disabled for the 3D component
const HotelMap3D = dynamic(() => Promise.resolve(HotelMap3DComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] relative flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="text-gray-500 dark:text-gray-400">Loading 3D Map...</div>
    </div>
  )
});

export default HotelMap3D; 