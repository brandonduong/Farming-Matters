import React, { useState } from 'react'
import FarmTile from './FarmTile'

function FarmGrid(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const [clickedTile, setClickedTile] = useState(null);
  const gridTiles = [];
  for (let i = -4; i < 6; i++) {
    for (let o = -4; o < 6; o++) {
    gridTiles.push(<FarmTile x={i} z={o} key={"tile" + i + o} clickedTile={clickedTile} setClickedTile={setClickedTile} turn={props.turn}/>)
    }
  }

  return (
    <mesh
      {...props}>
      <gridHelper args={[10, 10]}/>
      
      {gridTiles}
      <mesh position={[0,-5.02,0]}>
        <boxGeometry args={[10,10,10]} />
        <meshStandardMaterial color={'green'} />
      </mesh>
      <meshStandardMaterial />
    </mesh>
  )
}

export default FarmGrid;
