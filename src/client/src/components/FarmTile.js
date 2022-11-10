import React, { useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import FarmTilePopup from './FarmTilePopup'

function FarmTile(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  function onClick() {
    click(!clicked);
    console.log(`clicked ${props.x} ${props.z}`)
    props.setClickedTile([props.x, props.z])
  }

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}
    position={[props.x - 0.5, -0.01, props.z - 0.5]}
    onClick={(event) => {onClick()}}
    onPointerOver={(event) => hover(true)}
    onPointerOut={(event) => hover(false)}>
    <planeGeometry args={[1, 1]} />
    <meshStandardMaterial color={hovered ? "darkgreen" : "green"} />
    <Html center>
      {props.clickedTile && props.clickedTile[0] === props.x && props.clickedTile[1] === props.z && 
        <FarmTilePopup/>
      }
    </Html>
  </mesh>
  )
}

export default FarmTile;