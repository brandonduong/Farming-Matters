import React, {useState} from 'react'
import AvatarDialog from './AvatarDialog';
import {consultantDialog} from './constants'
import { useEffect } from 'react';

const Consultant = (props) =>{
    const defaultPrice = 150; //$150
    let [consultantPrice, setConsultantPrice] = useState(defaultPrice);
    let [hasAccessTo, setAccessTo] = useState(false);
    
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

    function hasAccessToConsultant(){
         return hasAccessTo;
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
        setAccessTo(true);
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
            { this.hasAccessToConsultant() ? 
                <AvatarDialog generateStatement={generateStatement} {...props}/>

                :
                <div></div>
            }
    </div>
    );
}
export default Consultant;