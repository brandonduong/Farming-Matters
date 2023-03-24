import React, { useState, useEffect } from 'react';
import { shopItemsList } from "../constants";
import {globalInventoryContext} from "../../../Game";
import { getAllCropContracts } from '../../Inventory';
import { SellTileRow } from './SellTileRow'

export const SellTile = ({name, inventoryState, setInventoryState}) => {
    let insuredCrops = {}
    const crops = getAllCropContracts(inventoryState, name)
    
    for (let i = 0; i < crops.length; i++) {
        let crop = crops[i]
        let floorPrice = crop.floorPrice ? crop.floorPrice.toString() : 'null'

        if (floorPrice in insuredCrops) {
            insuredCrops[floorPrice] += 1;
        } else {
            insuredCrops[floorPrice] = 1;
        }
    }

    const defaultSelectedQuantities = {}
    Object.keys(insuredCrops).forEach(floorPrice => defaultSelectedQuantities[floorPrice] = 0)
    const [selectedQuantities, setSelectedQuantities] = useState(defaultSelectedQuantities)

    useEffect(() => console.log(selectedQuantities), [selectedQuantities])
    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>{name}</div>
            <div>
            {
                Object.entries(insuredCrops).sort().map(([floorPrice, qty]) => { 
                    return (
                        <SellTileRow 
                            floorPrice={floorPrice}
                            maxQuantity={qty}
                            selectedQuantities={selectedQuantities}
                            setSelectedQuantities={setSelectedQuantities}
                        />
                    )
                })
            }
            </div>
        </div> 
    )
}