import { gameEvents, generalDialog } from "./constants";

let randomItem;

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

    console.log(allTurnPrices);
    randomItem = chooseRandomItem(Object.keys(allTurnPrices[0]));
    console.log((allTurnPrices[currentTurn+3]), (allTurnPrices[currentTurn]),randomItem);
    const futureMarketPrice = (allTurnPrices[currentTurn+3])[randomItem]; //i+3
    const currentMarketPrice = (allTurnPrices[currentTurn])[randomItem]; // i
    console.log(futureMarketPrice, currentMarketPrice);
    
    let percentPriceIncrease = (futureMarketPrice - currentMarketPrice)/currentMarketPrice;

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

function generateConsultantStatement(decisionType, currentTurn, allTurnPrices, SEASONS, currentSeason){
    const gameEventNameList= Object.keys(gameEvents);
    //const randomEventName = chooseRandomItem(gameEventNameList);
    const randomEvent = Math.random();
    
    console.log(randomEvent);
 
        if (0 <= randomEvent && randomEvent <= 0.2){//Seasonal
            //gameEvents["Seasonal"]
        
        }
        if (0.2 < randomEvent && randomEvent <= 1){ //Market
            let stat = marketStatisticGenerator(currentTurn, allTurnPrices);
            if (decisionType == 1){
                stat = stat > 0.5 ? 1 : 0;
                stat = parseInt(stat)
            }

            const increaseOrDecrease = stat > 0.5 ? "increase" : "decrease";
            console.log(stat);
            let statement = gameEvents["Market"].statement;
            console.log(statement);
            if (decisionType == 0){
                statement = statement.replace("%statistic%", "by %statistic% %").replace("%statistic%", (Math.abs(stat*100).toFixed(2))); 
            }else{
                statement = statement.replace("%statistic%", "")
            }
            console.log(statement);
            statement = statement.replace( "%increaseOrDecrease%", increaseOrDecrease)
            console.log(statement);
            statement = statement.replace("%item%", randomItem);

    

            statement = statement.replace("%season%", SEASONS[(SEASONS.indexOf(currentSeason) + 1)%4]);

            return statement
    }

    
    //const statistic = gameEvents(decisionType);

    //Javascript string placeholder for statistic values
    //return chooseRandomItem(statistic).replace('%statistic%',statistic );
}

function generateGeneralStatement(){
    return chooseRandomItem(generalDialog);
}

export const generateStatement  = {
    generateConsultantStatement,
    generateGeneralStatement
}