import "../../css/Inventory.css";
import React, { useState } from "react";
import { getItemCount, getItems } from "../Inventory";
import { globalInventoryContext, marketItems } from "../../Game";
import { shopItemsList } from "../Shop/constants";
import { logData } from "../../utils/logData";

//TODO: This component will need to be completely reworked once the react state is set up to dynamically show inventory contents
const InventoryRender = (props) => {
  let [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const { inventoryState } = React.useContext(globalInventoryContext);

  function onClick() {
    setIsInventoryOpen(!isInventoryOpen);
    if (isInventoryOpen) {
      let currInventory = [];
      const items = getItems(inventoryState);
      for (let i = 0; i < items.length; i++) {
        if (getItemCount(inventoryState, items[i]) > 0) {
          let currItem = {};
          currItem[items[i]] = getItemCount(inventoryState, items[i]);
          currInventory.push(currItem);
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
  for (let i = 0; i < itemList.length; i++) {
    let img = "";
    if (props.marketItems[i]) {
      img = props.marketItems[i].image;
    }

    currentItemRender.push(
      <div className="item">
        <img src={img} alt="Item-Pic"></img>
        <div className="item-info">
          <h4>{itemList[i]}</h4>
          <div className="quantity-info">
            <h4 className="quantity-title">Quantity:</h4>
            <p className="quantity">
              {getItemCount(inventoryState, itemList[i])}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isInventoryOpen ? (
        <div className="inventory">
          <div className="inventory-box">
            <p id="inventory-title" className="center">
              Inventory
            </p>
            <div className="grid">{currentItemRender}</div>
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
};

export default InventoryRender;
