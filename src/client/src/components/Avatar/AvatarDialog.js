import React from 'react'
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
    
    function purchaseConsultant(purchasePrice){
            return (
                <div className="purchase-dialog">
                    <div className="purchase-consultant">
                        <h1>Purchase Consultant Advice </h1>
                        <h2>Price: $ {purchasePrice} </h2>
                        <div className="purchase-tip">
                            <button type="button" className="purchase-button" onClick={() => props.purchaseConsultant()} disabled={!props.canPurchaseConsultant()}>Purchase</button>
                            <button className="close-button" onClick={() => props.onExit()}>Close</button>
                        </div>
                    </div>
                </div>
            );
    }

    function generalDialog(){
       return ( 
                <div className="dialog">
                    <div className={"avatar avatar-" + props.getId()}> </div>
                    <h1> { props.getName() +" the "+ props.getRole()} </h1> 
                    <h2> { props.getDescription() } </h2>
                    <p>
                        {props.statement}
                    </p>
                    <button onClick={() => props.onExit()}>Close</button>
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
