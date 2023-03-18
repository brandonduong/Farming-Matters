import React, { useState } from "react";
import { globalInventoryContext } from "../../Game";
import { addInsuredItem, addItem, getItemCount } from "../Inventory";
import { checkIfItemIsPlant } from "../GameLogic/GameLogic";
import { plants } from "../Farm/FarmTile/constants";
import { logData } from "../../utils/logData";

const ShopItem = (props) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const [insuranceQuantity, setInsuranceQuantity] = useState(0);
  const { inventoryState, insuredState } = React.useContext(
    globalInventoryContext
  );

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

  return (
    <div className="shop-item" key={props.id} onClick={()=> {props.setItemSelected(props.name)}}>
      <img src={props.image} alt="crops" className="item-image"></img>
      <p style={{ color: "white", margin: "5px" }}>
        {props.name + " - $" + props.price}
      </p>
     
       : (
        <></>
      )
    </div>
  );
};

export default ShopItem;
