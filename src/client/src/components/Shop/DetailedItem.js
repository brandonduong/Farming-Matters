import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import { globalInventoryContext } from '../../Game';
import { addItem, getItemCount } from '../Inventory';
import {
  checkIfItemIsPlant,
  getItemFluctuation,
  capitalizeFirstLetter,
} from '../GameLogic/GameLogic';
import { plants } from '../Farm/FarmTile/constants';
import { logData } from '../../utils/logData';
import { quantityContent, shopItemsList } from './constants';
import { itemFluctuation } from '../GameLogic/constants';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { useInventory } from '../../contexts';

const DetailedItem = (props) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const [insuranceQuantity, setInsuranceQuantity] = useState(0);
  const [insuranceFloorPrice, setInsuranceFloorPrice] = useState(0);
  const { inventoryState, setInventoryState } = useInventory();

  const [insuranceOption, setInsuranceOption] = useState(false);
  let Normal = require('@stdlib/stats-base-dists-normal').Normal;
  const [totalItemCost, setTotalItemCost] = useState(0);
  const [totalInsuranceCost, setTotalInsuranceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemImg, setItemImg] = useState(quantityContent[1].image);
  const [itemPrice, setItemPrice] = useState(0);
  // const [itemInsuranceList, setItemInsuranceList] = useState("");
  const [isPriceIncrease, setIsPriceIncrease] = useState(false);

  const [displayModal, setDisplayModal] = useState(false);

  function displayToolTipModal(modalType) {
    const description = {
      insuranceFloorPrice:
        'The insurance floor price will enable you to set a minimum value you expect the receive for insuring an item. For example, if you bought a Tomato seed and want to sell a  harvested Tomato crop. If this tomato crop in the current market is worth less than what you expected, you should receive back the set floor price.',
      insuranceQuantity:
        'The insurance quantity represent the amount of items you have selected above (item quantity) that you would like to insure',
    };

    return (
      <div
        id="moredetails-info-tooltip"
        className="dialog-modal"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
      >
        {description[modalType]}
        <button
          type="button"
          className="close-button"
          onClick={() => setDisplayModal(false)}
        >
          x
        </button>
      </div>
    );
  }

  function determineSeason(turnNumber) {
    let season;
    if (props.turn % 3 === 0) {
      season = 'Fall';
    } else if (props.turn % 3 === 1) {
      season = 'Winter';
    } else if (props.turn % 3 === 2) {
      season = 'Spring';
    } else {
      season = 'Summer';
    }
    return season;
  }

  function findItemIndex(itemName) {
    for (let i = 0; i < shopItemsList.length; i++) {
      if (shopItemsList[i].name == itemName) {
        return i;
      }
    }
    return -1;
  }

  function priceIncreaseOrDecrease() {
    if (itemName == '') {
      return;
    }
    const currentPrice =
      props.allTurnPrices[props.turn % props.allTurnPrices.length].itemName;
    const pastPrice =
      props.allTurnPrices[(props.turn - 1) % props.allTurnPrices.length]
        .itemName;

    if (currentPrice > pastPrice) {
      setIsPriceIncrease(true);
    } else {
      setIsPriceIncrease(false);
    }
  }

  function setItemDetails() {
    if (props.item == '') {
      return;
    }
    setItemName(props.item);
    console.log('ITEM: ' + itemName);
    const currentItemIndex = shopItemsList[findItemIndex(props.item)];
    setItemType(currentItemIndex.seasonType);
    setItemImg(currentItemIndex.image);
    setItemPrice(currentItemIndex.price);
    setInsuranceFloorPrice(currentItemIndex.price);
  }
  useEffect(() => {
    setItemDetails();
    setItemQuantity(0);
    setInsuranceQuantity(0);
    priceIncreaseOrDecrease();
  }, [props.item]);

  function purchase() {
    if (totalCost <= props.money) {
      let currInventory = inventoryState;
      props.setMoney(props.money - totalCost);
      let isPlant = checkIfItemIsPlant(itemName, plants);
      for (let i = 0; i < insuranceQuantity; i++) {
        let currItem = {
          name: itemName,
          type: isPlant ? 'seed' : 'tool',
          floorPrice: insuranceFloorPrice,
        };
        addItem(currInventory, currItem);
      }
      for (let i = 0; i < itemQuantity - insuranceQuantity; i++) {
        let currItem = {
          name: itemName,
          type: isPlant ? 'seed' : 'tool',
          floorPrice: null,
        };
        addItem(currInventory, currItem);
      }
      setInventoryState(currInventory);
      setItemQuantity(0);

      setInsuranceQuantity(0);
      logData({
        actionType: 'Item Bought',
        turn: props.turn,
        season: determineSeason(props.turn),
        isExperimental: true,
        balance: props.money,
        details: { name: props.name, quantity: itemQuantity },
      });

      setItemDetails();
    } else {
      console.log('Not enough money to buy crop');
    }
    setTotalCost(0);
  }

  function currentItemTotalCost() {
    setTotalItemCost(itemPrice * itemQuantity);
  }
  useEffect(() => {
    currentItemTotalCost();
  }, [itemPrice, itemQuantity]);

  function currentInsuranceCost() {
    if (itemName == '') {
      return;
    }
    let insuranceCost = 0;
    if (insuranceFloorPrice != 0 && insuranceQuantity != 0) {
      let mean_price =
        props.allTurnPrices[props.turn % props.allTurnPrices.length][itemName];
      let sd_price = getItemFluctuation(itemName, itemFluctuation);
      const admin_fee = 0.1;
      let normDist = new Normal(mean_price, sd_price);
      let prob_payout = normDist.cdf(parseFloat(insuranceFloorPrice));
      let expected_payout =
        prob_payout * Math.abs(mean_price - insuranceFloorPrice);
      let fair_premium = expected_payout / (1.0 - admin_fee);
      insuranceCost = fair_premium * insuranceQuantity;
    }
    insuranceCost = insuranceCost > 1 || !insuranceQuantity ? insuranceCost : 1;
    setTotalInsuranceCost(insuranceCost);
  }

  function currentTotalCost() {
    setTotalCost(totalItemCost + totalInsuranceCost);
  }

  useEffect(() => {
    currentInsuranceCost();
  }, [insuranceQuantity, insuranceFloorPrice]);

  useEffect(() => {
    currentTotalCost();
  }, [currentItemTotalCost, currentInsuranceCost]);
  return (
    <div className="detailed-item" key={props.id}>
      {props.item ? (
        <>
          <h2>{capitalizeFirstLetter(props.item)}</h2>
          <img src={itemImg} alt="crops" className="item-image"></img>
          <div className="details">
            <div
              className={
                'price ' +
                (props.turn == 1
                  ? 'turn-1'
                  : isPriceIncrease
                  ? 'price-increase'
                  : 'price-decrease')
              }
            >
              Current Price: ${parseFloat(itemPrice).toFixed(2)}{' '}
              {props.turn == 1 ? (
                '-'
              ) : isPriceIncrease ? (
                <span>&#8593;</span>
              ) : (
                <span>&#8595;</span>
              )}
            </div>
          </div>

          <div className="purchase-info">
            <div className="quantity-grid">
              <label htmlFor="itemQuantity">Item Quantity: </label>
              <div className="quantity-input-grid">
                <Button
                  className="quantity-button"
                  onClick={() => {
                    itemQuantity > 0
                      ? setItemQuantity(-1 + parseInt(itemQuantity))
                      : setItemQuantity(parseInt(itemQuantity));
                  }}
                >
                  -
                </Button>
                <input
                  type="number"
                  name="itemQuantity"
                  className="quantity-input-field"
                  min="0"
                  max="5"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                ></input>
                <Button
                  className="quantity-button"
                  onClick={() => {
                    setItemQuantity(1 + parseInt(itemQuantity));
                  }}
                >
                  +
                </Button>
              </div>
            </div>

            {checkIfItemIsPlant(props.item, plants) ? (
              <>
                <div className="insurance-toggle-grid">
                  <label>Set insurance: </label>
                  <div className="toggle-button">
                    <Form.Switch
                      type="switch"
                      id="custom-switch"
                      onChange={(e) => {
                        setInsuranceOption(e.target.checked);
                      }}
                    />
                  </div>
                </div>
                {insuranceOption ? (
                  <>
                    <div className="quantity-grid">
                      <label htmlFor="itemQuantity">
                        Insurance Floor Price:
                        <button
                          id="tool-tip-button 2"
                          className="more-info-btn"
                          onClick={() => {
                            setDisplayModal(true);
                          }}
                        >
                          i
                        </button>
                        {displayModal ? (
                          displayToolTipModal('insuranceFloorPrice')
                        ) : (
                          <></>
                        )}
                      </label>

                      <div className="quantity-input-grid">
                        <Button
                          className="quantity-button"
                          onClick={() => {
                            insuranceFloorPrice > 0
                              ? setInsuranceFloorPrice(
                                  -10 + parseInt(insuranceFloorPrice),
                                )
                              : setInsuranceFloorPrice(
                                  parseInt(insuranceFloorPrice),
                                );
                          }}
                        >
                          -
                        </Button>
                        <input
                          type="number"
                          name="itemQuantity"
                          className="quantity-input-field"
                          min="0"
                          value={insuranceFloorPrice}
                          onChange={(e) =>
                            setInsuranceFloorPrice(e.target.value)
                          }
                        ></input>
                        <Button
                          className="quantity-button"
                          onClick={() => {
                            setInsuranceFloorPrice(
                              10 + parseInt(insuranceFloorPrice),
                            );
                          }}
                        >
                          {' '}
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="quantity-grid">
                      <label htmlFor="itemQuantity">
                        Insurance Quantity:
                        <button
                          id="tool-tip-button"
                          className="more-info-btn"
                          onClick={() => {
                            setDisplayModal(true);
                          }}
                        >
                          i
                        </button>
                        {displayModal ? (
                          displayToolTipModal('insuranceQuantity')
                        ) : (
                          <></>
                        )}
                      </label>
                      <div className="quantity-input-grid">
                        <Button
                          className="quantity-button"
                          onClick={() => {
                            insuranceQuantity > 0
                              ? setInsuranceQuantity(
                                  -1 + parseInt(insuranceQuantity),
                                )
                              : setInsuranceQuantity(
                                  parseInt(insuranceQuantity),
                                );
                          }}
                        >
                          {' '}
                          -
                        </Button>
                        <input
                          type="number"
                          name="itemQuantity"
                          min="0"
                          className="quantity-input-field"
                          max="5"
                          value={insuranceQuantity}
                          onChange={(e) => setInsuranceQuantity(e.target.value)}
                        ></input>
                        <Button
                          className="quantity-button"
                          onClick={() => {
                            insuranceQuantity < itemQuantity
                              ? setInsuranceQuantity(
                                  1 + parseInt(insuranceQuantity),
                                )
                              : setInsuranceQuantity(
                                  parseInt(insuranceQuantity),
                                );
                          }}
                        >
                          {' '}
                          +
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
          <br></br>
          <div className="cost-summary">
            {checkIfItemIsPlant(itemName, plants) ? (
              <>
                <div className="individual-cost">
                  Total Item Cost: ${totalItemCost.toFixed(2)}
                </div>
                <div className="individual-cost">
                  Total Insurance Cost: ${totalInsuranceCost.toFixed(2)}
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="total-cost">
              Total Cost: ${totalCost.toFixed(2)}
            </div>
            <div className="left-over-cost">
              Left Over Cost: ${(props.money - totalCost).toFixed(2)}
            </div>
          </div>

          <div className="purchase">
            <Button
              disabled={props.money < totalCost}
              onClick={() => purchase()}
            >
              Purchase
            </Button>
          </div>
        </>
      ) : (
        <h2>Select an item to view more details ...</h2>
      )}
    </div>
  );
};
export default DetailedItem;
