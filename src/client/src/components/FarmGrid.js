import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

function FarmGrid(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}>
      <gridHelper args={[10, 10]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial />
      </mesh>
      <meshStandardMaterial />
    </mesh>
  )
}

export default FarmGrid;