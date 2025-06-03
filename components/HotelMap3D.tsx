import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Mesh } from 'three';
import useExperienceStore from '../store/useExperienceStore';

interface RoomProps {
  position: [number, number, number];
  size: [number, number, number];
  title: string;
  onClick: () => void;
}

const Room = ({ position, size, title, onClick }: RoomProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={hovered ? 'orange' : 'hotpink'} />
      {hovered && (
        <Html center>
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            padding: '4px 12px',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#333',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>{title}</div>
        </Html>
      )}
    </mesh>
  );
};

export default function HotelMap3D() {
  const { setSelectedExperience } = useExperienceStore();

  const rooms = [
    { position: [0, 0, 0] as [number, number, number], size: [1, 1, 1] as [number, number, number], title: 'Spa', id: 1001 },
    { position: [2, 0, 0] as [number, number, number], size: [1, 1, 1] as [number, number, number], title: 'Gym', id: 1002 },
    { position: [0, 0, 2] as [number, number, number], size: [1, 1, 1] as [number, number, number], title: 'Lobby', id: 1003 },
  ];

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {rooms.map((room) => (
          <Room
            key={room.title}
            position={room.position}
            size={room.size}
            title={room.title}
            onClick={() => setSelectedExperience({ id: room.id, title: room.title })}
          />
        ))}
        <OrbitControls enableZoom enablePan enableRotate />
      </Canvas>
    </div>
  );
} 