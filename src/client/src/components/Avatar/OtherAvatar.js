import React, { useEffect, useRef, useState } from 'react'
import AvatarDialog from './AvatarDialog';
import {generalDialog} from './constants'
import { globalAvatarContext } from './AvatarMenu';
import { avatarNames, avatarDescription  } from './constants';
const OtherAvatar = (props) =>{
    // const [name, setName] = useState(props.getName);
    // const [role, setRole] = useState(props.getRole)
    // const [description, setDescription] = useState(props.getDescription);
    // const [img, setImg] = useState(props.getImg);
    // const [avatarType, setType] = useState(props.getAvatarType);
    // const [statement, setStatement] = useState(props.getStatement);

    const { avatarState, setAvatarState } = React.useContext(globalAvatarContext);


    

    function generateStatement(){
        const randNum =  Math.round(0 + Math.random() * (generalDialog.length - 1)); //[0 ... array.length - 1]

        //add condition to check if advice has been purchased and prevent 
        //generating new advice per season.
        console.log(generalDialog[randNum]);
        return generalDialog[randNum]
    
    }
    
    const avatarID = props.avatarID;
    useEffect( () => {
        setAvatarState({
            avatarID: avatarID,
            name: avatarNames[avatarID][0],
            role: avatarNames[avatarID][1],
            description: avatarDescription[avatarID],
            type: 2,
            statement: generateStatement(),
        })
    }, []);
    
    return (
        <div>
            {
                <AvatarDialog onExit={props.onExit}/>
                                
               
            }
    </div>
    );
}

export default OtherAvatar;