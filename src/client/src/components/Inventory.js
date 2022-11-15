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
                    <h1 id='inventory-title'>Inventory</h1>
                    <div className='row'>
                        <div className = 'item'>
                            <img src={require('../assets/mushroom.png')} alt="mushroom"/>
                            <div className='item-info'>
                                <h4 className='quantity-title'>Quantity:</h4>
                                <p id='mushroomQuantity'>0</p>    
                            </div>
                        </div>
                        <div className = 'item'>
                            <img src={require('../assets/wheat.png')} alt="wheat"/>
                            <div className='item-info'>
                                <h4 className='quantity-title'>Quantity:</h4>
                                <p id='mushroomQuantity'>0</p>    
                            </div>
                        </div>
                        <div className = 'item'>
                            <img src={require('../assets/potato.png')} alt="potato"/>
                            <div className='item-info'>
                                <h4 className='quantity-title'>Quantity:</h4>
                                <p id='mushroomQuantity'>0</p>    
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className = 'item'>
                            <img src={require('../assets/bamboo.png')} alt="bamboo"/>
                            <div className='item-info'>
                                <h4 className='quantity-title'>Quantity:</h4>
                                <p id='mushroomQuantity'>0</p>    
                            </div>
                        </div>
                        <div className = 'item'>
                            <img src={require('../assets/lavendar.png')} alt="lavendar"/>
                            <div className='item-info'>
                                <h4 className='quantity-title'>Quantity:</h4>
                                <p id='mushroomQuantity'>0</p>    
                            </div>
                        </div>
                        <div className = 'item'>
                            <img src={require('../assets/corn.png')} alt="corn"/>
                            <div className='item-info'>
                                <h4 className='quantity-title'>Quantity:</h4>
                                <p id='mushroomQuantity'>0</p>    
                            </div>
                        </div>
                    </div>

                <button className='close-inventory-button' onClick={()=> onClick()}>Close</button> 
                </div>
            )
            :  
                <button className='inventory-button' onClick={()=> onClick()}>Inventory</button>
        }
        </div>
        
    )
}

export default Inventory;