import React from "react";
import { useState } from "react";
import ShopItem from "./ShopItem";

const Shop = () => {
  const [showMenu, setShowMenu] = useState(false);

  let displayShop = () => {
    setShowMenu(!showMenu);
  };
  //   items
  const shop_items_list = [
    {
      id: 1,
      name: "Corn",
      price: 100,
      // from https://www.flaticon.com/free-icons/corn
      image: require("../assets/corn.png"),
    },
    {
      id: 2,
      name: "Mushroom",
      price: 200,
      // from https://www.flaticon.com/free-icons/mushroom
      image: require("../assets/mushroom.png"),
    },
    {
      id: 3,
      name: "Lavender",
      price: 150,
      // from https://www.flaticon.com/free-icons/flower
      image: require("../assets/lavender.png"),
    },
    {
      id: 4,
      name: "Bamboo",
      price: 150,
      // from https://www.flaticon.com/free-icons/bamboo
      image: require("../assets/bamboo.png"),
    },
    {
      id: 5,
      name: "Wheat",
      price: 125,
      // from https://www.flaticon.com/free-icons/rice
      image: require("../assets/wheat.png"),
    },
    {
      id: 6,
      name: "Potato",
      price: 175,
      // from https://www.flaticon.com/free-icons/potato
      image: require("../assets/potato.png"),
    },
  ];
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
                {shop_items_list.map((item) => (
                  <ShopItem
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
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
