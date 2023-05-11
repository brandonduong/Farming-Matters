import React, { useContext } from 'react';
import { plants } from './constants';
import {
  addItem,
  getAllSeedContracts,
  getSeedContractsCounts,
  removeItem,
  getToolCount,
} from '../../Inventory';
import { checkIfItemIsPlant } from '../../GameLogic/GameLogic';
import { addItemToCropInfo, removePlant, addPlant } from './FarmingHelpers';
import { globalInventoryContext } from '../../../Game';
import { useTurnActions } from '../../../contexts';
// import { logData } from '../../../utils/logData';
import Button from 'react-bootstrap/esm/Button';

const SEASONS = ['Winter', 'Spring', 'Summer', 'Fall'];
//TODO: Make popup go away on blur
const FarmTilePopup = (props) => {
  const { currentTurnActions, setcurrentTurnActions } = useTurnActions();
  const seasonName = SEASONS[(SEASONS.indexOf(props.season) + 1) % 4];
  function newTile() {
    return props.grid.find((tile) => {
      return tile.x === props.x && tile.z === props.z;
    });
  }

  function updatedGrid(updatedTile) {
    var newGrid = props.grid.map((tile) =>
      updatedTile.x === tile.x && updatedTile.z === tile.z ? updatedTile : tile,
    );

    props.setGrid(newGrid);
  }

  function plantSeed(seedName, floorPrice) {
    const seedToPlant = plants.find((plant) => plant.name == seedName);
    const newSeedToPlant = { ...seedToPlant, floorPrice };

    const itemToRemove = {
      name: seedName,
      type: 'seed',
      floorPrice: floorPrice,
    };

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
    const cropToHarvest = props.grid.find(
      (tile) => tile.x == props.x && tile.z == props.z,
    ).plantedSeed;

    const newItem = {
      name: cropToHarvest.name,
      type: 'crop',
      floorPrice: cropToHarvest.floorPrice,
      cropExpiry: 3,
    };
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
    updatedTile.turnPlanted = 0;
    updatedGrid(updatedTile);
    props.setClickedTile(null);

    //adds the performed actions to a list of all the actions performed during the current turn
    // setcurrentTurnActions([
    //   ...currentTurnActions,
    //   {
    //     actionType: 'Harvested plant',
    //     turn: props.turn,
    //     season: seasonName,
    //     isExperimental: true,
    //     balance: props.money,
    //     details: { x: props.x, z: props.z },
    //   },
    // ]);
  }

  // For selling:
  //  1. Shop screen: Show all crops in inventory (have a tile for each crop)
  //  2. When a tile is clicked, show the popup allowing user to choose selling price and quantity
  //  3. If selling price is an insured price, just check the same data structure used in the inventory to see if the quantity for the given floor price exists (sum all quantities in the table with the same floor price)
  //  4. If selling price is market price, just check that the quantity of all crops of that type exists (sum all quantities in the table)
  //  5. Remove the specified number of items from the inventory according to the selected floor price. Sort the list so that the items that will expire first are sold first.

  function applyFertilizer() {
    // props.setFertilizerAmount(props.fertilizerAmount + 1);
    // removeItem(props.inventoryState, "Fertilizer", 1);
    var updatedTile = newTile();
    updatedTile.fertilizerAmount = updatedTile.fertilizerAmount + 1;
    updatedGrid(updatedTile);

    const fertilizer = {
      name: 'Fertilizer',
      type: 'tool',
      floorPrice: 0,
    };

    removeItem(props.inventoryState, fertilizer);

    setcurrentTurnActions([
      ...currentTurnActions,
      {
        actionType: 'Applied fertilizer',
        turn: props.turn,
        season: seasonName,
        isExperimental: true,
        balance: props.money,
        details: { x: props.x, z: props.z },
      },
    ]);
  }

  function buyPlot() {
    props.setMoney(props.money - props.price);
    var updatedTile = newTile();
    updatedTile.owned = true;
    updatedGrid(updatedTile);
    props.setClickedTile(null);

    setcurrentTurnActions([
      ...currentTurnActions,
      {
        actionType: 'Bought land',
        turn: props.turn,
        season: seasonName,
        isExperimental: true,
        balance: props.money,
        details: { x: props.x, z: props.z },
      },
    ]);
  }

  // Buttons for planting seeds
  const plantButtons = [];
  var season = Math.floor((props.turn - 1) / 3) % 4;
  var seedsPresent = false;
  let seed;

  // Only get buttons for in-season seeds
  for (let i = 1; i < plants.length; i++) {
    seed = plants[i];

    const seedsInInventory = getSeedContractsCounts(
      props.inventoryState,
      seed.name,
    );
    const seedContracts = getAllSeedContracts(props.inventoryState, seed.name);

    const insurancePrices = Object.keys(seedsInInventory);
    const isSeedInInventory = insurancePrices.length > 0;
    if (
      seed.plantableSeasons &&
      seed.plantableSeasons.includes(season) &&
      isSeedInInventory
    ) {
      let seedName = seedContracts[0].name;
      seedsPresent = true;
      let priceButtons = [];
      for (let i = 0; i < insurancePrices.length; i++) {
        let price = insurancePrices[i];
        price = !isNaN(price) ? parseInt(price) : null;
        let priceLabel = price ?? 'None';

        priceButtons.push(
          <div className="seed-popup">
            <div className="qt-label">Quantity:{seedsInInventory[price]}</div>
            <div className="empty"></div>
            <button onClick={() => plantSeed(seedName, price)}>
              {priceLabel}
            </button>
          </div>,
        );
      }

      plantButtons.push(
        <div
          className="tile-popup-info-item tile-popup-button-item"
          style={{ display: 'flex', flexDirection: 'column' }}
          key={'plantdiv' + i}
        >
          <div className="tile-popup-button" key={'plant' + i}>
            <h4>{seed.name}</h4>
          </div>
          {priceButtons}
        </div>,
      );
    }
  }

  if (!seedsPresent) {
    plantButtons.push(<h4 className="tile-popup-warn">No plantable seeds</h4>);
  }

  // Plant info for when a seed is currently planted
  const plantInfo = (
    <div>
      <div className="tile-popup-info-item">
        <h2 className="tile-popup-title">
          {props.plantedSeed?.name ?? 'Nothing'}
        </h2>
      </div>
      <div className="tile-popup-info">
        <div className="tile-popup-info-item">
          <h4 className="tile-popup-info-title">Day Planted: </h4>
          <h4 className="tile-popup-info-number">{props.turnPlanted}</h4>
        </div>
        <div className="tile-popup-info-item">
          <h4 className="tile-popup-info-title">Day Complete: </h4>
          {props.turnPlanted + props.plantedSeed?.growthLength ??
            0 - props.fertilizerAmount}
        </div>
        <div className="tile-popup-info-item">
          <h4 className="tile-popup-info-title">Floor Price: </h4>
          {props.plantedSeed?.floorPrice ?? 'No insurance'}
        </div>
        {props.turn - props.turnPlanted + props.fertilizerAmount >=
        props.plantedSeed?.growthLength ? (
          <Button
            className={'tile-popup-button'}
            type="button"
            variant="light"
            size="lg"
            onClick={() => harvestPlant(props.plantedSeed?.name ?? 'Nothing')}
          >
            <h4>Harvest</h4>
          </Button>
        ) : (
          parseInt(getToolCount(props.inventoryState, 'Fertilizer')) > 0 && (
            <Button
              className={'tile-popup-button'}
              type="button"
              variant="light"
              size="lg"
              onClick={() => applyFertilizer()}
            >
              {
                <h4>
                  Apply Fertilizer (
                  {parseInt(getToolCount(props.inventoryState, 'Fertilizer'))})
                </h4>
              }
            </Button>
          )
        )}
      </div>
    </div>
  );

  // Buttons for buying plot of land
  const buyInfo = (
    <>
      <div className="tile-popup-info">
        <Button
          className={'tile-popup-button'}
          type="button"
          variant="light"
          size="lg"
          onClick={() => buyPlot()}
        >
          <h4>Buy Plot (${props.price})</h4>
        </Button>
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
        className="farm-tile-close"
        type="button"
        onClick={() => props.setClickedTile(null)}
      >
        X
      </button>
    </div>
  );
};
export default FarmTilePopup;
