import React, { useEffect, useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import FarmTilePopup from './FarmTilePopup'
import { logData } from '../utils/logData'

function FarmTile(props) {
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const [plantedSeed, setPlantedSeed] = useState(0) // 0 if nothing is planted
  const [turnPlanted, setTurnPlanted] = useState(null) // null if nothing is planted
  const seedColors = ["green", "#dbd470", "#be71c7", "#dda6e3", "#291eeb", "red"]
  const seedHoverColors = ["darkgreen", "#a8a032", "#93489c", "#89668c", "#2a22bd", "darkred"]
  const seedGrowthLengths = [0, 1, 2, 3, 1, 2] // Max growth length is 1 whole season (3 turns)

  function onClick() {
    click(!clicked);
    console.log(`clicked ${props.x} ${props.z}`)
    props.setClickedTile([props.x, props.z])

    //Log data to the server
    logData("Tile clicked", { 
        x: props.x, 
        z: props.z
    })
  }

  //Log when a seed is planted
  useEffect(() => { 
    if (plantedSeed != 0) {
      setTurnPlanted(props.turn)

      logData("Seed planted", { 
        x: props.x, 
        z: props.z,
        seedNum: plantedSeed,
        turnPlanted: props.turn,
      })
    }
  }, [plantedSeed])

  // Check whenever turn is ended
  useEffect(() => {
    if (turnPlanted && props.turn - turnPlanted >= seedGrowthLengths[plantedSeed]) {
      console.log(`Plant at (${props.x}, ${props.z}) is done growing`)
    }
  }, [props.turn])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}
    position={[props.x - 0.5, -0.01, props.z - 0.5]}
    onClick={() => {onClick()}}
    onPointerOver={() => hover(true)}
    onPointerOut={() => hover(false)}>
    <planeGeometry args={[1, 1]} />
    <meshStandardMaterial color={hovered ? seedHoverColors[plantedSeed] : seedColors[plantedSeed]} />
    <Html center>
      {props.clickedTile && props.clickedTile[0] === props.x && props.clickedTile[1] === props.z && 
        <FarmTilePopup plantedSeed={plantedSeed} setPlantedSeed={setPlantedSeed} setClickedTile={props.setClickedTile} turn={props.turn} turnPlanted={turnPlanted} growthLength={seedGrowthLengths[plantedSeed]}/>
      }
    </Html>
  </mesh>
  )
}

export default FarmTile;
