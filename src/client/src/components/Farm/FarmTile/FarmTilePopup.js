import React, { useState } from "react";
import { plants } from "./constants";
import { getItemCount, addItem, removeItem } from "../../Inventory";
import { checkIfItemIsPlant } from "../../GameLogic/Gamelogic";

//TODO: Make popup go away on blur
const FarmTilePopup = (props) => {
  function onClick(seedNum, plantName) {
    props.setPlantedSeed(seedNum);
    removeItem(props.inventoryState, plantName, 1);
    props.setClickedTile(null);
  }

  function harvestPlant(plantName) {
    props.setPlantedSeed(0);
    props.setFertilizerAmount(0);
    addItem(props.inventoryState, plantName, 1);
    props.setClickedTile(null);
  }

  function applyFertilizer() {
    props.setFertilizerAmount(props.fertilizerAmount + 1);
    removeItem(props.inventoryState, "Fertilizer", 1);
  }

  function buyPlot() {
    props.setMoney(props.money - props.price);
    props.setOwned(true);
    props.setClickedTile(null);
  }

  // Buttons for planting seeds
  const plantButtons = [];
  var season = Math.floor((props.turn - 1) / 3) % 4;

  // Only get buttons for in-season seeds
  for (let i = 0; i < plants.length; i++) {
    if (
      plants[i].plantableSeasons &&
      plants[i].plantableSeasons.includes(season)
    ) {
      let hasEnough =
        parseInt(getItemCount(props.inventoryState, plants[i].name)) > 0;
      let isPlant = checkIfItemIsPlant(plants[i].name, plants);
      if (hasEnough && isPlant) {
        plantButtons.push(
          <div
            className="tile-popup-info-item tile-popup-button-item"
            key={"plantdiv" + i}
          >
            <button
              className="tile-popup-button"
              type="button"
              onClick={() => onClick(i, plants[i].name)}
              key={"plant" + i}
            >
              <h4>{plants[i].name}</h4>
            </button>
          </div>
        );
      }
    }
  }

  // Plant info for when a seed is currently planted
  const plantInfo = (
    <div>
      <div className="tile-popup-info-item">
        <h2 className="tile-popup-title">{plants[props.plantedSeed].name}</h2>
      </div>
      <div className="tile-popup-info">
        <div className="tile-popup-info-item">
          <h4 className="tile-popup-info-title">Day Planted: </h4>
          {props.turnPlanted}
        </div>
        <div className="tile-popup-info-item">
          <h4 className="tile-popup-info-title">Day Complete: </h4>
          {props.turnPlanted +
            plants[props.plantedSeed].growthLength -
            props.fertilizerAmount}
        </div>
        {props.turn - props.turnPlanted + props.fertilizerAmount >=
        plants[props.plantedSeed].growthLength ? (
          <button
            className="tile-popup-info-item"
            type="button"
            onClick={() => harvestPlant(plants[props.plantedSeed].name)}
          >
            <h4>Harvest</h4>
          </button>
        ) : (
          parseInt(getItemCount(props.inventoryState, "Fertilizer")) > 0 && (
            <button
              className="tile-popup-info-item"
              type="button"
              onClick={() => applyFertilizer()}
            >
              <h4>
                Apply Fertilizer (
                {parseInt(getItemCount(props.inventoryState, "Fertilizer"))})
              </h4>
            </button>
          )
        )}
      </div>
    </div>
  );

  // Buttons for buying plot of land
  const buyInfo = (
    <>
      <div className="tile-popup-info">
        <button
          type="button"
          disabled={!(props.money >= props.price)}
          onClick={() => buyPlot()}
        >
          <h4>Buy Plot</h4>
        </button>
      </div>
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
      <button
        className="tile-popup-cancel"
        type="button"
        onClick={() => props.setClickedTile(null)}
      >
        X
      </button>
    </div>
  );
};

export default FarmTilePopup;
