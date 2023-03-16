import { createRoot } from 'react-dom/client'
import React, { useContext, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { TornadoModel } from '../../models/TornadoModel'

const Tornado = (props) => {
	// This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const [velocity, setVelocity] = useState(0);
    // Subscribe this component to the render-loop, rotate the mesh every frame

    useFrame((state, delta) => {
        const positiveOrNegative = [1,-1];
        const randChoice = (() => positiveOrNegative[Math.floor(Math.random() * positiveOrNegative.length)]);
        
		if (mesh.current.position.x > -10 && mesh.current.position.z > -10) {
			mesh.current.position.x = mesh.current.position.x  + randChoice() * Math.random()*0.75;
            mesh.current.position.z = mesh.current.position.z +  randChoice() * Math.random()*0.75;
		}else{  
			mesh.current.position.x = 0;
            mesh.current.position.z = 0;
			mesh.current.position.needsUpdate = true;
		}
	});
    // Return view, these are regular three.js elements expressed in JSX

    let points = [];
    let maxHeight = 15;
    for (let i = 0; i < maxHeight; i++){
        let t = i/3;
        points.push([t * Math.sin( 2 * t ), t, t * Math.cos( 2 * t ) ] );

    }
    return (
        /*
        <>
        <TornadoModel/>
        </>
        */
        
        <Line
            ref={mesh}
            points={points}       // Array of Points
            //closed={false}                  // Default
            curveType="centripetal"         // One of "centripetal" (default), "chordal", or "catmullrom"
            //tension={0.5}                   // Default (only applies to "catmullrom" curveType)
            //color="black"                   // Default
            lineWidth={1}                   // In pixels (default)
            //dashed={false}                  // Default
            
        />
        
    )
}
export default Tornado;