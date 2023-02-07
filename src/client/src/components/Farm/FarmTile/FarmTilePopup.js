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
  for (let i = 1; i < plants.length; i++) {
    plantButtons.push(
      <button type="button" onClick={() => onClick(i)} key={"plant" + i}>
        Seed {i}
      </button>
    );
  }

  // Plant info for when a seed is currently planted
  const plantInfo = (
    <div className="tile-popup-info">
      <div className="tile-popup-info-item">Seed Num: {props.plantedSeed}</div>
      <div className="tile-popup-info-item">
        Turn Planted: {props.turnPlanted}
      </div>
      <div className="tile-popup-info-item">
        Turn Complete:{" "}
        {props.turnPlanted + plants[props.plantedSeed].growthLength}
      </div>
      {props.turn - props.turnPlanted >=
        plants[props.plantedSeed].growthLength && (
        <button type="button" onClick={() => harvestPlant()}>
          Harvest Plant
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
        Buy Plot
      </button>
    </>
  );

  return (
    <div className="tile-popup">
      {props.owned ? (!props.plantedSeed ? plantButtons : plantInfo) : buyInfo}
      <button type="button" onClick={() => props.setClickedTile(null)}>
        Close popup
      </button>
    </div>
  );
};

export default FarmTilePopup;
