import React, { useEffect, useState } from "react";
import { globalInventoryContext } from "../../Game";
import { addItem, getAllItemContracts, getItemCount, getSameCropContractCount, getUniqueContracts } from "../Inventory";
import { checkIfItemIsPlant, getImage, getItemFluctuation } from "../GameLogic/GameLogic";
import { plants } from "../Farm/FarmTile/constants";
import { logData } from "../../utils/logData";
import { shopItemsList } from "../Shop/constants";
import { itemFluctuation } from "../GameLogic/constants";
import { quantityContent } from "../Shop/constants";

const InventoryItem = (props) => {
  const { inventoryState } = React.useContext(globalInventoryContext);
  const [itemName, setItemName] = useState();
  const [itemImg, setItemImg] = useState(quantityContent[1].image);
  const  [insuranceContracts, setInsuranceContracts] = useState("");

  function findItemIndex(itemName){
    for (let i = 0; i < shopItemsList.length; i++){
      if (shopItemsList[i].name == itemName){
        return i;
      }
    }
    return -1;
  }

  function setItemDetails(){
    if (props.item == ""){
      return;
    }
    setItemName(props.item);
    const currentItemIndex = shopItemsList[findItemIndex(props.item)];
    setItemImg(currentItemIndex.image);
    console.log(getUniqueContracts(inventoryState,props.item));
    setInsuranceContracts(getUniqueContracts(inventoryState,props.item));
  }

  useEffect(() => {
    setItemDetails(); 
  }, [props.item]);
  
  let currentItemRender = []
  console.log(insuranceContracts);
  for (let i = 0; i < insuranceContracts.length; i++){
    let currItem = insuranceContracts[i];
    console.log("CURR ITEM IS: " + currItem.name)
    let cropExpiry = currItem.cropExpiry;
    let floorPrice = (currItem.floorPrice == null) ? "No Insurance" : currItem.floorPrice;
    let seedCount = getSameCropContractCount(insuranceContracts, currItem.name, floorPrice, cropExpiry, 'seed');
    let cropCount = getSameCropContractCount(insuranceContracts, currItem.name, floorPrice, cropExpiry, 'crop');
    currentItemRender.push(
      <div className="countInfo">
        <p>Floor Price: {floorPrice}</p>
        <p>Crop Expiry: {cropExpiry}</p>
        <p>Seed Count: {seedCount}</p>
        <p>Crop Count: {cropCount} </p>
      </div>
  )}

  return (
    <div className="detailed-item" key={props.id} >
      <h2>{props.item != "" ? props.item : "Select an item to view more details ..."}</h2>
      <img src={itemImg} alt="crops" className="item-image"></img>
      <div className="details">
        <h1>Contracts</h1>
        <div className="Contracts">
          {currentItemRender}
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
