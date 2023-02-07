import React from "react";
import { plants } from "./constants";

//TODO: Make popup go away on blur
const FarmTilePopup = (props) => {
  function onClick(seedNum) {
    props.setPlantedSeed(seedNum);
    props.setClickedTile(null);
  }

  function harvestPlant() {
    props.setPlantedSeed(0);
    props.setClickedTile(null);
  }

  function buyPlot() {
    props.setMoney(props.money - props.price);
    props.setOwned(true);
    props.setClickedTile(null);
  }

  // Buttons for planting seeds
  const plantButtons = [];
  var start = 0;

  // Only get buttons for in-season seeds
  switch (Math.floor((props.turn - 1) / 3) % 4) {
    case 0:
      // Fall
      start = 7;
      break;
    case 1:
      // Winter
      start = 10;
      break;
    case 2:
      // Spring
      start = 1;
      break;
    case 3:
      // Summer
      start = 4;
      break;
    default:
      break;
  }

  for (let i = start; i < start + 3; i++) {
    plantButtons.push(
      <div className="tile-popup-info-item">
        <button
          className="tile-popup-button"
          type="button"
          onClick={() => onClick(i)}
          key={"plant" + i}
        >
          <h4>{plants[i].name}</h4>
        </button>
      </div>
    );
  }

  // Plant info for when a seed is currently planted
  const plantInfo = (
    <div className="tile-popup-info">
      <div className="tile-popup-info-item">Seed Num: {props.plantedSeed}</div>
      <div className="tile-popup-info-item">
        <h4>Turn Planted: {props.turnPlanted}</h4>
      </div>
      <div className="tile-popup-info-item">
        <h4>Turn Complete: </h4>
        {props.turnPlanted + plants[props.plantedSeed].growthLength}
      </div>
      {props.turn - props.turnPlanted >=
        plants[props.plantedSeed].growthLength && (
        <button type="button" onClick={() => harvestPlant()}>
          <h4>Harvest Plant</h4>
        </button>
      )}
    </div>
  );

  // Buttons for buying plot of land
  const buyInfo = (
    <>
      <button
        type="button"
        disabled={!(props.money >= props.price)}
        onClick={() => buyPlot()}
      >
        <h4>Buy Plot</h4>
      </button>
    </>
  );

  return (
    <div className="tile-popup">
      {props.owned ? (
        !props.plantedSeed ? (
          <div className="tile-popup-info">{plantButtons}</div>
        ) : (
          plantInfo
        )
      ) : (
        buyInfo
      )}
      <button type="button" onClick={() => props.setClickedTile(null)}>
        <h4>Cancel</h4>
      </button>
    </div>
  );
};

export default FarmTilePopup;
