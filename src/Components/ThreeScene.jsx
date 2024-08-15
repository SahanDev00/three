import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { Text3D } from '@react-three/drei'; // Import Text3D
import * as THREE from 'three';
import model from '../Models/model.glb';
import fontJson from '../fonts/Poppins_Regular.json'; // Import the font JSON file

// Component to load and display the 3D model
const Model = () => {
  const gltf = useLoader(GLTFLoader, model); // Load the model
  const ref = useRef();
  const torchRef = useRef(new THREE.PointLight(0xffffff, 1, 100));

  // Update torch position based on mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      torchRef.current.position.x = x * 10;
      torchRef.current.position.y = y * 7;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Rotate model for animation
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <ambientLight intensity={0} />
      <pointLight ref={torchRef} position={[0, 0, 2]} />
      <primitive
        ref={ref}
        object={gltf.scene}
        scale={[0.05, 0.05, 0.05]}
        position={[0, 0.5, 0]} // Center the model
      />
    </>
  );
};

// Component to display the 3D heading
const Heading = () => {
  const textRef = useRef();

  return (
    <Text3D
      ref={textRef}
      font={fontJson} // Provide the font JSON file
      size={1} // Adjust size for better visibility
      height={0.2} // Depth of the text
      curveSegments={25} // Number of segments to smooth the text
      bevelEnabled
      bevelThickness={0.4}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={2}
      position={[-5, -2, 0]} // Position it below the model and closer to the camera
    >
      SYNTAXWARE
      <meshStandardMaterial attach="material" color="gray" />
    </Text3D>
  );
};

// Main Canvas component
const ThreeScene = () => {
  return (
    <Canvas
      className='flex justify-center items-center flex-col'
      camera={{ position: [0, 5, 20], fov: 50 }} // Adjust camera position
    >
      <Model />
      <Heading />
    </Canvas>
  );
};

export default ThreeScene;
