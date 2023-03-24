import React from "react";
import { plants } from "./constants";
import { getItemCount, addItem, removeItem } from "../../Inventory";
import { checkIfItemIsPlant } from "../../GameLogic/GameLogic";
import { logData } from "../../../utils/logData";

const SEASONS = ["Winter", "Spring", "Summer", "Fall"];
//TODO: Make popup go away on blur
const FarmTilePopup = (props) => {
  const seasonName = SEASONS[(SEASONS.indexOf(props.season) + 1) % 4];
  function newTile() {
    return props.grid.filter((tile) => {
      return tile.x === props.x && tile.z === props.z;
    })[0];
  }

  function updatedGrid(updatedTile) {
    var newGrid = props.grid.map((tile) =>
      updatedTile.x === tile.x && updatedTile.z === tile.z ? updatedTile : tile
    );
    props.setGrid(newGrid);
  }

  function plantSeed(seedNum, plantName) {
    var updatedTile = newTile();
    updatedTile.plantedSeed = seedNum;
    updatedTile.turnPlanted = props.turn;
    updatedGrid(updatedTile);

    removeItem(props.inventoryState, plantName, 1);
    props.setClickedTile(null);
  }

  function harvestPlant(plantName) {
    var updatedTile = newTile();
    updatedTile.plantedSeed = 0;
    updatedTile.fertilizerAmount = 0;
    updatedTile.turnPlanted = 0;
    updatedGrid(updatedTile);
    addItem(props.inventoryState, plantName, 1);
    props.setClickedTile(null);

    logData({
      actionType: "Harvested plant",
      turn: props.turn,
      season: seasonName,
      isExperimental: true,
      balance: props.money,
      details: { x: props.x, z: props.z },
    });
  }

  function applyFertilizer() {
    var updatedTile = newTile();
    updatedTile.fertilizerAmount = updatedTile.fertilizerAmount + 1;
    updatedGrid(updatedTile);
    removeItem(props.inventoryState, "Fertilizer", 1);

    logData({
      actionType: "Applied fertilizer",
      turn: props.turn,
      season: seasonName,
      isExperimental: true,
      balance: props.money,
      details: { x: props.x, z: props.z },
    });
  }

  function buyPlot() {
    props.setMoney(props.money - props.price);
    var updatedTile = newTile();
    updatedTile.owned = true;
    updatedGrid(updatedTile);
    props.setClickedTile(null);

    logData({
      actionType: "Bought land",
      turn: props.turn,
      season: seasonName,
      isExperimental: true,
      balance: props.money,
      details: { x: props.x, z: props.z },
    });
  }

  // Buttons for planting seeds
  const plantButtons = [];
  var season = Math.floor((props.turn - 1) / 3) % 4;
  var seedsPresent = false;
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
        seedsPresent = true;
        plantButtons.push(
          <div
            className="tile-popup-info-item tile-popup-button-item"
            key={"plantdiv" + i}
          >
            <button
              className="tile-popup-button"
              type="button"
              onClick={() => plantSeed(i, plants[i].name)}
              key={"plant" + i}
            >
              <h4>
                {plants[i].name} (
                {parseInt(getItemCount(props.inventoryState, plants[i].name))})
              </h4>
            </button>
          </div>
        );
      }
    }
  }

  if (!seedsPresent) {
    plantButtons.push(<h4 className="tile-popup-warn">No plantable seeds</h4>);
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
          <h4>Buy Plot (${props.price})</h4>
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
