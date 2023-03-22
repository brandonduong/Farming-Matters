import Form  from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import { globalInventoryContext } from "../../Game";
import { addItem, getItemCount } from "../Inventory";
import { checkIfItemIsPlant, getItemFluctuation } from "../GameLogic/GameLogic";
import { plants } from "../Farm/FarmTile/constants";
import { logData } from "../../utils/logData";
import { quantityContent, shopItemsList, add_img_location, minus_img_location} from "./constants";
import { itemFluctuation } from "../GameLogic/constants";

const DetailedItem = (props) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const [insuranceQuantity, setInsuranceQuantity] = useState(0);
  const [insuranceFloorPrice, setInsuranceFloorPrice] = useState(0);
  const { inventoryState, setInventoryState } = React.useContext(globalInventoryContext);

  const [insuranceOption, setInsuranceOption] = useState(false);
  let Normal = require( '@stdlib/stats-base-dists-normal' ).Normal;
  const [totalItemCost, setTotalItemCost] = useState(0);
  const [totalInsuranceCost, setTotalInsuranceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemImg, setItemImg] = useState(quantityContent[1].image);
  const [itemPrice, setItemPrice] = useState(0)
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
    const currentPrice = props.allTurnPrices[props.turn % props.allTurnPrices.length].itemName;
    const pastPrice = props.allTurnPrices[(props.turn - 1) % props.allTurnPrices.length].itemName;

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
      for (let i = 0; i < insuranceQuantity; i++){
        let currItem = {
          name: itemName,
          type: isPlant ? "seed" : "tool",
          floorPrice: insuranceFloorPrice,
        } 
        addItem(currInventory,currItem);
      }
      for (let i = 0; i < itemQuantity - insuranceQuantity; i++){
        let currItem = {
          name: itemName,
          type: isPlant ? "seed" : "tool",
          floorPrice: null,
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
        let mean_price = props.allTurnPrices[props.turn % props.allTurnPrices.length][itemName];
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
       
          <div className={"price " +(props.turn == 1 ? "turn-1" : isPriceIncrease ? "price-increase" : "price-decrease")}>
            Current Price: ${parseFloat(itemPrice).toFixed(2)}  {props.turn == 1 ? ("-") : isPriceIncrease ? (<span>&#8593;</span>): (<span>&#8595;</span>)}
          
        </div>
      </div>

      <div className="purchase-info">
        <div className="quantity-grid">
            <label htmlFor="itemQuantity" >Item Quantity: </label>
            <div className="quantity-input-grid">
              <img src={minus_img_location} className="quantity-button" onClick={()=>{itemQuantity > 0 ? setItemQuantity(-1+parseInt(itemQuantity)) : setItemQuantity(parseInt(itemQuantity))}}/>
              <input
                type="number"
                name="itemQuantity"
                className="quantity-input-field"
                min="0"
                max="5"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
              ></input>
              <img src={add_img_location} className="quantity-button" onClick={()=>{setItemQuantity(1+parseInt(itemQuantity))}}/>
            </div>
          </div>


          <div className="insurance-toggle-grid">
            <label>Set insurance: </label>
            
            <div className="toggle-button">
              <Form.Switch 
                type="switch"
                id="custom-switch"
                onChange={(e) => {
                  
                  setInsuranceOption(e.target.checked)
                }}
              />
            </div>
          </div>

          { insuranceOption && checkIfItemIsPlant(props.item,plants) ? 
          <>
          <div className="quantity-grid">
            <label htmlFor="itemQuantity" >Insurance Floor Price: </label>
            <div className="quantity-input-grid">
              <img src={minus_img_location} className="quantity-button" onClick={()=>{insuranceFloorPrice > 0 ? setInsuranceFloorPrice(-10+parseInt(insuranceFloorPrice)) : setInsuranceFloorPrice(parseInt(insuranceFloorPrice))}}/>
              <input
                type="number"
                name="itemQuantity"
                className="quantity-input-field"
                min="0"
                value={insuranceFloorPrice}
                onChange={(e) => setInsuranceFloorPrice(e.target.value)}
              ></input>
              <img src={add_img_location} className="quantity-button" onClick={()=>{setInsuranceFloorPrice(10+parseInt(insuranceFloorPrice))}}/>
            </div>
          </div>


          <div className="quantity-grid">
            <label htmlFor="itemQuantity" >Insurance Quantity: </label>
            <div className="quantity-input-grid">
              <img src={minus_img_location} className="quantity-button" onClick={()=>{insuranceQuantity > 0 ? setInsuranceQuantity(-1+parseInt(insuranceQuantity)) : setInsuranceQuantity(parseInt(insuranceQuantity))}}/>
              <input
                type="number"
                name="itemQuantity"
                min="0"
                className="quantity-input-field"
                max="5"
                value={insuranceQuantity}
                onChange={(e) => setInsuranceQuantity(e.target.value)}
              ></input>
              <img src={add_img_location} className="quantity-button" onClick={()=>{(insuranceQuantity < itemQuantity) ? setInsuranceQuantity(1+parseInt(insuranceQuantity)) : setInsuranceQuantity(parseInt(insuranceQuantity))}}/>
            </div>
          </div>
          </>
              :
              <></>
              }
            
         

     
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
