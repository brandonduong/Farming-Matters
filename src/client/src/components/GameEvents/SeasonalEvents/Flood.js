import * as THREE from 'three';
import React, { Suspense, useRef, useMemo } from 'react';
import {
  Canvas,
  extend,
  useThree,
  useLoader,
  useFrame,
} from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Water } from 'three-stdlib';
import waterNormal from './../../../assets/flood_water_normal.jpeg';
import aqua from './../../../assets/00ffff.png';

extend({ Water });

//Referenced: https://codesandbox.io/s/1b40u?file=/src/App.js:1627-1653
const Flood = (props) => {
  function Waves() {
    const waterRef = useRef();

    //Load the normal water texture
    const waterNormals = useLoader(THREE.TextureLoader, waterNormal);

    //Wrap texture horiztonally
    waterNormals.wrapS = THREE.RepeatWrapping;

    //Wrap texture vertically
    waterNormals.wrapT = THREE.RepeatWrapping;
    //Cache water plane
    const geom = useMemo(() => new THREE.PlaneGeometry(500, 500), []);

    //Cache wave configuration
    const config = useMemo(
      () => ({
        textureWidth: 256,
        textureHeight: 256,
        waterNormals,
        sunDirection: new THREE.Vector3(),

        //sunPosition: new THREE.Vector3(100,20,20),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: false,
      }),
      [waterNormals],
    );

    //Wave motion
    useFrame(
      (state, delta) =>
        (waterRef.current.material.uniforms.time.value += delta * 0.1),
    );

    return (
      <water
        ref={waterRef}
        args={[geom, config]}
        position={[0.05, 0.025, 0.05]}
        rotation-x={-Math.PI / 2}
      ></water>
    );
  }

  return (
    <Suspense fallback={null}>
      {Waves()}
      <directionalLight position={[500, 110, 100]} />
      <spotLight
        position={[-20, -20, -10]}
        angle={Math.PI / 2}
        penumbra={0.1}
      />
      <pointLight position={[-20, -10, -10]} />
    </Suspense>
  );
};

export default Flood;
