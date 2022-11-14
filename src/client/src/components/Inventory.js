import '../css/Inventory.css';
import React, { useState } from 'react';

function Inventory() {
    let [isInventoryOpen, setIsInventoryOpen] = useState(false);
    function onClick(){
        setIsInventoryOpen(!isInventoryOpen);
    }
    return (
        <div className={isInventoryOpen ? 'inventory-box' : 'inventory'}>
        

            
            {
            isInventoryOpen ? (
                <div className='Grid'>
                    <div className='r1'>
                        <div className = 'c1'>
                            1
                        </div>
                        <div className = 'c2'>
                            2
                        </div>
                        <div className = 'c3'>
                            3
                        </div>
                    </div>
                    <div className='r2'>
                        <div className = 'c4'>
                            4
                        </div>
                        <div className = 'c5'>
                            5
                        </div>
                        <div className = 'c6'>
                            6
                        </div>
                    </div>

                <button onClick={()=> onClick()}>Close</button> 
                </div>
            )
            :  
                <button className='inventory-button' onClick={()=> onClick()}>Inventory</button>
        }
        </div>
        
    )
}

export default Inventory;