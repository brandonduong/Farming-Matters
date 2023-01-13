import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
import FarmTilePopup from './FarmTilePopup';
import { logData } from '../../../utils/logData';
import { TreeModel } from '../../models/TreeModel';
import { plants } from "./constants";
import { BeetModel } from '../../models/BeetModel';
import { CarrotModel } from '../../models/CarrotModel';

const FarmTile = (props) => {
  // Hold state for hovered and clicked events
  const position = [props.x - 0.5, -0.01, props.z - 0.5];
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const [plantedSeed, setPlantedSeed] = useState(0) // 0 if nothing is planted
  const [turnPlanted, setTurnPlanted] = useState(null) // null if nothing is planted

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

  // Log when a seed is planted
  useEffect(() => { 
    if (plantedSeed !== 0) {
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

  const models = <>
    {/* Using a model component. The model is placed outside of the <mesh> so it's not clickable or hoverable */}
    <TreeModel 
        position={position}
        rotation={[0, -Math.PI/2, Math.PI/2]}
        visible={plantedSeed === 1}
      />

      <CarrotModel
        position={position}
        rotation={[0, -Math.PI/2, Math.PI/2]}
        visible={plantedSeed === 2}
        stage={props.turn - turnPlanted}
      />

      <BeetModel 
        position={position}
        rotation={[0, -Math.PI/2, Math.PI/2]}
        visible={plantedSeed === 9}
        stage={props.turn - turnPlanted}
      />
  </>

  return (
    <>
      {models}
      <mesh rotation={[-Math.PI / 2, 0, 0]}
        position={position}
        onClick={() => {onClick()}}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >

      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color={hovered ? "darkgreen" : "green"} />

      <Html center>
        {props.clickedTile && props.clickedTile[0] === props.x && props.clickedTile[1] === props.z && 
          <FarmTilePopup 
            plantedSeed={plantedSeed} 
            setPlantedSeed={setPlantedSeed} 
            setClickedTile={props.setClickedTile} 
            turn={props.turn} 
            turnPlanted={turnPlanted} 
          />
        }
      </Html>
    </mesh>
  </>
  )
}

export default FarmTile;
