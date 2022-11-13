import React, { useState } from 'react'
import ConsultantDialog from './ConsultantDialog.js';

function Consultant(props) {
    let [isOpened, setIsOpen] = useState(false);
    let [avatar, setSelectedAvatar] = useState(-1);
    const [decisionType, setDecisionType] = useState(0); 
    function onClick(avatarID){
        avatar = avatarID;
        console.log(avatar);
        setIsOpen(!isOpened);
        console.log(`Consultant opened, ID=${avatarID}`);
        setSelectedAvatar(avatarID);

    }
    const avatarButtons = [];
    for (let i = 0; i < 2; i++){
        avatarButtons.push(
            <button type="button" className={"avatar avatar-" + i} onClick={() => onClick(i)}>
                 
            </button>
        )
    }
return (
    <div className="avatar-overlay">
            <div className="avatar-grid">
                { avatarButtons}
                           </div>
                { isOpened ? 
                    <ConsultantDialog avatar= {avatar} decisionType={decisionType}/> : 

                    <div> </div> 
                
                }

            </div>
        )
}

export default Consultant;
