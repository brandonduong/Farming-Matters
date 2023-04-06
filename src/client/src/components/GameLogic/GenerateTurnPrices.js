function generateNTurnItemPrices(itemPrice, fluctuationFactor, noTurns) {
  const PD = require('probability-distributions');
  let itemPrices = PD.rnorm(noTurns, itemPrice, fluctuationFactor);
  return itemPrices;
}

export function generateNTurnPriceState(
  totalTurns,
  priceFluctuations,
  marketItems,
) {
  let nTurnItemPrices = [];
  for (let k = 0; k < totalTurns; k++) {
    nTurnItemPrices[k] = {};
  }
  for (let i = 0; i < priceFluctuations.length; i++) {
    const currentItemName = priceFluctuations[i].name;
    const currentFluctuationFactor = priceFluctuations[i].fluctuationFactor;
    const basePrices = marketItems[i].price;
    const currentItemPrices = generateNTurnItemPrices(
      basePrices,
      currentFluctuationFactor,
      totalTurns,
    );
    for (let j = 0; j < totalTurns; j++) {
      // nTurnItemPrices[j] is the dictionary for turn j
      nTurnItemPrices[j][currentItemName] = currentItemPrices[j];
    }
  }
  return nTurnItemPrices;
}
