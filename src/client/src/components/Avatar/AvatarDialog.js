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
                        <h1>Price: $ {purchasePrice} </h1>
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

                <div className="dialog-grid">
                    <div className={"avatar dialog-avatar-" + props.getId()}> </div>
                    <div className="box arrow-left">
                        
                        <div className="avatar-info">
                            <h1> { props.getName() +" "+ props.getRole()} </h1> 
                            <h2> { props.getDescription() } </h2>
                            <div className="dialog-statement">
                                "{props.statement}"
                            </div>
                            <button onClick={() => props.onExit()}>Close</button>
                        </div>
                        
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
