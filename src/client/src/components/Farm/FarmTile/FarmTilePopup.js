import React, { useContext } from "react";
import { plants } from "./constants";
import { addItem, getAllSeedContracts, getSeedContractsCounts, removeItem } from "../../Inventory";
import { checkIfItemIsPlant } from "../../GameLogic/GameLogic";
import { addItemToCropInfo, removePlant, addPlant } from "./FarmingHelpers";
import { globalInventoryContext } from "../../../Game";

//TODO: Make popup go away on blur
const FarmTilePopup = (props) => {  
  function newTile() {
    return props.grid.find((tile) => {
      return tile.x === props.x && tile.z === props.z;
    });
  }

  function updatedGrid(updatedTile) {
    var newGrid = props.grid.map((tile) =>
      updatedTile.x === tile.x && updatedTile.z === tile.z ? updatedTile : tile
    );

    props.setGrid(newGrid);
  }

  function plantSeed(seedName, floorPrice) {
    const seedToPlant = plants.find((plant) => plant.name == seedName);
    const newSeedToPlant = {...seedToPlant, floorPrice}

    const itemToRemove = {
      name: seedName,
      type: 'seed',
      floorPrice: floorPrice,
    }
  
    var updatedTile = newTile();
    updatedTile.plantedSeed = newSeedToPlant;
    updatedGrid(updatedTile);
    
    removeItem(props.inventoryState, itemToRemove);
    props.setClickedTile(null);
  }

  function harvestPlant() {
    // Summary: get entry from plantedSeeds (by x,z), then push an object to the inventory with the harvested crop, and update cropInfo (also, see the .txt file for cropInfo stuff)
    
    // To add a harvested crop to inventory:
    //  1. Get and remove the entry in plantedSeeds corresponding to the x,z clicked (note : x,z is available easily through props.x, props.z)
    const cropToHarvest = props.grid.find(tile => (tile.x == props.x && tile.z == props.z)).plantedSeed;
    
    const newItem = {
      name: cropToHarvest.name,
      type: 'crop',
      floorPrice: cropToHarvest.floorPrice,
      cropExpiry: 3
    }
    addItem(props.inventoryState, newItem);
    
    addItemToCropInfo(props.cropInfo, newItem);
    //setCropInfo(props.cropInfo);
    

    //  2. build the object to push to the inventory: 
    //    const newItem = {
    //      name: itemName,
    //      type: "crop",
    //      floorPrice: <The floor price obtained from plantedSeeds>,
    //      cropExpiry: props.turn + 5
    //    }
    // addItem(props.inventoryState, <new object you made>, 1);
    var updatedTile = newTile();
    updatedTile.plantedSeed = null;
    updatedTile.fertilizerAmount = 0;
    updatedGrid(updatedTile);
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
    var updatedTile = newTile();
    updatedTile.fertilizerAmount = updatedTile.fertilizerAmount + 1;
    updatedGrid(updatedTile);
    removeItem(props.inventoryState, "Fertilizer", 1);
  }

  function buyPlot() {
    props.setMoney(props.money - props.price);
    var updatedTile = newTile();
    updatedTile.owned = true;
    updatedGrid(updatedTile);
    props.setClickedTile(null);
  }

  // Buttons for planting seeds
  const plantButtons = [];
  var season = Math.floor((props.turn - 1) / 3) % 4;
  var seedsPresent = false;
  let seed;

  // Only get buttons for in-season seeds
  for (let i = 1; i < plants.length; i++) {
    seed = plants[i];

    const seedsInInventory = getSeedContractsCounts(props.inventoryState, seed.name); 
    const seedContracts = getAllSeedContracts(props.inventoryState, seed.name);
    
    const insurancePrices = Object.keys(seedsInInventory)
    const isSeedInInventory = (insurancePrices.length > 0)
    if (
      seed.plantableSeasons &&
      seed.plantableSeasons.includes(season) &&
      isSeedInInventory
    ) {
      let seedName = seedContracts[0].name; 
      seedsPresent = true;
      let priceButtons = []
      for (let i = 0; i < insurancePrices.length; i++){
        let price = insurancePrices[i];
        price = !isNaN(price) ? parseInt(price) : null;
        let priceLabel = price ?? 'None';
        
        priceButtons.push(
          <div className="seed-popup">
            <div className="qt-label">
            Quantity:{seedsInInventory[price]}
            </div>
          <div className="empty"></div>
          <button
              onClick={() => plantSeed(seedName, price)}
            > 
              {priceLabel}
            </button>
            </div>
        )  
      }

      plantButtons.push(
        <div
          className="tile-popup-info-item tile-popup-button-item"
          style={{display: 'flex', flexDirection: 'column'}}
          key={"plantdiv" + i}
        >
          <div
            className="tile-popup-button"
            key={"plant" + i}
          >
            <h4>{seed.name}</h4>
          </div>
          {priceButtons}
        </div>
      );
    }
  }

  if (!seedsPresent) {
    plantButtons.push(<h4>No seeds</h4>);
  }

  // Plant info for when a seed is currently planted
  const plantInfo = (
    <div>
      <div className="tile-popup-info-item">
        <h2 className="tile-popup-title">{props.plantedSeed?.name ?? 'Nothing'}</h2>
      </div>
      <div className="tile-popup-info">
        <div className="tile-popup-info-item">
          <h4 className="tile-popup-info-title">Day Planted: </h4>
          {props.turnPlanted}
        </div>
        <div className="tile-popup-info-item">
          <h4 className="tile-popup-info-title">Day Complete: </h4>
          {props.turnPlanted +
            props.plantedSeed?.growthLength ?? 0 -
            props.fertilizerAmount}
        </div>
        <div className="tile-popup-info-item">
          <h4 className="tile-popup-info-title">Floor Price: </h4>
          {props.plantSeed?.floorPrice ?? 'None'}
        </div>
        {props.turn - props.turnPlanted + props.fertilizerAmount >=
        props.plantedSeed?.growthLength ? (
          <button
            className="tile-popup-info-item"
            type="button"
            onClick={() => harvestPlant(props.plantedSeed?.name ?? 'Nothing')}
          >
            <h4>Harvest</h4>
          </button>
        ) : (
          // parseInt(getItemCount(props.inventoryState, "Fertilizer")) > 0 && 
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
}
export default FarmTilePopup;
