import React, { useEffect, useState } from "react";
import { globalInventoryContext } from "../../Game";
import { getItemCount, getSeedContractsCounts } from "../Inventory";
import { checkIfItemIsPlant, getImage, getItemFluctuation } from "../GameLogic/GameLogic";
import { plants } from "../Farm/FarmTile/constants";
import { logData } from "../../utils/logData";
import { shopItemsList } from "../Shop/constants";
import { itemFluctuation } from "../GameLogic/constants";
import { quantityContent } from "../Shop/constants";
import Table from "react-bootstrap/Table"

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

  for (let i = 0; i < seedFloors.length; i++){
    let seedFloor = seedFloors[i];
    let seedQuantity = seedCounts[seedFloor];
    currentSeedRender.push(
      <tr>
        <td>{seedQuantity}</td>
        <td>{(seedFloor == "null") ? "None" : seedFloor}</td> 
      </tr>
  )}

    if(cropInfo[itemName]){
        // {floorPrice: itemFloorPrice, cropExpiry: itemCropExpiry, quantity: 1}
      let cropContracts = cropInfo[itemName];
      for (let i = 0; i < cropContracts.length; i++){
      let cropFloor = cropContracts[i].floorPrice? cropContracts[i].floorPrice : "No Insurance";
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
  }
  

  return (
    <div className="detailed-item" key={props.id} >
      <h2>{props.item != "" ? props.item : "Select an item to view more details ..."}</h2>
      <img src={itemImg} alt="crops" className="item-image"></img>
      <div className="details">
        {props.item && checkIfItemIsPlant(props.item,plants) ? 
        <>
          <h1>Contracts</h1>
          <div className="contracts-scroll">
            <div className="Contracts">
              <div className="seeds">
                <h3>Seed Contracts</h3>
                <Table className="table table-bordered">
                  <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>FloorPrice</th>
                  </tr>
                  </thead>
                  <tbody>{currentSeedRender}</tbody>
                </Table>
              </div>  
              <div className="crops">
                <h3>Crop Contracts</h3>
                <Table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>FloorPrice</th>
                    <th>Expiry</th>
                  </tr>
                </thead>
                <tbody>{currentCropRender}</tbody>
                </Table>
              </div>  
            </div>
          </div>
        </> : 
        ( 
        <>
          <h3>Quantity: </h3>
          <h3>{getItemCount(inventoryState,props.item)}</h3>
        </>
        )}
      </div>
    </div>
  );
};

export default InventoryItem;
