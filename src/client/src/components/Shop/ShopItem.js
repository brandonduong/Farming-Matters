import React, { useState } from "react";
import { globalInventoryContext } from "../../Game";
import { addInsuredItem, addItem, getItemCount } from "../Inventory";
import { checkIfItemIsPlant } from "../GameLogic/Gamelogic";
import { plants } from "../Farm/FarmTile/constants";
import { logData } from "../../utils/logData";

const ShopItem = (props) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const [insuranceQuantity, setInsuranceQuantity] = useState(0);
  const { inventoryState, insuredState } = React.useContext(
    globalInventoryContext
  );

  function buy() {
    if (itemQuantity * props.price <= props.money) {
      props.setMoney(props.money - itemQuantity * props.price);
      addItem(inventoryState, props.name, itemQuantity);
      setItemQuantity(0);
      logData("Bought item", {
        turn: props.turn,
        name: props.name,
        quantity: itemQuantity,
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
      logData("Bought insurance", {
        turn: props.turn,
        name: props.name,
        quantity: insuranceQuantity,
        price: props.price,
      });
    } else {
      console.log(
        "Not enough money to purchase insurance or not enough items to ensure"
      );
    }
  }

  return (
    <div className="shop-item" key={props.id}>
      <img src={props.image} alt="crops" className="item-image"></img>
      <p style={{ color: "white", margin: "5px" }}>
        {props.name + " - $" + props.price}
      </p>
      <label htmlFor="itemQuantity" style={{ color: "white" }}>
        Quantity:
      </label>
      <input
        type="number"
        name="itemQuantity"
        min="1"
        max="5"
        style={{ width: "15%", margin: "0px 2%" }}
        value={itemQuantity}
        onChange={(e) => setItemQuantity(e.target.value)}
      ></input>
      <button onClick={() => buy()}>Buy</button>
      <br></br>
      {checkIfItemIsPlant(props.name, plants) ? (
        <>
          <label htmlFor="insuranceQuantity" style={{ color: "white" }}>
            Quantity:
          </label>
          <input
            id="insurance"
            type="number"
            name="insuranceQuantity"
            min="1"
            max="5"
            style={{ width: "15%", margin: "0px 2%" }}
            value={insuranceQuantity}
            onChange={(event_insurance) =>
              setInsuranceQuantity(event_insurance.target.value)
            }
          ></input>
          <button
            className="insurance-button"
            onClick={() => purchaseInsurance()}
          >
            Purchase Insurance
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ShopItem;
