import React, { useState } from "react";
import FarmTile from "./FarmTile";

function FarmGrid(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const [clickedTile, setClickedTile] = useState(null);
  const gridTiles = [];
  const gridOutline = []; // Outline for each individual tile

  for (let i = -4; i < 6; i++) {
    for (let o = -4; o < 6; o++) {
      gridTiles.push(
        <FarmTile
          x={i}
          z={o}
          key={"tile" + i + o}
          clickedTile={clickedTile}
          setClickedTile={setClickedTile}
          turn={props.turn}
          money={props.money}
          setMoney={props.setMoney}
        />
      );

      gridOutline.push(
        <gridHelper
          args={[1, 1, "#004500", "#004500"]}
          position={[i - 0.5, 0, o - 0.5]}
        />
      );
    }
  }

  return (
    <mesh {...props}>
      {gridOutline}
      {gridTiles}
      <mesh
        position={[0, -5.02, 0]}
        onClick={() => {
          setClickedTile(null);
        }}
      >
        <boxGeometry args={[500, 10, 500]} />
        <meshStandardMaterial color={"green"} />
      </mesh>
      <meshStandardMaterial />
    </mesh>
  );
}

export default FarmGrid;
