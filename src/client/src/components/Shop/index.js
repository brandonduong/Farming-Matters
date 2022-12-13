import React from "react";
import { useState } from "react";
import ShopItem from "./ShopItem";
import { shopItemsList } from "./constants";

const Shop = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  let displayShop = () => {
    setShowMenu(!showMenu);
  };
  
  return (
    <>
      {showMenu ? (
        <>
          <button type="button" className="shop-button" onClick={displayShop}>
            Close
          </button>
          <div className="shop">
            <div className="shop-component">
              <p className="center shop-heading">Shop</p>
              <div className="shop-items">
                {shopItemsList.map((item) => (
                  <ShopItem
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    money={props.money}
                    setMoney={props.setMoney}
                  ></ShopItem>
                ))}
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
