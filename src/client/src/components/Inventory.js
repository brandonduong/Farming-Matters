import "../css/Inventory.css";
import React, { useState } from "react";

function Inventory() { 
  let [isInventoryOpen, setIsInventoryOpen] = useState(false);
  function onClick() {
    setIsInventoryOpen(!isInventoryOpen);
  }
  return (
    <>
      {isInventoryOpen ? (
        <div className="inventory">
          <div className="inventory-box">
            <p id="inventory-title" className="center">
              Inventory
            </p>
            <div className="grid">
              <div className="item">
                <img src={require("../assets/mushroom.png")} alt="mushroom" />
                <div className="item-info">
                  <h4 className="quantity-title">Quantity:</h4>
                  <p className="quantity">0</p>
                </div>
              </div>
              <div className="item">
                <img src={require("../assets/wheat.png")} alt="wheat" />
                <div className="item-info">
                  <h4 className="quantity-title">Quantity:</h4>
                  <p className="quantity">0</p>
                </div>
              </div>
              <div className="item">
                <img src={require("../assets/potato.png")} alt="potato" />
                <div className="item-info">
                  <h4 className="quantity-title">Quantity:</h4>
                  <p className="quantity">0</p>
                </div>
              </div>
              <div className="item">
                <img src={require("../assets/bamboo.png")} alt="bamboo" />
                <div className="item-info">
                  <h4 className="quantity-title">Quantity:</h4>
                  <p className="quantity">0</p>
                </div>
              </div>
              <div className="item">
                <img src={require("../assets/lavender.png")} alt="lavendar" />
                <div className="item-info">
                  <h4 className="quantity-title">Quantity:</h4>
                  <p className="quantity">0</p>
                </div>
              </div>
              <div className="item">
                <img src={require("../assets/corn.png")} alt="corn" />
                <div className="item-info">
                  <h4 className="quantity-title">Quantity:</h4>
                  <p className="quantity">0</p>
                </div>
              </div>
            </div>
          </div>

          <button className="inventory-button" onClick={() => onClick()}>
            Close
          </button>
        </div>
      ) : (
        <button className="inventory-button" onClick={() => onClick()}>
          Inventory
        </button>
      )}
    </>
  );
}

export default Inventory;
