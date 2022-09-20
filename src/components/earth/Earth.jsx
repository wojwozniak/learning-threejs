import React, {useRef} from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

import EarthDayMap from '../../assets/textures/8k_earth_daymap.jpg';
import EarthNormalMap from '../../assets/textures/8k_earth_normal_map.jpg';
import EarthSpecularMap from '../../assets/textures/8k_earth_specular_map.jpg';
import EarthCloudsMap from '../../assets/textures/8k_earth_clouds.jpg';
import EarthNightMap from '../../assets/textures/8k_earth_nightmap.jpg';
import { TextureLoader } from 'three';

export function Earth(props) {

  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]);
  
  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 24;
    cloudsRef.current.rotation.y = elapsedTime / 18;
  });

    return <>
      {/*<ambientLight intensity={.8} /> */}
      <pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={ 1.2 } />
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={ .01 } fade={true} />
        <mesh ref={cloudsRef}>
            <sphereGeometry args={[1.005, 32, 32]} />
            <meshPhongMaterial map={cloudsMap} opacity={.4} deepWrite={true} transparent={true} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={earthRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial specularMap={specularMap} />
            <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={.4} roughness={.7} />
            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={.6} panSpeed={.5} rotateSpeed={.4} />
        </mesh>
    </>;
};