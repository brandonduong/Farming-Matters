import React, { useState } from 'react'
import ConsultantDialog from './ConsultantDialog.js';

function Consultant(props) {
    let [isOpened, setIsOpen] = useState(false);
    let [avatar, setSelectedAvatar] = useState(-1);
    let decisionType = props.decisionType; 
    console.log("USER DECISION TYPE IS, " + decisionType);
    function onClick(avatarID){
        avatar = avatarID;
        console.log(avatar);
        setIsOpen(!isOpened);
        console.log(`Consultant opened, ID=${avatarID}`);
        setSelectedAvatar(avatar);

    }
    const avatarButtons = [];

    //Find out a way to communicate methods from child component
    const avatarNames = [
        ["Jerry", "the Consultant"],
        ["Bob", "the tools smith"]
    ]; 
    for (let i = 0; i < 2; i++){
        avatarButtons.push(
            <div>
            <button type="button" className={"avatar avatar-" + i} onClick={() => onClick(i)}>
            </button>
            <div className="avatar-mini-name">{avatarNames[i][0]}</div>
            </div>
        )
    }
return (
    <div className={isOpened  ? "avatar-overlay" + "-dialog" : "avatar-overlay"  } >
            <div className="avatar-grid">
                { avatarButtons}
                           </div>
                { isOpened ? 
                    <ConsultantDialog avatar= {avatar} decisionType={decisionType} /> : 

                    <div> </div> 
                
                }

            </div>
        )
}

export default Consultant;
