import React, { useState } from "react";
import FarmTile from "./FarmTile";
import { globalInventoryContext, marketItems } from "../../Game";

const PLOT_SIZE = 4;
const SEASON_COLORS = ["#a67a47", "#a1a09f", "#7efc5b", "#77c761"]; // Fall, Winter, Spring, Summer

function FarmGrid(props) {
  // This reference gives us direct access to the THREE.Mesh object
  let { inventoryState } = React.useContext(globalInventoryContext);

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
            colors={SEASON_COLORS}
            inventoryState={inventoryState}
            VisualGameLogic={props.VisualGameLogic}
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
  addFarmLand(1.5, 6.5, false);
  //addFarmLand(1.5, -8.5, false);
  addFarmLand(-3.5, 6.5, false);
  //addFarmLand(-3.5, -8.5, false);

  function getColor() {
    return SEASON_COLORS[Math.floor((props.turn - 1) / 3) % 4];
  }

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
        <meshStandardMaterial color={getColor()} />
      </mesh>
      <meshStandardMaterial />
    </mesh>
  );
}

export default FarmGrid;
