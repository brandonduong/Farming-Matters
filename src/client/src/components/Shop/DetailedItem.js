import React, { useEffect, useState } from "react";
import { globalInventoryContext } from "../../Game";
import { addItem, getItemCount } from "../Inventory";
import { checkIfItemIsPlant, getItemFluctuation } from "../GameLogic/GameLogic";
import { plants } from "../Farm/FarmTile/constants";
import { logData } from "../../utils/logData";
import { quantityContent, shopItemsList } from "./constants";
import { itemFluctuation } from "../GameLogic/constants";

const DetailedItem = (props) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const [insuranceQuantity, setInsuranceQuantity] = useState(0);
  const [insuranceFloorPrice, setInsuranceFloorPrice] = useState(0);
  const { inventoryState, setInventoryState } = React.useContext(globalInventoryContext);
  let Normal = require( '@stdlib/stats-base-dists-normal' ).Normal;
  const [totalItemCost, setTotalItemCost] = useState(0);
  const [totalInsuranceCost, setTotalInsuranceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemImg, setItemImg] = useState(quantityContent[1].image);
  const [itemPrice, setItemPrice] = useState("");
  // const [itemInsuranceList, setItemInsuranceList] = useState("");
  const [isPriceIncrease, setIsPriceIncrease] = useState(false);

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

  function findItemIndex(itemName){
    for (let i = 0; i < shopItemsList.length; i++){
      if (shopItemsList[i].name == itemName){
        return i;
      }
    }
    return -1;
  }


  function priceIncreaseOrDecrease(){
    if (itemName == ""){
      return;
    }
    const currentPrice = props.allTurnPrices[props.turn].itemName;
    const pastPrice = props.allTurnPrices[props.turn - 1].itemName;

    if (currentPrice > pastPrice){
      setIsPriceIncrease(true);
    }else{
      setIsPriceIncrease(false);
    }
  }

  function setItemDetails(){
    if (props.item == ""){
      return;
    }
    setItemName(props.item);
    console.log("ITEM: " + itemName)
    const currentItemIndex = shopItemsList[findItemIndex(props.item)];
    setItemType(currentItemIndex.seasonType);
    setItemImg(currentItemIndex.image);
    setItemPrice(currentItemIndex.price);
    // setItemInsuranceList([]); //UPDATE when insurance is done
  }
  useEffect(() => {
    setItemDetails(); 
    setItemQuantity(0);
    setInsuranceFloorPrice(0);
    setInsuranceQuantity(0);
    priceIncreaseOrDecrease();
  }, [props.item]);

  function purchase() {
    if (totalCost <= props.money) {
      let currInventory = inventoryState;
      props.setMoney(props.money - totalCost);
      let isPlant = checkIfItemIsPlant(itemName,plants);
      console.log(itemName);
      for (let i = 0; i < itemQuantity; i++){
        let currItem = {
          name: itemName,
          type: isPlant ? "seed" : "tool",
          floorPrice: (insuranceFloorPrice == 0 && insuranceQuantity == 0) ? null : insuranceFloorPrice,
          //cropExpiry: props.turn + 5
        } 
        addItem(currInventory,currItem);
      }
      setInventoryState(currInventory);
      setItemQuantity(0);
      setInsuranceFloorPrice(0);
      setInsuranceQuantity(0);
      logData({
        actionType: "Item Bought",
        turn: props.turn,
        season: determineSeason(props.turn),
        isExperimental: true,
        balance: props.money,
        details: { name: props.name, quantity: itemQuantity },
      });
    } else {
      console.log("Not enough money to buy crop");
    }
    console.log(inventoryState)
    setTotalCost(0);
  }

  function currentItemTotalCost(){
    setTotalItemCost(itemPrice*itemQuantity);
  }
  useEffect(() => {
    currentItemTotalCost();
  }, [itemPrice, itemQuantity]);

  function currentInsuranceCost(){
    if (itemName == ''){
      return;
    }
    let insuranceCost = 0;
      if (insuranceFloorPrice != 0 && insuranceQuantity != 0){
        let mean_price = props.allTurnPrices[props.turn][itemName];
        let sd_price = getItemFluctuation(itemName, itemFluctuation);
        const admin_fee = 0.1;
        let normDist = new Normal(mean_price,sd_price);
        let prob_payout = normDist.cdf(parseFloat(insuranceFloorPrice));
        let expected_payout = prob_payout * Math.abs(mean_price-insuranceFloorPrice);
        let fair_premium =  expected_payout / (1.0 - admin_fee);
        insuranceCost = fair_premium * insuranceQuantity;
        
      }
      setTotalInsuranceCost(insuranceCost);
  }

  function currentTotalCost(){
    setTotalCost(totalItemCost + totalInsuranceCost);
  }

  useEffect(() =>{
    currentInsuranceCost();
  }, [insuranceQuantity])

  useEffect(() => {
    currentTotalCost();
  }, [currentItemTotalCost, currentInsuranceCost]);
  return (
    <div className="detailed-item" key={props.id} >
      <h2>{props.item != "" ? props.item : "Select an item to view more details ..."}</h2>
      <img src={itemImg} alt="crops" className="item-image"></img>
      <div className="details">
        <div className="price">
          <div className={"price " +(isPriceIncrease ? "price-increase" : "price-decrease")}>
            Current Price: ${itemPrice}  {isPriceIncrease ? <span>&#8593;</span>: <span>&#8595;</span>}
          </div>
        </div>
      </div>

      <div className="purchase-info">
          <label htmlFor="itemQuantity" >Item Quantity: </label>
          <input
            type="number"
            name="itemQuantity"
            min="0"
            max="5"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          ></input>
       

          <br></br>
          { checkIfItemIsPlant(itemName,plants) ? (
          <>
          <label htmlFor="itemQuantity" >Insurance Floor Price: </label>
          <input
            type="number"
            name="itemQuantity"
            min="0"
            max="5"
            value={insuranceFloorPrice}
            onChange={(e) => setInsuranceFloorPrice(e.target.value)}
          ></input>
          <br></br>
          <label htmlFor="itemQuantity" >Insurance Quantity: </label>
          <input
            type="number"
            name="itemQuantity"
            min="0"
            max="5"
            value={insuranceQuantity}
            onChange={(e) => setInsuranceQuantity(e.target.value)}
          ></input>
          <br></br>
          </>
          ): (
            <></>
          )}
     
      </div>
      <br></br>
      <div className="cost-summary">
        { checkIfItemIsPlant(itemName,plants) ? (
        <>
          <div className="individual-cost">
            Total Item Cost: ${totalItemCost.toFixed(2)}
          </div>
            <div className="individual-cost">
              Total Insurance Cost: ${totalInsuranceCost.toFixed(2)}
            </div>
        </>
        ) : (
          <></>
        )} 
        <div className="total-cost">
         Total Cost: ${totalCost.toFixed(2)}
        </div>
        <div className="left-over-cost">
         Left Over Cost: ${(props.money - totalCost).toFixed(2)}
        </div>
      </div>

      <div className="purchase">
        <button disabled={props.money < totalCost} onClick={() => purchase()}>Purchase</button>
      </div>
    </div>
  );
};

export default DetailedItem;
