import { gameEvents, generalDialog, EVENT_OCCUR_THRESHOLD } from "./constants";

let randomItem;

let pEventHappening; //should make global

function generateRandomIndex(arr){
    return Math.floor(Math.random()*arr.length);
}

function marketStatisticGenerator(currentTurn, allTurnPrices){
    //(n+3) index of market price
    // randomly choose an item from n+3 index
    // (n+3)item/nitem price
    // calculate new pEventHappening
    // if pEventHapppning < 0.65 padd with error
    // othergive (n+3)item/nitem price

    randomItem = chooseRandomItem(Object.keys(allTurnPrices[0]));
    const futureMarketPrice = (allTurnPrices[currentTurn+3])[randomItem]; //i+3
    const currentMarketPrice = (allTurnPrices[currentTurn])[randomItem]; // i

    let percentPriceIncrease = (futureMarketPrice - currentMarketPrice)/currentMarketPrice;

    const pEventHappening = Math.random();

    if (pEventHappening < EVENT_OCCUR_THRESHOLD){ //Not happening
        percentPriceIncrease *= Math.random()*0.4
    }
    
    return percentPriceIncrease;
}
 

function chooseRandomItem(list){

    return list[generateRandomIndex(list)];
}

function getNextSeason(SEASONS, currentSeason){

    return SEASONS[(SEASONS.indexOf(currentSeason) + 1)%4];
}

function replaceIncreaseOrDecreaseInsert(stat){

    return  stat > 0.5 ? "increase" : "decrease";
}

function happenOrNotHappen(stat){
    return stat > 0.5 ? "happen" : "not happen";
}

function replaceStatisticInsert(stat,decisionType, statement, eventType){
    console.log(stat);
    if (eventType == "Market"){
        if (decisionType == 0){
            statement = statement.replace("%statistic%", "by %statistic% %").replace("%statistic%", (Math.abs(stat*100).toFixed(2))); 
        }else{
            statement = statement.replace("%statistic%", "");
        }
    }else if (eventType == "Seasonal"){
        if (decisionType == 0){
            statement = statement.replace("%statistic%", "by %statistic% %").replace("%statistic%", (Math.abs(stat*100).toFixed(2))); 
        }else{
            statement = statement.replace("%statistic%", happenOrNotHappen(stat));
        }
    }

    return statement;
}

function setDeterministicStat(stat){
    console.log(stat);
    return stat > 0.5 ? 1 : 0;
}

function marketEventStatementInserts(decisionType, currentTurn, allTurnPrices, SEASONS, currentSeason){
    let stat = marketStatisticGenerator(currentTurn, allTurnPrices);
    if (decisionType == 1){
        stat = setDeterministicStat(stat);
    }
    
    const increaseOrDecrease = replaceIncreaseOrDecreaseInsert(stat);
    let statement = gameEvents["Market"].statement;

    statement = replaceStatisticInsert(stat, decisionType, statement);
    statement = statement.replace( "%increaseOrDecrease%", increaseOrDecrease);
    statement = statement.replace("%item%", randomItem);
    statement = statement.replace("%season%", getNextSeason(SEASONS, currentSeason));
    return statement;
}

function seasonalEventStatementInserts(decisionType, currentTurn, allTurnPrices, SEASONS, currentSeason, eventType){
    const nextSeason = getNextSeason(SEASONS, currentSeason);
    console.log( gameEvents["Season"], nextSeason);
    const randomEvent = chooseRandomItem( Object.keys((gameEvents["Season"])[nextSeason]));
    let statement =(((gameEvents["Season"])[nextSeason])[randomEvent])["statement"]; 

    const SEASONAL_PROB_PADDING = 0.05;
    let stat = Math.random(); 
    if (decisionType == 1){
        stat = setDeterministicStat(stat);
    }

    statement = replaceStatisticInsert(stat, decisionType, statement, eventType);
    statement = statement.replace("%season%", getNextSeason(SEASONS, currentSeason));
    
    pEventHappening = stat;
    return statement;
}

function generateConsultantStatement(decisionType, currentTurn, allTurnPrices, SEASONS, currentSeason){

    const randomEvent = Math.random();
    let statement;
    
    console.log(randomEvent);
    
    if (true){//Seasonal
        statement = seasonalEventStatementInserts(decisionType, currentTurn, allTurnPrices, SEASONS, currentSeason, "Seasonal");
    }
    else if (0.2 < randomEvent && randomEvent <= 1){ //Market
        statement = marketEventStatementInserts(decisionType, currentTurn, allTurnPrices, SEASONS, currentSeason, "Market");
    }
    
    return statement
}

function generateGeneralStatement(){
    return chooseRandomItem(generalDialog);
}

export const generateStatement  = {
    generateConsultantStatement,
    generateGeneralStatement
}