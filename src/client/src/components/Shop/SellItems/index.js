import React from 'react';
import { shopItemsList } from "../constants";
import { globalInventoryContext } from "../../../Game";
import { SellTile } from './SellTile';

export const SellItems = () => {
    const { inventoryState, setInventoryState } = React.useContext(globalInventoryContext);

    // 1. Get all crop names in inventory (get all unique occurences of item.name for item in inventoryState)
    const cropNames = ['tomato', 'pumpkin'];

    return(
        <div style={{display: 'flex'}}>
            { 
                cropNames.map((name) => 
                    <SellTile 
                        name={name}
                        inventoryState={inventoryState}
                        setInventoryState={setInventoryState}
                    />
                )
            }
        </div>
    )
}