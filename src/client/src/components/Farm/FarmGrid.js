import React, { useEffect, useState, useContext } from 'react';
import FarmTile from './FarmTile';
import { globalInventoryContext, marketItems } from '../../Game';
import { useGameInfo, useInventory } from '../../contexts';

const SEASON_COLORS = ['#a67a47', '#a1a09f', '#7efc5b', '#77c761']; // Fall, Winter, Spring, Summer

function FarmGrid(props) {
  const { inventoryState, cropInfo, setCropInfo } = useInventory();
  const { grid, setGrid, turn, money, setMoney } = useGameInfo();

  const [clickedTile, setClickedTile] = useState(null);

  function getColor() {
    return SEASON_COLORS[Math.floor((turn - 1) / 3) % 4];
  }

  return (
    <mesh {...props}>
      {grid &&
        grid.map((tile) => (
          <FarmTile
            x={tile.x}
            z={tile.z}
            key={'tile' + tile.x + tile.z}
            clickedTile={clickedTile}
            setClickedTile={setClickedTile}
            turn={turn}
            money={money}
            setMoney={setMoney}
            plantedSeed={tile.plantedSeed}
            fertilizerAmount={tile.fertilizerAmount}
            grid={grid}
            setGrid={setGrid}
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
