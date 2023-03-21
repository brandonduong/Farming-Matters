import React, { useEffect, useState } from "react";
import { globalInventoryContext } from "../../Game";
import { getSeedContractsCounts } from "../Inventory";
import { checkIfItemIsPlant, getImage, getItemFluctuation } from "../GameLogic/GameLogic";
import { plants } from "../Farm/FarmTile/constants";
import { logData } from "../../utils/logData";
import { shopItemsList } from "../Shop/constants";
import { itemFluctuation } from "../GameLogic/constants";
import { quantityContent } from "../Shop/constants";

const InventoryItem = (props) => {
  const { inventoryState, cropInfo } = React.useContext(globalInventoryContext);
  const [itemName, setItemName] = useState();
  const [itemImg, setItemImg] = useState(quantityContent[1].image);

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
  }

  useEffect(() => {
    setItemDetails(); 
    
  }, [props.item]);
  

  let currentSeedRender = [];
  let currentCropRender = [];
  if (itemName){
  
  let seedCounts = getSeedContractsCounts(inventoryState,itemName);
  let seedFloors = Object.keys(seedCounts);
  let cropContracts = cropInfo[itemName];
  console.log(seedFloors);
  
 
  for (let i = 0; i < seedFloors.length; i++){
    let seedFloor = seedFloors[i];
    let seedQuantity = seedCounts[seedFloor];
    currentSeedRender.push(
      <tr>
        <td>{seedQuantity}</td>
        <td>{(seedFloor == "null") ? "None" : seedFloor}</td> 
      </tr>
  )}

  // {floorPrice: itemFloorPrice, cropExpiry: itemCropExpiry, quantity: 1}
  for (let i = 0; i < cropContracts.length; i++){
    let cropFloor = cropContracts[i].floorPrice;
    let cropExp = cropContracts[i].cropExpiry;
    let cropQuantity = cropContracts[i].quantity;
    currentCropRender.push(
      <tr>
        <td>{cropQuantity}</td>
        <td>{cropFloor}</td> 
        <td>{cropExp}</td>
      </tr>
  )}

  }
  

  return (
    <div className="detailed-item" key={props.id} >
      <h2>{props.item != "" ? props.item : "Select an item to view more details ..."}</h2>
      <img src={itemImg} alt="crops" className="item-image"></img>
      <div className="details">
        <h1>Contracts</h1>
        {props.item ? 
        <>
          <div className="Contracts">
            <div className="empty"></div>
            <div className="seeds">
              <h3>Seed Contracts</h3>
              <table className="table table-bordered">
                <tr>
                  <td>Quantity</td>
                  <td>FloorPrice</td>
                </tr>
              {currentSeedRender}
              </table>
            </div>  
            <div className="empty"></div>
            <div className="crops">
              <h3>Crop Contracts</h3>
              <table >
                <tr>
                  <td>Quantity</td>
                  <td>FloorPrice</td>
                  <td>Expiry</td>
                </tr>
              {currentCropRender}
              </table>
            </div>  
          </div>
        </> : 
        ( 
        <></>
        )}
      </div>
    </div>
  );
};

export default InventoryItem;
