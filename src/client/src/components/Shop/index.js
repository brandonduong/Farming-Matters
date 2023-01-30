import React from "react";
import { useState } from "react";
import ShopItem from "./ShopItem";
import { shopItemsList } from "./constants";
import {globalInventoryContext} from "../../App";
import InventoryItem from "./InventoryItem";


const Shop = ({money, setMoney}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const { inventoryState, setInventoryState } = React.useContext(globalInventoryContext);
  

  const displayShop = () => {
    setShowMenu(!showMenu);
    setShowBuy(!showBuy);
    
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
      shopItemsList.map((item) => (
        <ShopItem
          key={item.id}
          id={item.id}
          image={item.image}
          name={item.name}
          price={item.price}
          money={money}
          setMoney={setMoney}
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
      shopItemsList.map((item) => (
        <InventoryItem
          key={item.id}
          id={item.id}
          image={item.image}
          name={item.name}
          price={item.price}
          money={money}
          setMoney={setMoney}
        />
      ))
      );
  }


  return (
    <>
      {showMenu ? (
        <>
          <button type="button" className="shop-button" onClick={displayShop}>
            Close
          </button>
          <div className="shop">
          <button type="button" className="buy-button" onClick={displayBuy}>
            Buy
          </button>
          <button type="button" className="sell-button" onClick={displaySell}>
            Sell
          </button>
            <div className="shop-component">
              <p className="center shop-heading">Shop</p>
              <div className="shop-items">
                {showBuy ? 
                  displayBuyItems()
                 : 
                  displaySellItems()
                }
              </div>
            </div>
          </div>
        </>
      ) : (
        <button type="button" className="shop-button" onClick={displayShop}>
          Shop
        </button>
      )}
    </>
  );
};

export default Shop;
