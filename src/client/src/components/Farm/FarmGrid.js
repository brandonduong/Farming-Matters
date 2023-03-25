import React, { useEffect, useState, useContext } from "react";
import FarmTile from "./FarmTile";
import { globalInventoryContext, marketItems } from "../../Game";

const SEASON_COLORS = ["#a67a47", "#a1a09f", "#7efc5b", "#77c761"]; // Fall, Winter, Spring, Summer

function FarmGrid(props) {
  let { inventoryState, grid, setGrid, cropInfo, setCropInfo } = useContext(globalInventoryContext);
  
  const [clickedTile, setClickedTile] = useState(null);

  function getColor() {
    return SEASON_COLORS[Math.floor((props.turn - 1) / 3) % 4];
  }

  return (
    <mesh {...props}>
      {props.grid &&
        props.grid.map((tile) => (
          <FarmTile
            x={tile.x}
            z={tile.z}
            key={"tile" + tile.x + tile.z}
            clickedTile={clickedTile}
            setClickedTile={setClickedTile}
            turn={props.turn}
            money={props.money}
            setMoney={props.setMoney}
            plantedSeed={tile.plantedSeed}
            defaultTurnPlanted={tile.turnPlanted}
            fertilizerAmount={tile.fertilizerAmount}
            grid={props.grid}
            setGrid={props.setGrid}
            owned={tile.owned}
            price={tile.price}
            colors={SEASON_COLORS}
            inventoryState={inventoryState}
            cropInfo={cropInfo}
            setCropInfo={setCropInfo}
            VisualGameLogic={props.VisualGameLogic}
          />
        ))}
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
