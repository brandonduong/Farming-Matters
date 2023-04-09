import React from 'react';
import { shopItemsList } from '../constants';
import { globalInventoryContext } from '../../../Game';
import { SellTile } from './SellTile';
import { getCrops } from '../../Inventory';

export const SellItems = ({
  setItemSelected,
  allTurnPrices,
  turn,
  inventoryState,
}) => {
  // 1. Get all crop names in inventory (get all unique occurences of item.name for item in inventoryState)
  const cropNames = getCrops(inventoryState);

  return (
    <>
      {cropNames ? (
        cropNames.map((name, i) => (
          <SellTile
            key={i}
            name={name}
            setItemSelected={setItemSelected}
            price={allTurnPrices[turn % allTurnPrices.length][name]}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};
