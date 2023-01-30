import React, { useState } from "react";
import {globalInventoryContext} from "../../App";
import { addItem, getItemCount, getItems, removeItem } from "../Inventory";

const InventoryItem = (props) => {
  const [quantity, setQuantity] = useState(0);
  const { inventoryState, setInventoryState } = React.useContext(globalInventoryContext);

  function sell() {
      if(parseInt(getItemCount(inventoryState,props.name)) < quantity || parseInt(getItemCount(inventoryState,props.name)) === 0){
        console.log("Not enough items to sell")
      }
      else{
        props.setMoney(props.money + quantity * props.price);
        setQuantity(0);
        removeItem(inventoryState,props.name,quantity);
        console.log(inventoryState);
      }
  }

  function fluctuatePrice(price) {
    // basePrice+randomFactor ×(basePrice/3)
    // generate random factor between 0 and 1
    const randomFactor = Math.random() * (1 - (-1)) - 1;
    const basePrice = parseFloat(price);
    let newPrice = basePrice + randomFactor*(basePrice/3);
    return newPrice.toFixed(2);
  }

  return (
    <div className="shop-item" key={props.id }>
      <img src={props.image} alt="crops" className="item-image"></img>
      <p style={{ color: "white", margin: "5px" }}>
        {props.name + " - $" + fluctuatePrice(props.price)}
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
