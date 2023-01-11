import React from 'react'
import { globalAvatarContext } from './AvatarMenu';
//TODO:
// - Add DETERMINISTIC or PROBABILISTIC RANDOMNESS
// - Make separate txt files or javascript files to these descriptions elsewhere (making avatarNames and avatarDescrption into objects)
// - Add placeholders for string to add in DETERMINISTIC or PROBABILISTIC values
// - Make dialog hidden so players can click tiles in the middle of the board
// - Add button to close dialog window
// - Blur out background
// - Add a state variable to the consultant dialog to only generate a new number if the current round has changed

const AvatarDialog = (props) =>{
        const { avatarState } = React.useContext(globalAvatarContext);
        return (
           <div className="dialog">
               <div className={"avatar avatar-" + avatarState.avatarID}> </div>
               <h1> { avatarState.name +" "+ avatarState.role} </h1> 
               <h2> { avatarState.description } </h2>
               <p>
                   {avatarState.statement}
                
                </p>
                
                <button onClick={props.onExit}>Close</button>
                    
              
        </div>
    )
}
export default AvatarDialog; 
