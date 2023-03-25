import Form  from 'react-bootstrap/Form';
import React, { useEffect, useState } from "react";
import { globalInventoryContext } from "../../Game";
import { addInsuredItem, addItem, getItemCount } from "../Inventory";
import { checkIfItemIsPlant } from "../GameLogic/GameLogic";
import { plants } from "../Farm/FarmTile/constants";
import { logData } from "../../utils/logData";
import { shopItemsList, add_img_location, minus_img_location} from "./constants";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const DetailedItem = (props) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const [insuranceQuantity, setInsuranceQuantity] = useState(0);
  const [insuranceFloorPrice, setInsuranceFloorPrice] = useState(0);
  const { inventoryState, insuredState } = React.useContext(
    globalInventoryContext
  );

  const [insuranceOption, setInsuranceOption] = useState(false);
  
  const [totalItemCost, setTotalItemCost] = useState(0);
  const [totalInsuranceCost, setTotalInsuranceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);


  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemImg, setItemImg] = useState("");
  const [itemPrice, setItemPrice] = useState(0)
  const [itemInsuranceList, setItemInsuranceList] = useState("");
  const [itemFloorPrice, setItemFloorPrice] = useState("");
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

    const currentItemIndex = shopItemsList[findItemIndex(props.item)];
    setItemType(currentItemIndex.seasonType);
    setItemImg(currentItemIndex.image);
    setItemPrice(props.allTurnPrices[props.turn % props.allTurnPrices.length][props.item]);
    setItemInsuranceList([]); //UPDATE when insurance is done
  }
  useEffect(() => {
    setItemDetails(); 
    priceIncreaseOrDecrease();
  }, [props.item]);

  function buy() {
    if (itemQuantity * props.price <= props.money) {
      props.setMoney(props.money - itemQuantity * props.price);
      addItem(inventoryState, props.name, itemQuantity);
      setItemQuantity(0);

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
  }

  function purchaseInsurance() {
    //insurance quantity is a string according to typeof
    // insurance is 1/4 of market price
    const insurancePrice = props.price / 4;
    let hasEnoughMoney = insuranceQuantity * insurancePrice <= props.money;
    let hasEnoughItems =
      parseInt(insuranceQuantity) + getItemCount(insuredState, props.name) <=
      getItemCount(inventoryState, props.name);
    if (hasEnoughMoney && hasEnoughItems) {
      props.setMoney(
        props.money - parseInt(insuranceQuantity) * insurancePrice
      );
      addInsuredItem(insuredState, props.name, insuranceQuantity);
      setInsuranceQuantity(0);

      logData({
        actionType: "Insurance Bought",
        turn: props.turn,
        season: determineSeason(props.turn),
        isExperimental: true,
        balance: props.money,
        details: {
          name: props.name,
          quantity: insuranceQuantity,
          price: props.price,
        },
      });
    } else {
      console.log(
        "Not enough money to purchase insurance or not enough items to ensure"
      );
    }
  }

  function currentItemTotalCost(){
    setTotalItemCost(itemPrice*itemQuantity );
  }
  useEffect(() => {
    currentItemTotalCost();
  }, [itemPrice, itemQuantity]);

  function currentInsuranceCost(){
    //FILL IN 
  }

  function currentTotalCost(){
    setTotalCost(totalItemCost + totalInsuranceCost);
  }

  useEffect(() => {
    currentTotalCost();
  }, [currentItemTotalCost, currentInsuranceCost]);
  return (
    <div className="detailed-item" key={props.id} >
      <h2>{props.item != "" ? props.item : "Select an item to view more details ..."}</h2>
      <img src={itemImg} alt="crops" className="item-image"></img>
      <div className="details">
       
          <div className={"price " +(props.turn == 1 ? "turn-1" : isPriceIncrease ? "price-increase" : "price-decrease")}>
            Current Price: ${parseInt(itemPrice).toFixed(2)}  {props.turn == 1 ? ("-") : isPriceIncrease ? (<span>&#8593;</span>): (<span>&#8595;</span>)}
          
        </div>
      </div>

      <div className="purchase-info">
        <div className="quantity-grid">
            <label htmlFor="itemQuantity" >Item Quantity: </label>
            <div className="quantity-input-grid">
            <Button className="quantity-button" onClick={()=>{itemQuantity > 0 ? setItemQuantity(-1+parseInt(itemQuantity)) : setItemQuantity(parseInt(itemQuantity))}}>-</Button>
              <input
                type="number"
                name="itemQuantity"
                className="quantity-input-field"
                min="0"
                max="5"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
              ></input>
              <Button className="quantity-button" onClick={()=>{setItemQuantity(1+parseInt(itemQuantity))}}>+</Button> 
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

          { insuranceOption ? 
          <>
          <div className="quantity-grid">
            <label htmlFor="itemQuantity" >Insurance Floor Price: </label>
            <div className="quantity-input-grid">
            <Button className="quantity-button" onClick={()=>{insuranceFloorPrice > 0 ? setInsuranceFloorPrice(-10+parseInt(insuranceFloorPrice)) : setInsuranceFloorPrice(parseInt(insuranceFloorPrice))}}>-</Button>
              <input
                type="number"
                name="itemQuantity"
                className="quantity-input-field"
                min="0"
                value={insuranceFloorPrice}
                onChange={(e) => setInsuranceFloorPrice(e.target.value)}
              ></input>
              <Button className="quantity-button" onClick={()=>{setInsuranceFloorPrice(10+parseInt(insuranceFloorPrice))}} > +</Button>
            </div>
          </div>


          <div className="quantity-grid">
            <label htmlFor="itemQuantity" >Insurance Quantity: </label>
            <div className="quantity-input-grid">
              <Button className="quantity-button" onClick={()=>{insuranceQuantity > 0 ? setInsuranceQuantity(-1+parseInt(insuranceQuantity)) : setInsuranceQuantity(parseInt(insuranceQuantity))}}> -</Button>
              <input
                type="number"
                name="itemQuantity"
                min="0"
                className="quantity-input-field"
                max="5"
                value={insuranceQuantity}
                onChange={(e) => setInsuranceQuantity(e.target.value)}
              ></input>
              <Button className="quantity-button" onClick={()=>{setInsuranceQuantity(1+parseInt(insuranceQuantity))}}> +</Button>
            </div>
          </div>
          </>
              :
              <></>
              }
            
         

     
      </div>
      <br></br>
      <div className="cost-summary">
        <div className="individual-cost">
          Total Item Cost: ${totalItemCost.toFixed(2)}
        </div>
        <div className="individual-cost">
          Total Insurance Cost: ${totalInsuranceCost.toFixed(2)}
        </div>
        <div className="total-cost">
         Total Cost: ${totalCost.toFixed(2)}
        </div>

        <div className="left-over-cost">
         Left Over Cost: ${(props.money - totalCost).toFixed(2)}
        </div>
      </div>

      <div className="purchase">
        <Button variant="success">Purchase</Button>
      </div>
    </div>
  );
};

export default DetailedItem;
