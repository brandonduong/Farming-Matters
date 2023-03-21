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
  const [filter, setFilter] = useState("All");
  const seasonFilters = ["All", "Fall", "Winter", "Spring", "Summer"];
  const priceFilters = ["LowToHigh", "HighToLow"];
  

  const displayShop = () => {
    setShowMenu(!showMenu);
    setShowBuy(!showBuy);
    setItemSelected("");
    setFilter("All");
    
  };

  const  displayBuy =  () => {
    if(showSell){
      setShowBuy(!showBuy);
      setShowSell(!showSell);
    }
    console.log("BUY CLICKED");
  };



  function displayBuyItems (){
    console.log(props.allTurnPrices);
    const shopItemRender = (item)=>(<ShopItem
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
        />);

    if (filter == "All"){
      return (props.marketItems.map(function (item)  {
        console.log("ALL");
          return(shopItemRender(item));
          
      }));

    } else if (seasonFilters.indexOf(filter) >= 0){
      return (props.marketItems.map(function (item)  {
        if (item.seasonType == filter){
          return(shopItemRender(item))
          
         }
        }
    
      ));
    }else if (priceFilters.indexOf(filter) >= 0){
      const mappedMarketItems = props.marketItems;
      if (filter == "LowToHigh"){
        const sortedMarketItems = [...mappedMarketItems].sort((item1,item2) => item1.price-item2.price);
        return (sortedMarketItems.map(function (item)  {
          return(shopItemRender(item))
           }
        )); 
      }else if (filter == "HighToLow"){
        const sortedMarketItems = [...mappedMarketItems].sort((item1,item2) => item2.price-item1.price);
        return (sortedMarketItems.map(function (item)  {
          return(shopItemRender(item))
           }
        )); 
      }
    }
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
              <div className="shop-title">Shop</div>
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
                        <div className="filter-grid">
                          <label>Filters: </label> 
                          <select name="filters" onChange={(e) => setFilter(e.target.value)}>
                            <optgroup label="Season Filters">
                              <option value="All">All Seasons</option>
                              <option value="Fall">Fall</option>
                              <option value="Winter">Winter</option>
                              <option value="Spring">Spring</option>
                              <option value="Summer">Summer</option>
                            </optgroup>
                            <optgroup label="Item Filters">
                              <option value="LowToHigh">Lowest to Highest price</option>
                              <option value="HighToLow">Highest to Lowest price</option>
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
                      <div className="display-more-title">More Information:</div>
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