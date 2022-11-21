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
  const plants = [
    {
      id: 0,
      name: "Nothing",
      harvestValue: 0,
      growthLength: 0, // Max growth length is 1 whole season (3 turns)
      color: "green",
      hoverColor: "darkgreen"
    },
    {
      id: 1,
      name: "Plant 1",
      harvestValue: 100,
      growthLength: 1,
      color: "#dbd470",
      hoverColor: "#a8a032"
    },
    {
      id: 2,
      name: "Plant 2",
      harvestValue: 225,
      growthLength: 2,
      color: "#be71c7",
      hoverColor: "#93489c"
    },
    {
      id: 3,
      name: "Plant 3",
      harvestValue: 375,
      growthLength: 3,
      color: "#dda6e3",
      hoverColor: "#89668c"
    },
    {
      id: 4,
      name: "Plant 4",
      harvestValue: 100,
      growthLength: 1,
      color: "#291eeb",
      hoverColor: "#2a22bd"
    },
    {
      id: 5,
      name: "Plant 5",
      harvestValue: 225,
      growthLength: 2,
      color: "red",
      hoverColor: "darkred"
    },
  ]

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
    if (turnPlanted && props.turn - turnPlanted >= plants[plantedSeed].growthLength) {
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
    <meshStandardMaterial color={hovered ? plants[plantedSeed].hoverColor : plants[plantedSeed].color} />
    <Html center>
      {props.clickedTile && props.clickedTile[0] === props.x && props.clickedTile[1] === props.z && 
        <FarmTilePopup plantedSeed={plantedSeed} setPlantedSeed={setPlantedSeed} setClickedTile={props.setClickedTile} turn={props.turn} turnPlanted={turnPlanted} plants={plants} money={props.money} setMoney={props.setMoney}/>
      }
    </Html>
  </mesh>
  )
}

export default FarmTile;
