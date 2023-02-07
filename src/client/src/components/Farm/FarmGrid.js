import React, { useState } from "react";
import FarmTile from "./FarmTile";

const PLOT_SIZE = 4;
function FarmGrid(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const [clickedTile, setClickedTile] = useState(null);
  const gridTiles = [];
  const gridOutline = []; // Outline for each individual tile

  function addFarmLand(x, y, owned, price = 1000) {
    // Add 4x4 grid of land at position x and y

    if (!owned) {
      gridTiles.push(
        <FarmTile
          x={x + 1.5}
          z={y + 1.5}
          key={"tile" + x + y}
          clickedTile={clickedTile}
          setClickedTile={setClickedTile}
          turn={props.turn}
          money={props.money}
          setMoney={props.setMoney}
          owned={owned}
          price={price}
        />
      );

      gridOutline.push(
        <gridHelper
          args={[PLOT_SIZE, PLOT_SIZE, "#004500", "#004500"]}
          position={[x + 1, 0, y + 1]}
        />
      );
    } else {
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
