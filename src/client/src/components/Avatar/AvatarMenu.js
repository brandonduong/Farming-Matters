import React, { useState } from 'react'
import Avatar from './Avatar'
import { avatarNames } from './constants.js';

// TODO: - Once the general Game loader component is done, generate this
//         component

const AvatarMenu = (props) =>{
    let [isOpened, setIsOpen] = useState(false); // Redudant, just check to see if avatar >=0
    let [selectedAvatar, setSelectedAvatar] = useState(-1);

    function onAvatarClick(avatarID){
        selectedAvatar = avatarID;
        setIsOpen(!isOpened);
        console.log(`Consultant opened, ID=${avatarID}`);
        setSelectedAvatar(selectedAvatar);

    }
    function onExitClick(){
        setIsOpen(!isOpened);
        setSelectedAvatar(-1);
    }

    const avatarButtons = [];
    for (let i = 0; i < avatarNames.length; i++){
        avatarButtons.push(
            <div className={i == selectedAvatar ? "avatar-selected avatar-item-" + i : "avatar-item-" + i}>
                <button type="button" className={"avatar avatar-" + i} onClick={() => onAvatarClick(i)}></button>
                <div className="avatar-mini-name">{avatarNames[i][0]}</div>
            </div>
        )
    }
return (
    <div className={isOpened  ? "avatar-overlay" + "-dialog dialog-background" : "avatar-overlay"  } >
            <div className="general-avatar" style={isOpened ? {  visibility: "hidden"}: {  visibility: "visible"}} >
                <div className="avatar-grid">
                    { avatarButtons}
                </div>
            </div>
                { isOpened ? 
                        <Avatar avatarID={selectedAvatar} 
                                decisionType={props.decisionType} 
                                isOpened={isOpened}
                                onExit={onExitClick} /> 
                    : 
                    <div></div> 
                }

            </div>
            
        )
}

export default AvatarMenu;