import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import { Water } from 'three-stdlib'
import waterNormal from './../../../assets/flood_water_normal.jpeg'

extend({ Water })

//Referenced: https://codesandbox.io/s/1b40u?file=/src/App.js:1627-1653
const Flood = (props) =>{
    function Waves(){
        const waterRef = useRef();
        
        //Load the normal water texture
        const waterNormals = useLoader(THREE.TextureLoader, waterNormal);

        //Wrap texture horiztonally
        waterNormals.wrapS  = THREE.RepeatWrapping;
        
        //Wrap texture vertically
        waterNormals.wrapT = THREE.RepeatWrapping;
        //Cache water plane
        const geom = useMemo(() => new THREE.PlaneGeometry(1000, 1000), [])
        
        //Cache wave configuration
        const config = useMemo(
            () => ({
            textureWidth: 256,
            textureHeight: 256,
            waterNormals,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: false,
            }),
            [waterNormals]
        )
        
        //Wave motion
        useFrame((state, delta) => (waterRef.current.material.uniforms.time.value += delta))

        return  (
                <water  
                    ref={waterRef} 
                    args={[geom, config]} 
                    position={[0, 0.05, 0]} 
                    rotation-x={-Math.PI / 2}> 
                </water>
           ) 
    }
  
  return (
    <Suspense fallback={null}>
        {Waves()}
    </Suspense>)
}

export default Flood;


