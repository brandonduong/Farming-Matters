import React from "react";

const ShopItem = (props) => {
  return (
    <div className="shop-item" key={props.id}>
      <img src={props.image} alt="crops" className="item-image"></img>
      <p style={{ color: "white", margin: "5px" }}>
        {props.name + " - $" + props.price}
      </p>
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
