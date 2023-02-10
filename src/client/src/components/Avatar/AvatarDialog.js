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
    let statement = props.generateStatement();
    
    function purchaseConsultant(purchasePrice){
            return (
                <div className="dialog">
                    <div className="purchase-Consultant">
                        <h3>Price: $ + {purchasePrice} </h3>
                        <p>By purchasing advice from the consultant ...</p>
                        <div className="purchase-tip">
                            <button type="button" onClick={() => props.purchaseConsultant()} disabled={!props.canPurchaseConsultant()}>Purchase</button>
                            <button onClick={() => props.onExit()}>Close</button>
                        </div>
                    </div>
                </div>
            );
    }

    function generalDialog(){
       return ( 
                <div className="dialog">
                    <div className={"avatar avatar-" + props.getId()}> </div>
                    <h1> { props.getName() +" "+ props.getRole()} </h1> 
                    <h2> { props.getDescription() } </h2>
                    <p>
                        {props.generateStatement()}
                    </p>
                    <button onClick={() => props.onExit()}>Close</button>
                </div>
            )
    }
        return (
            <div>

            { props.isConsultant && !props.getAccessToConsultant()  ?
                purchaseConsultant(props.consultantPrice)
                :
                generalDialog()
            }
           
           
        </div>
    )
}
export default AvatarDialog; 