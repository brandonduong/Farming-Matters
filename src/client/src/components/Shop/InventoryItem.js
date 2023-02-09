import React, { useState, useEffect } from "react";
import {globalInventoryContext} from "../../App";
import { addItem, getItemCount, getItems, removeItem } from "../Inventory";

const InventoryItem = (props) => {
  const [quantity, setQuantity] = useState(0);
  const { inventoryState, insuredState, turn } = React.useContext(globalInventoryContext);
  console.log(props.price[props.name])
  const [ bestPrice, setBestPrice] = useState(props.price[props.name]);

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
    console.log("FLUFCATIING WITH PRICE:  ", price)
    const randomFactor = Math.random() * (1 - (-1)) - 1;
    const basePrice = parseFloat(price);
    let newPrice = basePrice + randomFactor*(basePrice/10);
    return newPrice.toFixed(0);
  }

  function chooseBestPrice() {
    // start by seeing if prices fluctuate every turn
      let previous = bestPrice;
      let fluctuate = fluctuatePrice(props.price[props.name]);
      let hasEnoughInsuredItems = getItemCount(insuredState,props.name) > 0;
      let newPrice;
      // if the person has insurance they will sell the item for atleast the same price it was bought for
      if (hasEnoughInsuredItems){
        if (previous > fluctuate){
          console.log("ENOUGH INSURED ITEMS -> PREVIOUS BETTER");
          setBestPrice(previous);
          newPrice = previous;

        }
        else{
          console.log("ENOUGH INSURED ITEMS -> FLUCTUATE BETTER");
          setBestPrice(fluctuate)
          newPrice = fluctuate;
     
        }
      }
      // if the person has not ensured the item then it will fluctuate the next turn 
      else {
        console.log("NO INSURED ITEMS -> FLUCTUATE BETTER");
        setBestPrice(fluctuate);
        newPrice = fluctuate;
    
      } 
      
      //console.log("AT BEST PRICE", bestPrice)
      props.updatePrice(props.name,newPrice);
      //console.log(props.turnPrices);
  }

  useEffect(() => {
    console.log("ON TURN CHANGE", turn, props.turnChanged);
    if(props.turnChanged != turn){
     chooseBestPrice();
    }
  },[]);



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
      <button onClick={() => { sell() }}>Sell</button>
    </div>
  );
};

export default InventoryItem;
