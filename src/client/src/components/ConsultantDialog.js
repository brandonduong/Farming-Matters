import React from 'react'


//TODO:
// - Add DETERMINISTIC or PROBABILISTIC RANDOMNESS
// - Make separate txt files or javascript files to these descriptions elsewhere
// - Add placeholders for string to add in DETERMINISTIC or PROBABILISTIC values
// - Make dialog hidden so players can click tiles in the middle of the board
// - Add button to close dialog window
// - Blur out background
function ConsultantDialog(props) {
    const avatarNames = [
        ["Jerry", "the Consultant"],
        ["Bob", "the tools smith"]
    ];
    const avatarDescription = [
        "Hello there local farmer, I am a consultant and here to provide you with information regarding anything relating to the farm",

        "Hey there neighbour, I am a local tools smith if you needed any tools I can provide with to you. Just give me a call anytime you need a tool" 
    ];

   
    const randomDialog = [
        "What a good day today huh?",
        "RANDOM 2", 
        "RANDOM 3",
    ];

    function statisticGenerator(){
        const randomNum = Math.random(); //0 ... 1 real number
        const minThreshold = 0.80; //going to happen
        
        console.log(props);
        //PROBABILISTIC decision
        if (props.decisionType == 0){
            return (randomNum*100).toFixed(2); //round to 2 decimal places (i.e 23.4924 => 23.49)
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
        `The weather is looking rough this season, it is said that ${props.decisionType == 0 ? statistic + "% will happen": statistic }`,
        `The market value of said crop is to drop by  ${ props.decisionType == 0 ? statistic + "% will happen": statistic}`,
        `The market value of said crop is to increase by ${props.decisionType == 0 ? (statistic + "% will happen") : statistic}`
     ];

    function getNames(){
        let names = [];
        for (let i = 0;i < avatarNames.length; i ++){
            names.push(avatarNames[i][0]);
        }
    }

       return (
           <div className="dialog">
               <div className={"avatar avatar-" + props.avatar}> </div>
               <h1> {avatarNames[props.avatar][0] +" "+ avatarNames[props.avatar][1]} </h1> 
               <h2> {avatarDescription[props.avatar]} </h2>
               <p>
                   {props.avatar == 0 ? 

                   consultantDialog[Math.round(0 + Math.random() * consultantDialog.length - 1)] :
                   
                   randomDialog[Math.round(0 + Math.random() * randomDialog.length - 1)] 
                   }
                </p>
               
                    
              
        </div>
    )
}
export default ConsultantDialog; 
