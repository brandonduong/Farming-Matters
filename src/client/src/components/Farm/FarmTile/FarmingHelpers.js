export function addItemToCropInfo(cropInfo, item){
    let itemName = item.name;
    let itemFloorPrice = item.floorPrice;
    let itemCropExpiry = item.cropExpiry;
    let cropContracts = cropInfo[itemName];
    let match = null;
    let matchIndex = -1;
    for (let i = 0; i < cropContracts.length; i++){
        let currContract = cropContracts[i];
        if (currContract.floorPrice == itemFloorPrice && currContract.cropExpiry == itemCropExpiry){
            match = currContract;
            matchIndex = i;
            break;
        }
    }

    if(match && matchIndex >= 0){
        cropInfo[itemName][matchIndex].quantity += 1;
        
    } else {
        let newContract = {
            floorPrice: itemFloorPrice, 
            cropExpiry: itemCropExpiry, 
            quantity: 1
        };
        
        cropInfo[itemName].push(newContract);
    }
}

export function removeItemFromCropInfo(cropInfo, item){
    let itemName = item.name;
    let itemFloorPrice = item.floorPrice;
    let itemCropExpiry = item.cropExpiry;
    let cropContracts = cropInfo[itemName];
    if (!itemName || !itemFloorPrice || !itemCropExpiry || !cropContracts){
        return
    }
    let match = "";
    let matchIndex = null;
    let currCount = 0;
    for (let i = 0; i < cropContracts.length; i++){
        let currContract = cropContracts[i];
        if (currContract != null && currContract.floorPrice == itemFloorPrice && currContract.cropExpiry == itemCropExpiry){
            match = currContract;
            matchIndex = i;
            currCount = match.quantity;
            break;
        }
    }
    if(match != "" && matchIndex != null){
        if (currCount >= 2){
            cropInfo[itemName][matchIndex].quantity -= 1;
        } else {
            cropInfo[itemName] = cropInfo[itemName].filter(item => item.floorPrice != itemFloorPrice || item.cropExpiry != itemCropExpiry)
        }
    } 
}

export function addPlant(plantedSeeds,seed){
    let seedName = seed.name;
    let type = seed.type;
    let floorPrice = seed.floorPrice;
    let coordx = seed.coords.x;
    let coordz = seed.coords.z;
    if (!seedName || !type || !floorPrice || !coordx || !coordz){
        return
    }
    plantedSeeds.push(seed);
}
  
// each plant will have a unique coordinate so no duplicates in the list  
export function removePlant(plantedSeeds,seed){
    let seedName = seed.name;
    let type = seed.type;
    let floorPrice = seed.floorPrice;
    let coordx = seed.coords.x;
    let coordz = seed.coords.z;
    let index = plantedSeeds.findIndex(seed => seed.type == type && seed.name == seedName && seed.floorPrice == floorPrice && seed.coords.x== coordx && seed.coords.z== coordz)
    if ((index >= 0) && (index < plantedSeeds.length)){
        plantedSeeds = plantedSeeds.splice(index,1);
    }
}