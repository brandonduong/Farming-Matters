import React, {useState} from 'react'
import AvatarDialog from './AvatarDialog';
import {consultantDialog} from './constants'
import { useEffect } from 'react';

const Consultant = (props) =>{
    const defaultPrice = 150; //$150
    const [consultantPrice, setConsultantPrice] = useState(defaultPrice);
    let consultantAccess = props.accessToConsultant;
    
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

    //console.log(props.gridTiles);
    for (let i = 0; i < props.plantedSeeds.length; i++){
        let currentTile = props.plantedSeeds[i];
        if (currentTile.getPlantedSeed > 0){
            console.log(currentTile[i]);
        }
    }

    function getAccessToConsultant(){
         return consultantAccess;
    }

    function canPurchaseConsultant(){
        if (props.money < consultantPrice){
            return false;
        }
        return true;
    }

    function purchaseConsultant(){
        if (!canPurchaseConsultant()){
            return;
        }
        const currentMoney = props.money;
        props.setMoney(currentMoney - consultantPrice);
        props.setAccessToConsultant(true);
        //console.log("PURCHASED CONSULTANT");
        //console.log("ACCESS TO CONSULTANT = "+props.accessToConsultant);
    }
    
    function generateStatement(){
        const statistic = statisticGenerator();
        const randNum = Math.round(0 + Math.random() * (consultantDialog.length - 1)); //[0 ... array.length - 1]

        //add condition to check if advice has been purchased and prevent 
        //generating new advice per season.
     
       console.log(consultantDialog[randNum] + statistic)
       return consultantDialog[randNum] + statistic;
    }

    return (
        <div>
            {
                <AvatarDialog   isConsultant={true}
                                getAccessToConsultant={getAccessToConsultant} 
                                purchaseConsultant={purchaseConsultant} 
                                canPurchaseConsultant={canPurchaseConsultant} 
                                generateStatement={generateStatement} 
                                consultantPrice={consultantPrice} 
                                {...props}
                />
            }
    </div>
    );
}
export default Consultant;