import React, { useState, useEffect } from 'react';
import { shopItemsList } from '../constants';
import { getAllCropContracts } from '../../Inventory';
import { SellInfoRow } from './SellInfoRow';
import { removeItemFromCropInfo } from '../../Farm/FarmTile/FarmingHelpers';
import { removeItem } from '../../Inventory';

export const SellInfo = ({
  name,
  inventoryState,
  allTurnPrices,
  turn,
  itemSelected,
  setItemSelected,
  cropInfo,
  money,
  setMoney,
}) => {
  let insuredCrops = {};
  const crops = getAllCropContracts(inventoryState, name);

  for (let i = 0; i < crops.length; i++) {
    let crop = crops[i];
    let floorPrice = crop.floorPrice ? crop.floorPrice.toString() : 'null';

    if (floorPrice in insuredCrops) {
      insuredCrops[floorPrice] += 1;
    } else {
      insuredCrops[floorPrice] = 1;
    }
  }

  const getIsPriceIncrease = () => {
    if (name == '') {
      return;
    }
    const currentPrice = allTurnPrices[turn % allTurnPrices.length][name];
    const pastPrice = allTurnPrices[(turn - 1) % allTurnPrices.length][name];

    return currentPrice > pastPrice;
  };

  const price = allTurnPrices[turn % allTurnPrices.length][name];

  useEffect(() => {
    if (itemSelected) {
      const defaultSelectedQuantities = {};
      Object.keys(insuredCrops).forEach(
        (floorPrice) => (defaultSelectedQuantities[floorPrice] = 0),
      );
      setSelectedQuantities(defaultSelectedQuantities);
    }
  }, [itemSelected]);

  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [totalSales, setTotalSales] = useState(0);

  const { image } = shopItemsList.find((item) => item.name == name) || {};

  useEffect(() => {
    let sales = 0;
    Object.entries(selectedQuantities).forEach(([floorPrice, qty]) => {
      let intFloorPrice = floorPrice === 'null' ? price : parseInt(floorPrice);
      if (intFloorPrice < price) {
        intFloorPrice = price;
      }

      sales += intFloorPrice * qty;
    });
    setTotalSales(sales);
  }, [selectedQuantities]);

  const sell = () => {
    // Remove from inventory
    // sort by expiry and remove the first matching floorPrice

    Object.entries(selectedQuantities).forEach(([floorPrice, qty]) => {
      const parsedFloorPrice =
        floorPrice == 'null' ? null : parseInt(floorPrice);

      let crops = cropInfo[name].filter(
        ({ floorPrice: p }) => p == parsedFloorPrice,
      );
      let insuranceInfo = crops.sort((a, b) => a.cropExpiry - b.cropExpiry);

      const expiry =
        insuranceInfo.length > 0 ? insuranceInfo[0].cropExpiry : undefined;

      const itemToRemove = {
        name: name,
        type: 'crop',
        floorPrice: parsedFloorPrice,
        cropExpiry: expiry,
      };
      console.log(itemToRemove);

      for (let i = 0; i < qty; i++) {
        removeItem(inventoryState, itemToRemove);
        removeItemFromCropInfo(cropInfo, itemToRemove);
      }
    });

    // Add to balance
    setMoney(money + totalSales);

    // Reset local state
    setTotalSales(0);
    const defaultSelectedQuantities = {};
    Object.keys(insuredCrops).forEach(
      (floorPrice) => (defaultSelectedQuantities[floorPrice] = 0),
    );
    setSelectedQuantities(defaultSelectedQuantities);
  };

  return (
    <div className="detailed-item">
      {name == '' ? (
        <h2>Select an item to view more details ...</h2>
      ) : (
        <>
          <h2>{name}</h2>
          <img src={image} alt="crops" className="item-image"></img>

          <div className="details">
            <div
              className={
                'price ' +
                (turn == 1
                  ? 'turn-1'
                  : getIsPriceIncrease()
                  ? 'price-increase'
                  : 'price-decrease')
              }
            >
              Current Price: ${parseFloat(price).toFixed(2)}{' '}
              {turn == 1 ? (
                '-'
              ) : getIsPriceIncrease() ? (
                <span>&#8593;</span>
              ) : (
                <span>&#8595;</span>
              )}
            </div>
          </div>

          <table className="sell-table">
            <tr style={{ borderBottom: '1px solid black' }}>
              <th>Sell Price:</th>
              <th>Available:</th>
              <th>Amount to Sell:</th>
            </tr>
            {Object.entries(insuredCrops)
              .sort()
              .map(([floorPrice, qty]) => {
                return (
                  <SellInfoRow
                    floorPrice={floorPrice}
                    currPrice={price}
                    maxQuantity={qty}
                    selectedQuantities={selectedQuantities}
                    setSelectedQuantities={setSelectedQuantities}
                  />
                );
              })}
          </table>

          <div className="cost-summary">
            <div className="total-cost">
              Total Sales: ${totalSales.toFixed(2)}
            </div>
          </div>

          <div className="purchase">
            <button onClick={() => sell()}>Sell</button>
          </div>
        </>
      )}
    </div>
  );
};
