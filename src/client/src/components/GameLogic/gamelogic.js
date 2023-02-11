import {generateStatement} from './GenerateStatistics';



function futureSeasonalEvents(){
    //(n+3) index of market price
    // randomly choose an item from n+3 index
    // (n+3)item/nitem price
    // calculate new pEventHappening
    // if pEventHapppning < 0.65 padd with error
    // othergive (n+3)item/nitem price

    const pEventHappening = Math.random();

    if (pEventHappening < 0.65){ //Not happening
        //percentPriceIncrease *= Math.random()*0.4
    }
}


export const GameLogic = {
    generateStatement
}