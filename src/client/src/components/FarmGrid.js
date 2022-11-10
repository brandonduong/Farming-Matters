import React from 'react'
import FarmTile from './FarmTile'

function FarmGrid(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const gridTiles = [];
  for (let i = -4; i < 6; i++) {
    for (let o = -4; o < 6; o++) {
    gridTiles.push(<FarmTile x={i} z={o} key={"tile" + i + o}/>)
    }
  }

  return (
    <mesh
      {...props}>
      <gridHelper args={[10, 10]}/>
      
      {gridTiles}
      <meshStandardMaterial />
    </mesh>
  )
}

export default FarmGrid;