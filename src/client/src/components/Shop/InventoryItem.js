import React, { useEffect, useState } from "react";
import { globalInventoryContext } from "../../Game";
import { quantityContent } from "./constants";
import { shopItemsList } from "./constants";
import { removeItemFromCropInfo } from "../Farm/FarmTile/FarmingHelpers";
import { add_img_location, minus_img_location } from "./constants";

const InventoryItem = (props) => {
  const [sellQuantity, setSellQuantity] = useState(0);
  const [sellMarketQuantity, setSellMarketQuantity] = useState(0);
  const { inventoryState, cropInfo } = React.useContext(globalInventoryContext);
  const [itemName, setItemName] = useState(props.item);
  const currMarketPrice = props.allTurnPrices[props.turn % props.allTurnPrices.length][props.item];
  const [itemType, setItemType] = useState("");
  const [itemImg, setItemImg] = useState(quantityContent[1].image);
  let [sellPrices, setSellPrices] = useState([]);
  const [profit, setProfit] = useState(0);

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

  function setItemDetails(){
    if (props.item == ""){
      return;
    }
    setItemName(props.item);
    console.log("ITEM: " + itemName)
    const currentItemIndex = shopItemsList[findItemIndex(props.item)];
    setItemType(currentItemIndex.seasonType);
    setItemImg(currentItemIndex.image);
    setSellPrices(cropInfo[props.item]);
    setProfit(0);
  }

    useEffect(() => {
    setItemDetails(); 
    setSellQuantity(0);
    console.log(sellPrices);
    }, [props.item]);


  // function sell() {
  //   if (
  //     parseInt(getItemCount(inventoryState, props.name)) < quantity ||
  //     parseInt(getItemCount(inventoryState, props.name)) === 0
  //   ) {
  //     console.log("Not enough items to sell");
  //   } else {
  //     console.log(sellPrice);
  //     const currBalance = props.money + quantity * sellPrice;
  //     props.setMoney(currBalance);
  //     setQuantity(0);
  //     removeItem(inventoryState, props.name, quantity);

  //     let season;
  //     if (props.turn % 3 === 0) {
  //       season = "Fall";
  //     } else if (props.turn % 3 === 1) {
  //       season = "Winter";
  //     } else if (props.turn % 3 === 2) {
  //       season = "Spring";
  //     } else {
  //       season = "Summer";
  //     }

  //     logData({
  //       actionType: "Crop Sold",
  //       turn: props.turn,
  //       season: season,
  //       isExperimental: true,
  //       balance: props.money,
  //       details: {
  //         name: props.name,
  //         quantity: quantity,
  //         hasInsurance: getItemCount(insuredState, props.name) > 0,
  //         soldPrice: sellPrice.toFixed(2),
  //         marketPrice: currentPrice.toFixed(2),
  //       },
  //     });
  //   }
  // }

  // useEffect(() => {
  //   chooseBestPrice();
  //   console.log(sellPrice);
  // }, [sellPrice]);

  // Only get inputs for owned crop contracts
  const priceButtons = [];
  for (let i = 0; i < sellPrices.length; i++) {
    let currFloorPrice = sellPrices[i].floorPrice ?? 'None';
    let floorQuantity = sellPrices[i].quantity;
    if (currFloorPrice == 'None'){
      break;
    }
    priceButtons.push(
      <div className="quantity-grid">
        <label htmlFor="itemQuantity" >Floor Price: {currFloorPrice}</label>
        <div className="quantity-input-grid">
          <img src={minus_img_location} className="quantity-button" onClick={()=>{(sellQuantity > 0) ? setSellQuantity(-1+parseInt(sellQuantity)) : setSellQuantity(parseInt(sellQuantity))}}/>
          <input
            type="number"
            name="itemQuantity"
            className="quantity-input-field"
            min="0"
            max={floorQuantity}
            value={sellQuantity}
            onChange={(e) => setSellQuantity(e.target.value)}
          ></input>
          <img src={add_img_location} className="quantity-button" onClick={()=>{(sellQuantity < floorQuantity) ? setSellQuantity(1+parseInt(sellQuantity)) : setSellQuantity(parseInt(sellQuantity))}}/>
        </div>
      </div>
    )  
  }


  return (
    <>
      <div className="detailed-item" key={props.id} >
        <h2>{props.item != "" ? props.item : "Select an item to view more details ..."}</h2>
        <img src={itemImg} alt="crops" className="item-image"></img>
        <div className="insurance-buttons">
          {priceButtons}
        </div>
        <div className="market-price-button">
          <div className="quantity-grid">
            <label htmlFor="itemQuantity" >Market Price: {currMarketPrice.toFixed(2)}</label>
            <div className="quantity-input-grid">
              <img src={minus_img_location} className="quantity-button" onClick={()=>{(sellMarketQuantity > 0) ? setSellMarketQuantity(-1+parseInt(sellMarketQuantity)) : setSellMarketQuantity(parseInt(sellMarketQuantity))}}/>
              <input
                type="number"
                name="itemQuantity"
                className="quantity-input-field"
                min="0"
                max="5"
                value={sellMarketQuantity}
                onChange={(e) => setSellMarketQuantity(e.target.value)}
              ></input>
              <img src={add_img_location} className="quantity-button" onClick={()=>{(sellMarketQuantity < 5) ? setSellMarketQuantity(1+parseInt(sellMarketQuantity)) : setSellMarketQuantity(parseInt(sellMarketQuantity))}}/>
            </div>
          </div>
        </div>
        <div className="individual-cost">
            Total : ${profit.toFixed(2)}
        </div>
        <div className="sell-button">
          <button>Sell</button>
        </div>

      </div>
    </>    
  )
};

export default InventoryItem;
