import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Consultant from './Consultant';
import Insurance from './Insurance';
import OtherAvatar from './OtherAvatar'
import AvatarDialog from './AvatarDialog'
import {globalAvatarContext} from './AvatarMenu';

// FIND A FIX TO DEFINE useEffect here for only declaring everything else but the statement, 
// and statement in the Consultant and OtherAvatar will use another useEffect to modify
const Avatar = (props) =>{
    // const [name, setName] = useState(null);
    // const [role, setRole] = useState(null);
    // const [description, setDescription] = useState(null);
    // const [statement, setStatement] = useState(null);
    // const [avatarType, setType] = useState(props.getAvatarType);

    const { avatarState, setAvatarState } = React.useContext(globalAvatarContext);
   
    
    // function getName(){
    //     return name;
    // }

    // function getRole(){
    //     return role;
    // }
    // function getDescription(){
    //     return description;
    // }

    // function getStatement(){
    //     return statement;
    // }

    // function getAvatarType(){
    //     return type;
    // }

    return (
        <div>
            {
                props.avatarID === 0 ? (<Consultant avatarID={props.avatarID} decisionType={props.decisionType} onExit={props.onExit} />) :
                                        (<OtherAvatar avatarID={props.avatarID} onExit={props.onExit} />)
            }
        </div>
    );
}

export default Avatar;