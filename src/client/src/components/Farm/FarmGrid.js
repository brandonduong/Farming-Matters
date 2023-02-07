import React, { useState } from "react";
import FarmTile from "./FarmTile";

const PLOT_SIZE = 4;
function FarmGrid(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const [clickedTile, setClickedTile] = useState(null);
  const gridTiles = [];

  function addFarmLand(x, y, owned, price = 1000) {
    // Add 4x4 grid of land at position x and y
    for (let i = x; i < x + PLOT_SIZE; i++) {
      for (let o = y; o < y + PLOT_SIZE; o++) {
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
            owned={owned}
            price={price}
          />
        );
      }
    }
  }

  // Default unlocked farm land
  addFarmLand(-3.5, -3.5, true);
  addFarmLand(-3.5, 1.5, true);
  addFarmLand(1.5, 1.5, true);
  addFarmLand(1.5, -3.5, true);

  // Default locked farm land
  addFarmLand(-8.5, -3.5, false);
  addFarmLand(-8.5, 1.5, false);
  addFarmLand(6.5, -3.5, false);
  addFarmLand(6.5, 1.5, false);

  console.log(gridTiles);

  return (
    <mesh {...props}>
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
