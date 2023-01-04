import React, {useRef, useEffect} from 'react'


//TODO:
// - Add DETERMINISTIC or PROBABILISTIC RANDOMNESS
// - Make separate txt files or javascript files to these descriptions elsewhere (making avatarNames and avatarDescrption into objects)
// - Add placeholders for string to add in DETERMINISTIC or PROBABILISTIC values
// - Make dialog hidden so players can click tiles in the middle of the board
// - Add button to close dialog window
// - Blur out background
// - Add a state variable to the consultant dialog to only generate a new number if the current round has changed

function ConsultantDialog(props) {
    // Names of each avatar/character
    const avatarNames = [
        ["Jerry", "the Consultant"],
        ["Bob", "the tools smith"],
        ["Alice", "the weather woman"]
    ];

    // Description entries corresponds to the entries in the avatar names to describe the role of each avatar
    const avatarDescription = [
        "Hello there local farmer, I am a consultant and here to provide you with information regarding anything relating to the farm",
        "Hey there neighbour, I am a local tools smith if you needed any tools I can provide with to you. Just give me a call anytime you need a tool", 
        "Howdy farmer, I am a local weather woman. Here to provide any updates about current weather for today!"
    ];

   
    const randomDialog = [
        "Today is a beautiful day!",
        "How are your crops going?", 
        "I got a big shipment of equipment coming in, hope they are worth the price!",
    ];

    // Return the statistic value that is dependent on which type decision are prompted to the user
    // decisionType = 0 = Probablistic decision (% chance)
    // decisionType = 1 = Determinisitic decision (yes or no, will or will not happen, etc.)
    function statisticGenerator(){
        const randomNum = Math.random(); //0 ... 1 real number
        const minThreshold = 0.80; //going to happen
        
        console.log(props);
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


    const statistic = statisticGenerator();

    const consultantDialog = [
        `The weather is looking rough this season, it is said that ${statistic}`,
        `The market value of said crop is to drop by  ${statistic}`,
        `The market value of said crop is to increase by ${statistic}`
     ];

     // Return an array of names for all avatars/characters
    function getNames(){
        let names = [];
        for (let i = 0;i < avatarNames.length; i ++){
            names.push(avatarNames[i][0]);
        }
    }

  
    const randNum = (array)=> Math.round(0 + Math.random() * (array.length - 1)); //[0 ... array.length - 1]
    //console.log(randNum);
       return (
           <div className="dialog">
               <div className={"avatar avatar-" + props.avatar}> </div>
               <h1> { avatarNames[props.avatar][0] +" "+ avatarNames[props.avatar][1] } </h1> 
               <h2> { avatarDescription[props.avatar] } </h2>
               <p>
                   {props.avatar == 0 ? 

                   consultantDialog[randNum(consultantDialog)] :
                   
                   randomDialog[randNum(randomDialog)] 
                   }
                </p>
               
               <button onClick={props.handler}>Close</button>
                    
              
        </div>
    )
}
export default ConsultantDialog; 
