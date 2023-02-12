import React, { useEffect, useState } from "react";
import {globalInventoryContext} from "../../Game";
import { addItem, getItemCount, getItems, removeItem } from "../Inventory";
import { shopItemsList } from "./constants";
import { checkIfItemIsPlant } from "../GameLogic/Gamelogic";
import { plants } from "../Farm/FarmTile/constants";
import { logData } from "../../utils/logData";

const InventoryItem = (props) => {
  const [quantity, setQuantity] = useState(0);
  const { inventoryState, insuredState } = React.useContext(globalInventoryContext);
  let currTurnPrices = props.allTurnPrices[props.turn]
  let currentPrice = currTurnPrices[props.name];
  let [sellPrice, setSellPrice] = useState(currentPrice);


  function sell() {
      if(parseInt(getItemCount(inventoryState,props.name)) < quantity || parseInt(getItemCount(inventoryState,props.name)) === 0){
        console.log("Not enough items to sell")
      }
      else{
        console.log(sellPrice);
        const currBalance = props.money + quantity * sellPrice;
        props.setMoney(currBalance.toFixed(2));
        setQuantity(0);
        removeItem(inventoryState,props.name,quantity);
        logData("Sold item",{
          turn: props.turn,
          name: props.name,
          quantity: quantity,
          hasInsurance: getItemCount(insuredState,props.name) > 0,
          soldPrice: sellPrice.toFixed(2),
          marketPrice: currentPrice.toFixed(2),
        })
      }
  }

  function getItemBasePrice(name,items){
    let basePrice = props.price;
    for (let i = 0; i < items.length; i++){
      if (items[i].name == name){
        basePrice = items[i].price;
      }
    }
    return basePrice;
  }


  function chooseBestPrice() {
      let basePrice = getItemBasePrice(props.name,shopItemsList);
      console.log("Base Price: "+ basePrice);
      if (getItemCount(insuredState,props.name) > 0){
        if (basePrice > currentPrice){
          setSellPrice(basePrice);
          console.log("Sell at Base Price");
        }
        else {
          setSellPrice(currentPrice);
          console.log("Sell at Current Price")
        }
      } else {
        setSellPrice(currentPrice);
        console.log("Sell at Current Price")
      }
  }

  useEffect(() => {
    chooseBestPrice()   
    console.log(sellPrice)
  },[sellPrice])

  return (
    <>
    { checkIfItemIsPlant(props.name,plants) ?
     <div className="shop-item" key={props.id }>
        <img src={props.image} alt="crops" className="item-image"></img>
        <p style={{ color: "white", margin: "5px" }}>
          {props.name + " - $" +  sellPrice.toFixed(2)}
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
     : <></> } 
    </>
  );
};

export default InventoryItem;
