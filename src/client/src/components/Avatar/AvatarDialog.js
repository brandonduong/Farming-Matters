import React from 'react';
import { useState } from "react";
//TODO:
// - Add DETERMINISTIC or PROBABILISTIC RANDOMNESS
// - Make separate txt files or javascript files to these descriptions elsewhere (making avatarNames and avatarDescrption into objects)
// - Add placeholders for string to add in DETERMINISTIC or PROBABILISTIC values
// - Make dialog hidden so players can click tiles in the middle of the board
// - Add button to close dialog window
// - Blur out background
// - Add a state variable to the consultant dialog to only generate a new number if the current round has changed

const AvatarDialog = (props) =>{
    let id = props.getId();
    let name = props.getName();
    let role= props.getRole();
    let description = props.getDescription();
    let statement = props.statement;
    const [moreInfoDisplay, setMoreInfoDisplay ] = useState(false);

    const displayMoreInformation = () => {
        
        return (
            <div
              id="consultant-info-tooltip"
              className="dialog-modal"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            >
                The consultant has the power to look ahead into the future and provide you insights about different areas such as upcoming weather, future market prices of crops and other events. However, you do have the option to follow the consultant's advice or not. If you choose not to, simply play the game as you normally would.
              <button
                type="button"
                className="close-button"
                onClick={() => setMoreInfoDisplay(false)}
              >
                x
              </button>
             
            </div>
        );
      };
    
    function purchaseConsultant(purchasePrice){
            return (
                <div className="purchase-dialog">
                    <div className="purchase-consultant">
                        <h1>Purchase Consultant Advice </h1>
                        <button id="purchase-consultant-info" className="more-info-btn" onClick={()=>{setMoreInfoDisplay(true)}}>i</button>
                        {moreInfoDisplay ? displayMoreInformation() : <></>}
                        <h2>Price: $ {purchasePrice} </h2>
                        <div className="purchase-tip">
                            <button type="button" className="purchase-button" onClick={() => props.purchaseConsultant()} disabled={!props.canPurchaseConsultant()}>Purchase</button>
                            <button className="close-button" onClick={() => props.onExit()}>x</button>
                        </div>
                    </div>
                </div>
            );
    }

    function generalDialog(){
       return ( 

                <div className="dialog-grid">
                    <div className={"avatar dialog-avatar-" + props.getId()}> </div>
                    <div className="box arrow-left">
                        
                        <div className="avatar-info">
                            <h1> { props.getName() +" the "+ props.getRole()} </h1> 
                            <h2> { props.getDescription() } </h2>
                            <div className="dialog-statement">
                                "{props.statement}"
                            </div>
                            
                        </div>
                        <button className="close-button" onClick={() => props.onExit()}>x</button>
                    </div>
                    
                </div>
            )
    }
    
    return (
            <div>

            { props.isConsultant && !props.accessToConsultant  ?
                purchaseConsultant(props.consultantPrice)
                :
                generalDialog()
            }
           
           
        </div>
    )
}
export default AvatarDialog; 
