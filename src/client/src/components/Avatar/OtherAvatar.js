import React, { useEffect, useRef, useState } from 'react'
import AvatarDialog from './AvatarDialog';
import {generalDialog} from '../GameLogic/constants'
import { avatarNames, avatarDescription  } from '../GameLogic/constants';

const OtherAvatar = (props) =>{
    function generateStatement(){
        const randNum =  Math.round(0 + Math.random() * (generalDialog.length - 1)); //[0 ... array.length - 1]

        //add condition to check if advice has been purchased and prevent 
        //generating new advice per season.
        console.log(generalDialog[randNum]);
        return generalDialog[randNum];
    }
    return (
        <div>
            {
                <AvatarDialog generateStatement={generateStatement} {...props}/>
            }
    </div>
    );
}
export default OtherAvatar;