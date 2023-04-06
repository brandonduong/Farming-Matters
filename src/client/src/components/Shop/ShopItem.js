import React, { useState } from 'react';
import { globalInventoryContext } from '../../Game';
import { addItem, getItemCount } from '../Inventory';
import { checkIfItemIsPlant } from '../GameLogic/GameLogic';
import { plants } from '../Farm/FarmTile/constants';
import { logData } from '../../utils/logData';
import { seasonIconMapping } from '../GameLogic/constants';

const ShopItem = (props) => {
  return (
    <div
      className="shop-item "
      key={props.id}
      onClick={() => {
        props.setItemSelected(props.name);
      }}
    >
      <div className="season-display">
        <img
          className="season-icon-display"
          src={seasonIconMapping[props.seasonType]}
        ></img>
      </div>
      <div
        className={
          (props.seasonType != '' ? props.seasonType.toLowerCase() : 'other') +
          '-item'
        }
      >
        <img src={props.image} alt="crops" className="item-image"></img>
        <div className="shop-item-name">
          {props.name + ' - $' + parseFloat(props.price).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
