import {GenerateStatistics} from './GenerateStatistics';

export const GameLogic = {
    GenerateStatistics
}

function generateNTurnItemPrices(itemPrice,fluctuationFactor,noTurns){
    const PD = require("probability-distributions");
    let itemPrices = PD.rnorm(noTurns, itemPrice, fluctuationFactor);
    return itemPrices;
}

export function generateNTurnPriceState(totalTurns,priceFluctuations,marketItems){
    let nTurnItemPrices = []
    for (let k = 0; k < totalTurns; k++){
      nTurnItemPrices[k] = {};
    }
    for (let i = 0; i < priceFluctuations.length; i++){
      const currentItemName = priceFluctuations[i].name;
      const currentFluctuationFactor = priceFluctuations[i].fluctuationFactor;
      const basePrices = marketItems[i].price;
      const currentItemPrices = generateNTurnItemPrices(basePrices,currentFluctuationFactor,totalTurns);
      for (let j = 0; j < totalTurns; j++){
          // nTurnItemPrices[j] is the dictionary for turn j
          (nTurnItemPrices[j])[currentItemName]=currentItemPrices[j];
      }
    }
    return nTurnItemPrices;
}
export function getItemBasePrice(name,items){
    let basePrice = 0;
    for (let i = 0; i < items.length; i++){
      if (items[i].name == name){
        return basePrice = items[i].price;
      }
    }
  }

export function checkIfItemIsPlant(name, plants){
  for (let i = 0; i < plants.length; i++){
    if (plants[i].name == name){
      return true;
    }
  }
  return false;
}