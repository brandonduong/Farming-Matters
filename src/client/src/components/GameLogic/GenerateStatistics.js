
function statisticGenerator(){
    const randomNum = Math.random(); //0 ... 1 real number
    const minThreshold = 0.80; //going to happen
    
    //PROBABILISTIC decision
    if (props.decisionType == 0){
        return (randomNum*100).toFixed(2) + "% will happen"; //round to 2 decimal places (i.e 23.4924 => 23.49)
    }
    //DETERMINISTIC decision
    else{
        if (randomNum > 0.5){
            return "will happen";
        }else{
            return "will not happen";
        }
    }
}

function chooseRandomStatement(){
    const randomAction = chooseAction();
    const strReplacement = {"%statistic%": statisticGenerator()}

    const newDialog = props.futureGameState[randomAction];
    setBaseDialog(newDialog)
    
}

function chooseAction(){
    const actions = Object.keys(props.futureGameState);
    const randomAction = actions[Math.floor(Math.random()*action)];
    return randomAction;        
}

function generateStatement(){
    const statistic = statisticGenerator();
    const randNum = Math.round(0 + Math.random() * (consultantDialog.length - 1)); //[0 ... array.length - 1]

    //add condition to check if advice has been purchased and prevent 
    //generating new advice per season.

console.log(consultantDialog[randNum] + statistic)
return consultantDialog[randNum] + statistic;
}


