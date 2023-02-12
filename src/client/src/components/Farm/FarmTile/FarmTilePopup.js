import React from "react";
import { plants } from "./constants";
import { getItemCount, addItem, removeItem} from "../../Inventory"
import { checkIfItemIsPlant } from "../../GameLogic/Gamelogic";

//TODO: Make popup go away on blur
const FarmTilePopup = (props) => {


  function onClick(seedNum,plantName) {
    props.setPlantedSeed(seedNum);
    removeItem(props.inventoryState,plantName,1);
    props.setClickedTile(null);
  }

  function harvestPlant(plantName) {
    props.setPlantedSeed(0);
    addItem(props.inventoryState,plantName,1);
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

    let hasEnough = parseInt(getItemCount(props.inventoryState,plants[i].name)) > 0;
    let isPlant = checkIfItemIsPlant(plants[i].name,plants);
    if (hasEnough && isPlant){
      plantButtons.push(
        <div className="tile-popup-info-item" key={"plantdiv" + i}>
          <button
            className="tile-popup-button"
            type="button"
            onClick={() => onClick(i,plants[i].name)}
            key={"plant" + i}
          >
            <h4>{plants[i].name}</h4>
          </button>
        </div>
      );
      
    }
  }
  


  plantButtons.push(
    <button type="button" onClick={() => props.setClickedTile(null)}>
      <h4>Cancel</h4>
    </button>
  );

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
          {props.turnPlanted + plants[props.plantedSeed].growthLength}
        </div>
        {props.turn - props.turnPlanted >=
          plants[props.plantedSeed].growthLength && (
          <button
            className="tile-popup-info-item"
            type="button"
            onClick={() => harvestPlant(plants[props.plantedSeed].name)}
          >
            <h4>Harvest</h4>
          </button>
        )}
        <button type="button" onClick={() => props.setClickedTile(null)}>
          <h4>Cancel</h4>
        </button>
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
        <button type="button" onClick={() => props.setClickedTile(null)}>
          <h4>Cancel</h4>
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
    </div>
  );
};

export default FarmTilePopup;
