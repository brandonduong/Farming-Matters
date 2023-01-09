import React, { useState } from "react";

const Item = (props) => {
  const name = props.itemName;
  const [price, setPrice] = useState(props.itemPrice);
  const type = props.itemType;

  function getItemName(){
    return (name);
  }

  function getItemPrice(){
    return (price);
  }


  return (
    <div className="inventory-item" key={props.id}>
        <img src={props.image} alt="item-pic" className="item-image"></img>
        <p className="itemName">Item: {props.name}</p>
    </div>
  );
};

export default Item;
