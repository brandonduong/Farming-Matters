import React, { useState, useEffect } from "react";
import {globalInventoryContext} from "../../App";
import { addItem, getItemCount, getItems, removeItem } from "../Inventory";

const InventoryItem = (props) => {
  const [quantity, setQuantity] = useState(0);
  const { inventoryState, insuredState } = React.useContext(globalInventoryContext);
  // let bestPrice = props.price;
  const [ bestPrice, setBestPrice] = useState(props.price);
  // let hasTurnChanged = props.turn % 2 == 1;

  function sell() {
      if(parseInt(getItemCount(inventoryState,props.name)) < quantity || parseInt(getItemCount(inventoryState,props.name)) === 0){
        console.log("Not enough items to sell")
      }
      else{
        props.setMoney(props.money + quantity * bestPrice);
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
    let newPrice = basePrice + randomFactor*(basePrice/10);
    return newPrice.toFixed(0);
  }

  function chooseBestPrice() {
    // start by seeing if prices fluctuate every turn
      let previous = props.price;
      let fluctuate = fluctuatePrice(props.price);
      let hasEnoughInsuredItems = getItemCount(insuredState,props.name) > 0;
      // if the person has insurance they will sell the item for atleast the same price it was bought for
      if (hasEnoughInsuredItems){
        if (previous > fluctuate){
          setBestPrice(previous);
        }
        else{
          setBestPrice(fluctuate)
        }
      }
      // if the person has not ensured the item then it will fluctuate the next turn 
      else {
        setBestPrice(fluctuate);
      }
  }

  useEffect(() => {
    chooseBestPrice()
    console.log(bestPrice);
  }, [props.turn])


  return (
    <div className="shop-item" key={props.id }>
      <img src={props.image} alt="crops" className="item-image"></img>
      <p style={{ color: "white", margin: "5px" }}>
        {props.name + " - $" + bestPrice}
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
