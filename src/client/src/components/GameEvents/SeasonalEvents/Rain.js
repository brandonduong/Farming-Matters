import { createRoot } from 'react-dom/client'
import React, { useContext, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const RainDrops = (props) => {
	// This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const [velocity, setVelocity] = useState(0);
    // Subscribe this component to the render-loop, rotate the mesh every frame

    useFrame((state, delta) => {
		if (mesh.current.position.y >-5) {
			mesh.current.position.y -= Math.random()*0.25;
		}else{  
			mesh.current.position.y = 12.5;
			mesh.current.position.needsUpdate = true;
		}
	});
    // Return view, these are regular three.js elements expressed in JSX
    
    return (
        <mesh {...props} ref={mesh} scale={0.05} velocity={velocity}>
        <sphereGeometry  args={[1, 16, 16]}  />
        <meshStandardMaterial color='#5454FF'  />
        </mesh>
    )
}
export default RainDrops;