import { gameEvents, generalDialog, EVENT_OCCUR_THRESHOLD } from './constants';
import { capitalizeFirstLetter, checkIfItemIsPlant } from './GameLogic';
import { plants } from '../Farm/FarmTile/constants';
let randomItem;

let pEventHappening; //should make global

let isEventHappening = false;

let generatedForCurrentSeason = false;

let typeOfEvent = '';

function generateRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function generateEventHappening() {
  const pEventHappening = Math.random();

  if (pEventHappening < EVENT_OCCUR_THRESHOLD) {
    //Not happening
    isEventHappening = true;
  }

  generatedForCurrentSeason = true;
  return pEventHappening;
}

function getEventHappening() {
  isEventHappening = generateEventHappening();
  return isEventHappening;
}

function marketStatisticGenerator(currentTurn, allTurnPrices) {
  //(n+3) index of market price
  // randomly choose an item from n+3 index
  // (n+3)item/nitem price
  // calculate new pEventHappening
  // if pEventHapppning < 0.65 padd with error
  // othergive (n+3)item/nitem price

  randomItem = chooseRandomItem(Object.keys(allTurnPrices[0]));
  while (!checkIfItemIsPlant(randomItem, plants)) {
    randomItem = chooseRandomItem(Object.keys(allTurnPrices[0]));
  }
  const arrLength = allTurnPrices.length;
  const futureMarketPrice =
    allTurnPrices[(currentTurn + 3) % arrLength][randomItem]; //i+3
  const currentMarketPrice = allTurnPrices[currentTurn % arrLength][randomItem]; // i

  let percentPriceIncrease =
    (futureMarketPrice - currentMarketPrice) / currentMarketPrice;
  percentPriceIncrease = generateEventHappening() * 0.4; //additional prob padding

  return percentPriceIncrease;
}

function chooseRandomItem(list) {
  return list[generateRandomIndex(list)];
}

function getNextSeason(SEASONS, currentSeason) {
  return SEASONS[(SEASONS.indexOf(currentSeason) + 1) % 4];
}

function replaceIncreaseOrDecreaseInsert(stat) {
  return stat > 0.5 ? 'increase' : 'decrease';
}

function happenOrNotHappen(stat) {
  return stat > 0.5 ? 'happen' : 'not happen';
}

function replaceStatisticInsert(stat, decisionType, statement, eventType) {
  console.log(stat);
  if (eventType == 'Market') {
    if (decisionType == 0) {
      statement = statement
        .replace('%statistic%', 'with a  %statistic%% chance')
        .replace('%statistic%', Math.abs(stat * 100).toFixed(2));
    } else {
      statement = statement.replace('%statistic%', '');
    }
  } else if (eventType == 'Season') {
    if (decisionType == 0) {
      statement = statement
        .replace('%statistic%', 'happen with a  %statistic% %')
        .replace('%statistic%', Math.abs(stat * 100).toFixed(2));
      statement = statement + ' chance';
    } else {
      statement = statement.replace('%statistic%', happenOrNotHappen(stat));
    }
  } else {
    console.log('EMPTY EVENTTYPE');
  }

  return statement;
}

function setDeterministicStat(stat) {
  console.log(stat);
  return stat > 0.5 ? 1 : 0;
}

function getEventType() {
  return typeOfEvent;
}

function marketEventStatementInserts(
  decisionType,
  currentTurn,
  allTurnPrices,
  SEASONS,
  currentSeason,
  eventType,
) {
  let stat = marketStatisticGenerator(currentTurn, allTurnPrices);
  typeOfEvent = eventType;
  if (decisionType == 1) {
    stat = setDeterministicStat(stat);
  }

  const increaseOrDecrease = replaceIncreaseOrDecreaseInsert(stat);
  let statement = gameEvents['Market'].statement;

  statement = replaceStatisticInsert(stat, decisionType, statement, eventType);
  statement = statement.replace('%increaseOrDecrease%', increaseOrDecrease);
  statement = statement.replace('%item%', capitalizeFirstLetter(randomItem));
  statement = statement.replace(
    '%season%',
    getNextSeason(SEASONS, currentSeason),
  );
  return statement;
}

function seasonalEventStatementInserts(
  decisionType,
  currentTurn,
  allTurnPrices,
  SEASONS,
  currentSeason,
  eventType,
) {
  const nextSeason = getNextSeason(SEASONS, currentSeason);
  console.log(gameEvents['Season'], nextSeason);
  const randomEvent = chooseRandomItem(
    Object.keys(gameEvents['Season'][nextSeason]),
  );
  console.log(randomEvent);
  typeOfEvent = randomEvent;
  let statement = gameEvents['Season'][nextSeason][randomEvent]['statement'];

  const SEASONAL_PROB_PADDING = 0.05;
  let stat = Math.random();
  if (decisionType == 1) {
    stat = setDeterministicStat(stat);
  }

  statement = replaceStatisticInsert(stat, decisionType, statement, eventType);
  statement = statement.replace(
    '%season%',
    getNextSeason(SEASONS, currentSeason),
  );

  generateEventHappening();
  return statement;
}

function generateConsultantStatement(
  decisionType,
  currentTurn,
  allTurnPrices,
  SEASONS,
  currentSeason,
) {
  isEventHappening = false;
  const randomEvent = Math.random();
  let statement;

  console.log(decisionType);

  if (0 <= randomEvent && randomEvent <= 0.2) {
    //Seasonal
    statement = seasonalEventStatementInserts(
      decisionType,
      currentTurn,
      allTurnPrices,
      SEASONS,
      currentSeason,
      'Season',
    );
  } else if (0.2 < randomEvent && randomEvent <= 1) {
    //Market
    statement = marketEventStatementInserts(
      decisionType,
      currentTurn,
      allTurnPrices,
      SEASONS,
      currentSeason,
      'Market',
    );
  }

  return statement;
}

function generateGeneralStatement() {
  return chooseRandomItem(generalDialog);
}

export const GenerateStatistics = {
  generateConsultantStatement,
  generateGeneralStatement,
  getEventHappening,
  getEventType,
};
