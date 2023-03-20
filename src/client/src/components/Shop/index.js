import React from "react";
import { useState } from "react";
import ShopItem from "./ShopItem";
import { shopItemsList } from "./constants";
import {globalInventoryContext} from "../../Game";
import InventoryItem from "./InventoryItem";
import DetailedItem from "./DetailedItem"


const Shop = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const { inventoryState, setInventoryState } = React.useContext(globalInventoryContext);
  
  

  const displayShop = () => {
    setShowMenu(!showMenu);
    setShowBuy(!showBuy);
    setItemSelected("");
    
  };

  const  displayBuy =  () => {
    if(showSell){
      setShowBuy(!showBuy);
      setShowSell(!showSell);
    }
    console.log("BUY CLICKED");
  };



  function displayBuyItems (){
    return(
      props.marketItems.map((item) => (
        <ShopItem
          key={item.id}
          id={item.id}
          image={item.image}
          name={item.name}
          price={item.price}
          money={props.money}
          setMoney={props.setMoney}
          turn={props.turn}
          allTurnPrices={props.allTurnPrices}
          setItemSelected={setItemSelected}
          seasonType={item.seasonType}
        />
      ))
      );
    }

  const displaySell = () => {
    if(showBuy){
      setShowSell(!showSell);
      setShowBuy(!showBuy);
    }
  };

  function displaySellItems (){
    const currentInventory = inventoryState;
    return(
      props.marketItems.map((item) => (
        <InventoryItem
          key={item.id}
          id={item.id}
          image={item.image}
          name={item.name}
          price={item.price}
          money={props.money}
          setMoney={props.setMoney}
          turn={props.turn}
          allTurnPrices={props.allTurnPrices}
        />
      ))
      );
  }

  return (
    <>
      {showMenu ? (
        <div>
          <button type="button" className="shop-button" onClick={displayShop}>
            Close
          </button>
          <div className="shop">
            <div className="all-shop">
              <div className="title">Shop</div>
              <div className="shop-grid">
              <div className="empty-div"></div>
                <div className="shop-component">
                    <div div className="market-options">
                          <button type="button"  className={"market-button buy-button"  + (showBuy ? " active" : "")}  onClick={displayBuy} >
                          Buy </button>
                          <button type="button" className={"market-button sell-button" +  (showSell ? " active" : "")} onClick={displaySell}> Sell </button>
                    </div>
                    <div className="header">
                        <div className="header-tools">
                        <div className="filter">
                          <label>Filters: </label> <select name="filters">
                            <optgroup label="Season Filters">
                              <option value="Fall">Fall</option>
                              <option value="Winter">Winter</option>
                              <option value="Spring">Spring</option>
                              <option value="Summer">Summer</option>
                            </optgroup>
                            <optgroup label="Item Filters">
                              <option label="LowToHigh">Lowest to Highest price</option>
                              <option label="HighToLow">Highest to Lowest price</option>
                            </optgroup>
                          </select>
                        </div>
                        <div className="Info">
                          <p>Season: {props.season}</p>
                        </div>
                        <div className="Info">

                          <p>Money: ${props.money.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                   
                    <div className="shop-items">
                      {showBuy ? 
                        displayBuyItems()
                      : 
                        displaySellItems()
                      }
                    </div>
                </div>

              <div className="empty-div"></div>
              <div className="display-more"> 
                      <h1>More Information:</h1>
                      <DetailedItem item={itemSelected} setItemSelected={itemSelected} {...props} />
              </div>
              <div className="empty-div"></div>
              </div>
            </div>
            
            </div>
        </div>
      ) : (
        <button type="button" className="shop-button" onClick={displayShop}>
          Shop
        </button>
      )}
    </>
  );
};

export default Shop;