import React, { useState } from "react";

const ShopItem = (props) => {
  const [quantity, setQuantity] = useState(0);
  function buy() {
    if (quantity * props.price <= props.money) {
      props.setMoney(props.money - quantity * props.price);
      setQuantity(0);
    } else {
      console.log("Not enough money to buy crop");
    }
  }

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
        min="1"
        max="5"
        style={{ width: "15%", margin: "0px 2%" }}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      ></input>
      <button onClick={() => buy()}>Buy</button>
    </div>
  );
};

export default ShopItem;
