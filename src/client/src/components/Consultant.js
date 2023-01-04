import React, { ref, useState } from 'react'
import ConsultantDialog from './ConsultantDialog.js';

function Consultant(props) {
    let [isOpened, setIsOpen] = useState(false);
    let [avatar, setSelectedAvatar] = useState(-1);
    let decisionType = props.decisionType; 
    const selectedAvatar="background-color: rgb(30, 194, 0.75, 0.2)";
    console.log("USER DECISION TYPE IS, " + decisionType);

    function onAvatarClick(avatarID){
        avatar = avatarID;
        console.log(avatar);
        setIsOpen(!isOpened);
        console.log(`Consultant opened, ID=${avatarID}`);
        setSelectedAvatar(avatar);

    }

    function onExitClick(){
        setIsOpen(!isOpened);
        setSelectedAvatar(-1);
    }
    const avatarButtons = [];

    //Find out a way to communicate methods from child component
    const avatarNames = [
        ["Jerry", "the Consultant"],
        ["Bob", "the tools smith"],
        ["Alice", "the weather woman"]
    ];

    for (let i = 0; i < avatarNames.length; i++){
        avatarButtons.push(
            <div className={i == avatar ? "avatar-selected" : ""}>
                <button type="button" className={"avatar avatar-" + i} onClick={() => onAvatarClick(i)}></button>
                <div className="avatar-mini-name">{avatarNames[i][0]}</div>
            </div>
        )
    }
return (
    <div className={isOpened  ? "avatar-overlay" + "-dialog dialog-background" : "avatar-overlay"  } >
            <div className="avatar-grid">
                { avatarButtons}
            </div>
                { isOpened ? 
                    <ConsultantDialog avatar= {avatar} decisionType={decisionType} handler={onExitClick} /> 
                    : 
                    <div></div> 
                }

            </div>
        )
}

export default Consultant;
