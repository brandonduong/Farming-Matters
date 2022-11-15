import React from "react";

const ShopItem = ({ id, img, name, price }) => {
  return (
    <div className="shop-item" key={id}>
      <img src={img} alt="crops" className="item-image" key={id + 10}></img>
      <p style={{ color: "white", margin: "5px" }}>{name + " - $" + price}</p>
      <label htmlFor="quantity" style={{ color: "white" }}>
        Quantity:
      </label>
      <input
        type="number"
        name="quantity"
        defaultValue="1"
        min="1"
        max="5"
        style={{ width: "15%", margin: "0px 2%" }}
      ></input>
      <button>Buy</button>
    </div>
  );
};

export default ShopItem;
