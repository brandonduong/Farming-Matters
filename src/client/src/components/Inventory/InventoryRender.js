import "../../css/Inventory.css";
import React, { useState } from "react";
import { getItemCount, getItems, getSeedCount, getCropCount } from "../Inventory";
import { globalInventoryContext, marketItems } from "../../Game";
import { getImage } from "../GameLogic/GameLogic";
import { logData } from "../../utils/logData";
import { checkIfItemIsPlant } from "../GameLogic/GameLogic";
import { plants } from "../Farm/FarmTile/constants";
import { shopItemsList, quantityContent } from "../Shop/constants";
import InventoryItem from "./InventoryItem";


//TODO: This component will need to be completely reworked once the react state is set up to dynamically show inventory contents
const InventoryRender = (props) => {
  let [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const { inventoryState } = React.useContext(globalInventoryContext);
  const [itemSelected, setItemSelected] = useState("");
  let currInventory = []
 // [{tomato:{seed:#,crop:#}},{fertilizer:#}]
  function onClick() {
    setIsInventoryOpen(!isInventoryOpen);
    setItemSelected("");
    if(isInventoryOpen){
      const items = getItems(inventoryState);     
      for (let i = 0; i < items.length; i++){
        if(checkIfItemIsPlant(items[i],plants)){
          let seedCount = getSeedCount(inventoryState, items[i]);
          let cropCount = getCropCount(inventoryState, items[i]);
          if ((seedCount > 0) || (cropCount > 0)){
            const plant = items[i];   
            let pItem = {plant:{seed:seedCount,crop:cropCount}};
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
      logData("Inventory count", 
      { turn: props.turn, 
        inventory: currInventory, 
      })
    }
  }
  let currentItemRender = [];
  let itemList = getItems(inventoryState);
  for (let i = 0; i < itemList.length; i++){
      let img = getImage(itemList[i],shopItemsList);

// if plant: one picture, seed count and crop count, else just quantity
    let isPlant = checkIfItemIsPlant(itemList[i],plants);
    currentItemRender.push(   
      <div className="item" onClick={()=>{setItemSelected(itemList[i])}}>
        <img className="item-image" src={img} alt="Item-Pic"></img>
        <div className="item-info">
          <h4>{itemList[i]}</h4>
          <div className="quantity-info">
            
            {
              isPlant ? 
           
              <>
            <div className="quant-grid">
              <h4 className="quantity-title">Quantities:</h4>
              <div className="quantity-info-grid">
                <img className="count-pics" src={quantityContent[0].image} alt="Item-Pic"></img>
                <p className="seed quantity">
                  {getSeedCount(inventoryState,itemList[i])}
                </p>
                <div className="empty"></div>
                <img className="count-pics" src={quantityContent[1].image} alt="Item-Pic"></img>
                <p className="crop quantity">
                  {getCropCount(inventoryState,itemList[i])}
                </p>
              </div>
            </div>
            </>
          :
          <>
            <h4 className="quantity-title">Quantity:</h4>
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
          <div className="all-inventory-grid">
            <div className="inventory-title">
              <div className="inventory-title-label">Inventory</div>
            </div>
            <div className="inventory-grid">
              <div className="empty"></div>
              <div className="inventory-box">
                <div className="grid">
                    {currentItemRender}
                </div>
              </div>
              <div className="empty"></div>
              <div className="display-more"> 
                  <h1>More Information:</h1>
                  <InventoryItem item={itemSelected} {...props} />
              </div>
              <div className="empty"></div>
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