import React from 'react';
import { useLoader } from '@react-three/fiber';
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

    return <>
      <ambientLight intensity={1} />
      <Stars />
        <mesh>
            <sphereGeometry args={[1.005, 32, 32]} />
            <meshPhongMaterial map={cloudsMap} opacity={.4} deepWrite={true} transparent={true} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial specularMap={specularMap} />
            <meshStandardMaterial map={colorMap} normalMap={normalMap} />
            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={.6} panSpeed={.5} rotateSpeed={.4} />
        </mesh>
    </>;
};