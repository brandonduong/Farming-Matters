import "../../css/Inventory.css";
import React, { useState } from "react";
import { getItemCount, getItems, getCropCount, getSeedCount} from "../Inventory";
import { globalInventoryContext, marketItems } from "../../Game";
import { shopItemsList } from "../Shop/constants";
import { logData } from "../../utils/logData";
import { checkIfItemIsPlant } from "../GameLogic/GameLogic";
import { plants } from "../Farm/FarmTile/constants";
import { getImage } from "../GameLogic/GameLogic";

//TODO: This component will need to be completely reworked once the react state is set up to dynamically show inventory contents
const InventoryRender = (props) => {
  let [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const { inventoryState } = React.useContext(globalInventoryContext);
  let currInventory = []
  function onClick() {
    setIsInventoryOpen(!isInventoryOpen);
    if (isInventoryOpen) {
      const items = getItems(inventoryState);
      for (let i = 0; i < items.length; i++){
        if(checkIfItemIsPlant(items[i],plants)){
          let seedCount = getSeedCount(inventoryState, items[i]);
          let cropCount = getCropCount(inventoryState, items[i]);
          if ((seedCount > 0) || (cropCount > 0)){
            const plant = items[i];   
            let pItem = { [plant] :{seed:seedCount,crop:cropCount}};
            currInventory.push(pItem);
          }
        } else {
          let itemCount = getItemCount(inventoryState, items[i]);
          if (itemCount > 0) {
            const itemName = items[i];
            let cItem = {itemName:itemCount};
            currInventory.push(cItem);
          }
        }
      }

      let season;
      if (props.turn % 3 === 0) {
        season = "Fall";
      } else if (props.turn % 3 === 1) {
        season = "Winter";
      } else if (props.turn % 3 === 2) {
        season = "Spring";
      } else {
        season = "Summer";
      }

      logData({
        actionType: "Inventory count",
        turn: props.turn,
        season: season,
        isExperimental: true,
        balance: props.money,
        details: { inventory: currInventory },
      });
    }
  }
  let currentItemRender = [];
  let itemList = getItems(inventoryState);
  for (let i = 0; i < itemList.length; i++){
      let img = getImage(itemList[i],shopItemsList);

// if plant: one picture, seed count and crop count, else just quantity
    let isPlant = checkIfItemIsPlant(itemList[i],plants);
    currentItemRender.push(   
      <div className="item">
        <img src={img} alt="Item-Pic"></img>
        <div className="item-info">
          <h4>{itemList[i]}</h4>
          <div className="quantity-info">
            <h4 className="quantity-title">Quantity:</h4>
            
            {
              isPlant ? 
           
              <>
            <p className="seed quantity">
              {getSeedCount(inventoryState,itemList[i])}
            </p>
            <p className="crop quantity">
              {getCropCount(inventoryState,itemList[i])}
            </p>
            </>
          :
          <>
            <p className="seed quantity">
              {getItemCount(inventoryState,itemList[i])}
            </p>
          </>
          } 
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {isInventoryOpen ? (
        <div className="inventory">
          <div className="inventory-box">
            <p id="inventory-title" className="center">
              Inventory
            </p>
            <div className="grid">
                {currentItemRender}
            </div>
          </div>

          <button className="inventory-button" onClick={() => onClick()}>
            Close
          </button>
        </div>
      ) : (
        <button className="inventory-button" onClick={() => onClick()}>
          Inventory
        </button>
      )}
    </>
  );
}


export default InventoryRender;
