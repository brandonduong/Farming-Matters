import React, { useState } from "react";
import { globalInventoryContext } from "../../Game";
import { addItem, getItemCount } from "../Inventory";
import { checkIfItemIsPlant } from "../GameLogic/GameLogic";
import { plants } from "../Farm/FarmTile/constants";
import { logData } from "../../utils/logData";

const ShopItem = (props) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const [insuranceQuantity, setInsuranceQuantity] = useState(0);
  const { inventoryState, insuredState } = React.useContext(globalInventoryContext);

  function determineSeason(turnNumber) {
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
    return season;
  }

  return (
    <div className="shop-item "key={props.id} onClick={()=> {props.setItemSelected(props.name)}}>
      
      <div className="season-label">{props.seasonType}</div>
      <div className={(props.seasonType != "" ? props.seasonType.toLowerCase() : "other") + "-item"}>
      
      <img src={props.image} alt="crops" className="item-image"></img>
      <div className="shop-item-name" >
        {props.name + " - $" + parseFloat(props.price).toFixed(2)}
      </div>
      </div>
      
    </div>
  );
};

export default ShopItem;
