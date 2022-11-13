import React, { useState } from 'react'

function Consultant(props) {
    const [isOpened, setIsOpen] = useState(null);
    const [avatar, setSelectedAvatar] = useState(0);
    
    function onClick(avatarID){
        setIsOpen(!isOpened);
        console.log(`Consultant opened, ID=${avatarID}`);

    }
    const avatarButtons = [];
    for (let i = 0; i < 2; i++){
        avatarButtons.push(
            <button type="button" className={"avatar avatar-" + i} onClick={() => onClick(i)}>
                 
            </button>
        )
    }
    return (
        <div className="avatar-grid">
            { avatarButtons}
        </div>
    )
}

export default Consultant;
