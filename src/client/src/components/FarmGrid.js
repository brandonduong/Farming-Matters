import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import FarmTile from './FarmTile'

function FarmGrid(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // Return the view, these are regular Threejs elements expressed in JSX
const gridTiles = [];
for (let i = -4; i < 6; i++) {
  for (let o = -4; o < 6; o++) {
  gridTiles.push(<FarmTile x={i} z={o}/>)
  }
}

  return (
    <mesh
      {...props}
      ref={ref}>
      <gridHelper args={[10, 10]} colorGrid={"blue"}/>
      
      {gridTiles}
      <meshStandardMaterial />
    </mesh>
  )
}

export default FarmGrid;