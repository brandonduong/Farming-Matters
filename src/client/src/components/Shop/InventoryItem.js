import React, { useState } from "react";
import {globalInventoryContext} from "../../App";
import { addItem, getItemCount, getItems, removeItem } from "../Inventory";

const InventoryItem = (props) => {
  const [quantity, setQuantity] = useState(0);
  const { inventoryState, insuredState } = React.useContext(globalInventoryContext);
  const currTurnPrices = props.allTurnPrices[props.turn]
  const currentPrice = currTurnPrices[props.name];
  console.log(typeof(currentPrice));
  console.log(typeof(quantity));
  console.log(typeof(props.money));


  function sell() {
      if(parseInt(getItemCount(inventoryState,props.name)) < quantity || parseInt(getItemCount(inventoryState,props.name)) === 0){
        console.log("Not enough items to sell")
      }
      else{
        props.setMoney(props.money + quantity * currentPrice);
        setQuantity(0);
        removeItem(inventoryState,props.name,quantity);
        console.log(inventoryState);
      }
  }


  function chooseBestPrice() {
      let currBestPrice = props.price;
      if (getItemCount(insuredState,props.name) > 0){
        if (props.price > currBestPrice){
          currBestPrice = props.price;
        }
      }
      return currBestPrice;
  }

  return (
    <div className="shop-item" key={props.id }>
      <img src={props.image} alt="crops" className="item-image"></img>
      <p style={{ color: "white", margin: "5px" }}>
        {props.name + " - $" + currentPrice}
      </p>
      <label htmlFor="quantity" style={{ color: "white" }}>
        Quantity:
      </label>
      <input
        type="number"
        name="quantity"
        min="1"
        max="5"
        style={{ width: "15%", margin: "0px 2%"}}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      ></input>
      <button onClick={() => sell()}>Sell</button>
    </div>
  );
};

export default InventoryItem;
