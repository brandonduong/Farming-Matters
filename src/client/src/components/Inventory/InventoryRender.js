import '../../css/Inventory.css';
import React, { useState } from 'react';
import {
  getItemCount,
  getItems,
  getSeedCount,
  getCropCount,
} from '../Inventory';
import { globalInventoryContext, marketItems } from '../../Game';
import { capitalizeFirstLetter, getImage } from '../GameLogic/GameLogic';
import { logData } from '../../utils/logData';
import { checkIfItemIsPlant } from '../GameLogic/GameLogic';
import { plants } from '../Farm/FarmTile/constants';
import { shopItemsList, quantityContent } from '../Shop/constants';
import InventoryItem from './InventoryItem';
import { useInventory } from '../../contexts';
import { seasonIconMapping } from '../GameLogic/constants';
//TODO: This component will need to be completely reworked once the react state is set up to dynamically show inventory contents
const InventoryRender = (props) => {
  let [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const { inventoryState } = useInventory();
  const [itemSelected, setItemSelected] = useState('');
  let currInventory = [];

  function onClick() {
    setIsInventoryOpen(!isInventoryOpen);
    setItemSelected('');
    if (isInventoryOpen) {
      const items = getItems(inventoryState);
      for (let i = 0; i < items.length; i++) {
        if (checkIfItemIsPlant(items[i], plants)) {
          let seedCount = getSeedCount(inventoryState, items[i]);
          let cropCount = getCropCount(inventoryState, items[i]);
          if (seedCount > 0 || cropCount > 0) {
            const plant = items[i];
            let pItem = { plant: { seed: seedCount, crop: cropCount } };
            currInventory.push(pItem);
          }
        } else {
          let itemCount = getItemCount(inventoryState, items[i]);
          if (itemCount > 0) {
            const itemName = items[i];
            let cItem = { itemName: itemCount };
            currInventory.push(cItem);
          }
        }
      }
      logData('Inventory count', {
        turn: props.turn,
        inventory: currInventory,
      });
    }
  }
  let currentItemRender = [];
  let itemList = getItems(inventoryState);
  for (let i = 0; i < itemList.length; i++) {
    let img = getImage(itemList[i], shopItemsList);
    const { seasonType } = shopItemsList.find(
      (item) => item.name == itemList[i],
    );

    // if plant: one picture, seed count and crop count, else just quantity
    let isPlant = checkIfItemIsPlant(itemList[i], plants);
    currentItemRender.push(
      <div
        className="item"
        onClick={() => {
          setItemSelected(itemList[i]);
        }}
      >
        <div
          className={
            'item-info ' +
            (seasonType != '' ? seasonType.toLowerCase() : 'other') +
            '-item'
          }
        >
          <div className="season-display">
            <img
              className="season-icon-display"
              src={seasonIconMapping[seasonType]}
            ></img>
          </div>
          <img className="item-image" src={img} alt="Item-Pic"></img>

          <h4>{capitalizeFirstLetter(itemList[i])}</h4>
          <div className="quantity-info">
            {isPlant ? (
              <>
                <div className="quant-grid">
                  <h4 className="quantity-title">Quantity:</h4>
                  <div className="quantity-info-grid">
                    <div className="quantity-info-item">
                      <img
                        className="count-pics"
                        src={quantityContent[0].image}
                        alt="Item-Pic"
                      ></img>
                      <p className="seed quantity">
                        {getSeedCount(inventoryState, itemList[i])}
                      </p>
                    </div>
                    <div className="quantity-info-item">
                      <img
                        className="count-pics"
                        src={quantityContent[1].image}
                        alt="Item-Pic"
                      ></img>
                      <p className="crop quantity">
                        {getCropCount(inventoryState, itemList[i])}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="">
                <h4 className="quantity-title">Quantity:</h4>
                <p className="seed quantity">
                  {getItemCount(inventoryState, itemList[i])}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>,
    );
  }

  return (
    <>
      {isInventoryOpen ? (
        <div>
          <div className="inventory">
            <div className="all-inventory-grid">
              <button
                id="inventory-close-button"
                className="close-button"
                onClick={() => onClick()}
              >
                x
              </button>
              <div className="inventory-title-label">Inventory</div>

              <div className="inventory-grid">
                <div className="empty"></div>

                <div className="inventory-box">
                  {itemList.length > 0 ? (
                    <div className="grid">{currentItemRender}</div>
                  ) : (
                    <div className="no-harvested-crops">
                      No harvested crops in your inventory!
                    </div>
                  )}
                </div>
                <div className="empty"></div>
                <div className="display-more-inventory">
                  <h1>More Information:</h1>
                  <InventoryItem item={itemSelected} {...props} />
                </div>
                <div className="empty"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button className="inventory-button" onClick={() => onClick()}>
          Inventory
        </button>
      )}
    </>
  );
};

export default InventoryRender;
