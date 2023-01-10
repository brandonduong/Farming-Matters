import "../css/Inventory.css";
import React, { useState } from "react";

//TODO: This component will need to be completely reworked once the react state is set up to dynamically show inventory contents
function Inventory() {
  let [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const { inventory } = React.useContext(globalInventoryContext);
  for (i = 0; i < plants.length; i++){
    inventory[plants[i]] = 0;
  }
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
                {/* <img src={require("../assets/CropIcons/mushroom.png")} alt="mushroom" /> */}
                <div className="item-info">
                  <h4 className="quantity-title">Quantity:</h4>
                  <p className="quantity">0</p>
                </div>
              </div>
              <div className="item">
                {/* <img src={require("../assets/CropIcons/wheat.png")} alt="wheat" /> */}
                <div className="item-info">
                  <h4 className="quantity-title">Quantity:</h4>
                  <p className="quantity">0</p>
                </div>
              </div>
              <div className="item">
                {/* <img src={require("../assets/CropIcons/potato.png")} alt="potato" /> */}
                <div className="item-info">
                  <h4 className="quantity-title">Quantity:</h4>
                  <p className="quantity">0</p>
                </div>
              </div>
              <div className="item">
                {/* <img src={require("../assets/CropIcons/bamboo.png")} alt="bamboo" /> */}
                <div className="item-info">
                  <h4 className="quantity-title">Quantity:</h4>
                  <p className="quantity">0</p>
                </div>
              </div>
              <div className="item">
                {/* <img src={require("../assets/CropIcons/lavender.png")} alt="lavendar" /> */}
                <div className="item-info">
                  <h4 className="quantity-title">Quantity:</h4>
                  <p className="quantity">0</p>
                </div>
              </div>
              <div className="item">
                {/* <img src={require("../assets/CropIcons/corn.png")} alt="corn" /> */}
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
