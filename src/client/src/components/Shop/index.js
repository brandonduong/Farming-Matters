import React from "react";
import { useState } from "react";
import ShopItem from "./ShopItem";
import InventoryItem from "./InventoryItem";
import DetailedItem from "./DetailedItem"
import { SellItems } from "./SellItems"

const Shop = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
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
      // setFilter("All");
      setShowBuy(!showBuy);
      setShowSell(!showSell);
    }
  };



  function displayBuyItems (){
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
    // const currentInventory = inventoryState;
    const sellRender = (item)=>{
      if (item.seasonType != ""){
        return (
          <ShopItem
          key={item.id}
          id={item.id}
          image={item.image}
          name={item.name}
          price={props.allTurnPrices[props.turn % props.allTurnPrices.length][item.name]}
          money={props.money}
          setMoney={props.setMoney}
          turn={props.turn}
          allTurnPrices={props.allTurnPrices}
          setItemSelected={setItemSelected}
          seasonType={item.seasonType}
        />
        )
      };
    }
  

    if (filter == "All"){
      return (props.marketItems.map(function (item)  {
          return(sellRender(item));
      }));

    } else if (seasonFilters.indexOf(filter) >= 0){
      return (props.marketItems.map(function (item)  {
        if (item.seasonType == filter){
          return(sellRender(item))  
        }
        }

      ));
    } else if (priceFilters.indexOf(filter) >= 0){
      const mappedMarketItems = props.marketItems;
      if (filter == "LowToHigh"){
        const sortedMarketItems = [...mappedMarketItems].sort((item1,item2) => item1.price-item2.price);
        return (sortedMarketItems.map(function (item)  {
          return(sellRender(item))
          }
        )); 
      } else if (filter == "HighToLow"){
        const sortedMarketItems = [...mappedMarketItems].sort((item1,item2) => item2.price-item1.price);
        return (sortedMarketItems.map(function (item)  {
          return(sellRender(item))
          }
        )); 
      }
    }
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
                   
                    
                      {showBuy ? 
                        (<div className="shop-items">
                          {displayBuyItems()}
                        </div>)
                      : 
                        <SellItems />
                      }
                    
                </div>

              <div className="empty-div"></div>
              <div className="display-more"> 
                      <div className="display-more-title">More Information:</div>
                      {showBuy ? 
                        <DetailedItem item={itemSelected} setItemSelected={itemSelected} {...props} /> 
                        : <InventoryItem item={itemSelected} setItemSelected={itemSelected} {...props}/>}
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