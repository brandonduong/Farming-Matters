import { gameEvents, generalDialog } from "./constants";
 

function generateRandomIndex(arr){
    return Math.floor(Math.random()*arr.length);
}

function marketStatisticGenerator(decisionType){
    //(n+3) index of market price
    // randomly choose an item from n+3 index
    // (n+3)item/nitem price
    // calculate new pEventHappening
    // if pEventHapppning < 0.65 padd with error
    // othergive (n+3)item/nitem price

    const randomIndex = Math.floor(Math.random()*Object.keys(inventoryList).length)
    const randomItem = inventoryList([Object.keys(inventoryList)[randomIndex]]);
    const futureMarketPrice = (turnPrice[i+3])[randomItem]; //i+3
    const currentMarketPrice = (turnPrice[i])[randomItem]; // i
    const percentPriceIncrease = (futureMarketPrice - currentMarketPrice)/currentMarketPrice;

    const pEventHappening = Math.random();

    if (pEventHappening < 0.15){ //Not happening
        percentPriceIncrease *= Math.random()*0.4
    }
    
    return percentPriceIncrease;
}

function seasonalStatisticGenerator(pEventHappening, decisionType){
    const baseStat = Math.random(); //0 ... 1 real number

    if (pEventHappening < 0.6){ //Not Happening
        baseStat += Math.random()*0.35 //padding to display error
    }
    
    //PROBABILISTIC decision
    if (decisionType == 0){
        return (baseStat*100).toFixed(2) + "% will happen"; //round to 2 decimal places (i.e 23.4924 => 23.49)
    }
    //DETERMINISTIC decision
    else{
        if (baseStat > 0.5){
            return "will happen";
        }else{
            return "will not happen";
        }
    }
}

function chooseRandomItem(list){
    return list[generateRandomIndex(list)]; 
}

function generateConsultantStatement(decisionType){
    const gameEventNameList= Object.keys(gameEvents);
    //const randomEventName = chooseRandomItem(gameEventNameList);
    const randomEvent = Math.random();
    
    switch(randomEvent){
        case O <= randomEvent && randomEvent <= 0.2://Seasonal
            gameEvents["Seasonal"]
            break;
        case 0.2 < randomEvent && randomEvent <= 1: //Market
            let stat = marketStatisticGenerator();
            if (decisionType == 1){
                stat = stat > 0.5 ? true : false;
            }
            const increaseOrDecrease = stat > 0.5 ? "increase" : "decrease"
            return gameEvents["Market"].replace("%statistic%", stat, "%increaseOrDecrease%", increaseOrDecrease);
    }
    
    const statistic = gameEvents(decisionType);

    //Javascript string placeholder for statistic values
    return chooseRandomItem(statistic).replace('%statistic%',statistic );
}

function generateGeneralStatement(){
    return chooseRandomItem(generalDialog);
}

export const generateStatement  = {
    generateConsultantStatement,
    generateGeneralStatement
}