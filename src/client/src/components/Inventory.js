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
                    <div className='row'>
                        <div className = 'item'>
                            <img src={require('../assets/mushroom.png')} alt="mushroom"/>
                        </div>
                        <div className = 'item'>
                            <img src={require('../assets/wheat.png')} alt="wheat"/>
                        </div>
                        <div className = 'item'>
                            <img src={require('../assets/potato.png')} alt="potato"/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className = 'item'>
                            <img src={require('../assets/bamboo.png')} alt="bamboo"/>
                        </div>
                        <div className = 'item'>
                            <img src={require('../assets/lavendar.png')} alt="lavendar"/>
                        </div>
                        <div className = 'item'>
                            <img src={require('../assets/corn.png')} alt="corn"/>
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