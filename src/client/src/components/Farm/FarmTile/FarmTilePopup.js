import React, { useState } from "react";
import { plants } from "./constants";
import { addItem, removeItem } from "../../Inventory";
import { checkIfItemIsPlant } from "../../GameLogic/GameLogic";
import { addItemToCropInfo, removePlant, addPlant } from "./FarmingHelpers";
import { globalInventoryContext } from "../../../Game";

//TODO: Make popup go away on blur
const FarmTilePopup = (props) => {
  const { inventoryState, setInventoryState, plantedSeeds, setPlantedSeeds, cropInfo, setCropInfo} = React.useContext(globalInventoryContext);
  function onClick(seedNum, plantName) {
    let currIventory = inventoryState;
    let currPlanted = plantedSeeds;
    // Summary: get seed from inventory, plant it, record it in plantedSeeds

    // To plant a seed:
    //  1. Get and remove selected seed from inventory (first entry that matches selected type and floor price to plant)
    // for now just planting highest floor price
    const seeds = inventoryState.filter(item => (item.type == 'seed' && item.name == plantName));
    seeds.sort((a, b) => b.floorPrice-a.floorPrice);

    // for (let i = 0; i < inventoryState; i++){
    //   let currIventory = inventoryState;
    //   let currItem = inventoryState[i];
    //   let isItem = currItem.type == 'seed' && currItem.name == plantName;
    //   if (isItem){
    //     removeItem(currIventory,currItem);
    //     setInventoryState(currIventory);
    //     break;
    //   }
    // }
    let removeSeed = seeds[0];
    removeItem(currIventory, removeSeed);
    setInventoryState(currIventory);
    //  2. Based on type (tomato, carrot, etc.), get corresponding seedNum from constants
    //  3. props.setPlantedSeed(seedNum) -> to actually put the seed on the the grid visually
    props.setPlantedSeed(seedNum);
    const newSeed = {
      name: removeSeed.name,
      type: 'seed',
      floorPrice: removeSeed.floorPrice,
      coords: {
        x: props.x,
        z: props.z
      }
    }
    addPlant(currPlanted,newSeed);

    //  4. Make the object to push to plantedSeeds:
    //    const newSeed = {
    //      name: itemName,
    //      type: "seed",
    //      floorPrice: <floorPrice from inventory>,
    //      coords { x: props.x, z:props.z }
    //    }
    //   
    setPlantedSeeds(currPlanted);
    props.setClickedTile(null);
  }

  function harvestPlant(plantName) {
    let currIventory = inventoryState;
    let currPlanted = plantedSeeds;
    let currCrops = cropInfo;

    props.setPlantedSeed(0);
    props.setFertilizerAmount(0);
    // Summary: get entry from plantedSeeds (by x,z), then push an object to the inventory with the harvested crop, and update cropInfo (also, see the .txt file for cropInfo stuff)

    // To add a harvested crop to inventory:
    //  1. Get and remove the entry in plantedSeeds corresponding to the x,z clicked (note : x,z is available easily through props.x, props.z)
    const cropToHarvest = plantedSeeds.find(item => (item.type == 'seed' && item.name == plantName && item.coords.x == props.x && item.coords.z == props.z));
    // plantedSeeds.remove(cropToHarvest);
    removePlant(currPlanted,cropToHarvest)
    const newItem = {
      name: cropToHarvest.name,
      type: 'crop',
      floorPrice: cropToHarvest.floorPrice,
      cropExpiry: 3
    }
    addItem(currIventory, newItem);
    setInventoryState(currIventory);
    addItemToCropInfo(currCrops,newItem);
    setCropInfo(currCrops);
    

    //  2. build the object to push to the inventory: 
    //    const newItem = {
    //      name: itemName,
    //      type: "crop",
    //      floorPrice: <The floor price obtained from plantedSeeds>,
    //      cropExpiry: props.turn + 5
    //    }
    // addItem(props.inventoryState, <new object you made>, 1);
    props.setClickedTile(null);
  }

  // For selling:
  //  1. Shop screen: Show all crops in inventory (have a tile for each crop)
  //  2. When a tile is clicked, show the popup allowing user to choose selling price and quantity
  //  3. If selling price is an insured price, just check the same data structure used in the inventory to see if the quantity for the given floor price exists (sum all quantities in the table with the same floor price)
  //  4. If selling price is market price, just check that the quantity of all crops of that type exists (sum all quantities in the table)
  //  5. Remove the specified number of items from the inventory according to the selected floor price. Sort the list so that the items that will expire first are sold first.

  function applyFertilizer() {
    props.setFertilizerAmount(props.fertilizerAmount + 1);
    // removeItem(props.inventoryState, "Fertilizer", 1);
  }

  function buyPlot() {
    props.setMoney(props.money - props.price);
    props.setOwned(true);
    props.setClickedTile(null);
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
      // let hasEnough =
      //   parseInt(getItemCount(props.inventoryState, plants[i].name)) > 0;
      // let isPlant = checkIfItemIsPlant(plants[i].name, plants);
      if (true) {
        seedsPresent = true;
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

  if (!seedsPresent) {
    plantButtons.push(<h4>No seeds</h4>);
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
          // parseInt(getItemCount(props.inventoryState, "Fertilizer")) > 0 && 
          true
          (
            <button
              className="tile-popup-info-item"
              type="button"
              onClick={() => applyFertilizer()}
            >
              {/* <h4>
                Apply Fertilizer (
                {parseInt(getItemCount(props.inventoryState, "Fertilizer"))})
              </h4> */}
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
