import React, { useState } from "react";
import { globalInventoryContext } from "../../Game";
import { addItem, getItemCount } from "../Inventory";
import { checkIfItemIsPlant } from "../GameLogic/GameLogic";
import { plants } from "../Farm/FarmTile/constants";
import { logData } from "../../utils/logData";

const ShopItem = (props) => {
  
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
