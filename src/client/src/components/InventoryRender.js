import "../css/Inventory.css";
import React, { useState } from "react";
import { getItemCount, getItems } from "./Inventory";
import { globalInventoryContext } from "../App";



//TODO: This component will need to be completely reworked once the react state is set up to dynamically show inventory contents
function InventoryRender() {
  let [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const { inventoryState } = React.useContext(globalInventoryContext);


  function onClick() {
    setIsInventoryOpen(!isInventoryOpen);
  }
  let currentItemRender = []
  let itemList = getItems(inventoryState.inventory);
  for (let i = 0; i < itemList.length; i++){

    currentItemRender.push(    
      <div className="item">
      {/* <img src={require("../assets/CropIcons/mushroom.png")} alt="mushroom" /> */}
      <div className="item-info">
        <h2>{itemList[i]}</h2>
        <h4 className="quantity-title">Quantity:</h4>
        <p className="quantity">{getItemCount(inventoryState.inventory,itemList[i])}</p>
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
