import React, { useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import FarmTilePopup from './FarmTilePopup'

function FarmTile(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const [plantedSeed, setPlantedSeed] = useState(0) // 0 if nothing is planted
  const seedColors = ["green", "#dbd470", "#be71c7", "#dda6e3", "#291eeb", "red"]
  const seedHoverColors = ["darkgreen", "#a8a032", "#93489c", "#89668c", "#2a22bd", "darkred"]

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
    <meshStandardMaterial color={hovered ? seedHoverColors[plantedSeed] : seedColors[plantedSeed]} />
    <Html center>
      {props.clickedTile && props.clickedTile[0] === props.x && props.clickedTile[1] === props.z && 
        <FarmTilePopup plantedSeed={plantedSeed} setPlantedSeed={setPlantedSeed} setClickedTile={props.setClickedTile}/>
      }
    </Html>
  </mesh>
  )
}

export default FarmTile;