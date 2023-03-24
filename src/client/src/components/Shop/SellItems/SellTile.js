import React from 'react';
import { shopItemsList } from "../constants";
import {globalInventoryContext} from "../../../Game";
import { getAllCropContracts } from '../../Inventory';

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
    console.log(insuredCrops)
    return(
        <div>{name}</div> 
    )
}