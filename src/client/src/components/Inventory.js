export function getItems(inventory){ 
  let itemList = []
  for (let i = 0; i < inventory.length; i++){
    let currItem = inventory[i];
    if (!itemList.includes(currItem.name)){
      itemList.push(currItem.name);
    }
  }
  return itemList;
}

export function addItem(inventory,item){
  let itemName = item.name;
  let type = item.type;
  if (!itemName || !type){
    return;
  }
  if (type == 'crop'){
    let cropExpiry = item.cropExpiry;
    if (!cropExpiry){return;}
  }
  inventory.push(item);
}


export function removeItem(inventory,itemToRemove){
  let itemName = itemToRemove.name;
  let type = itemToRemove.type;
  let floorPrice = itemToRemove.floorPrice;
  
  if (!itemName || !type){
    return;
  }
  // crops have an extra field called cropExpiry
  let index = 0;
  if (type == 'crop'){
    let cropExpiry = itemToRemove.cropExpiry;
    if (!cropExpiry){return;}
    index = inventory.findIndex(item => (item.type == type && item.name == itemName && item.floorPrice == floorPrice && item.cropExpiry == cropExpiry))
    // other items don't have cropExpiry
  } else {
    index = inventory.findIndex(item => (item.type == type && item.name == itemName && item.floorPrice == floorPrice))     
  }

  if ((index >= 0) && (index < inventory.length)){
      inventory = inventory.splice(index,1);
  }
}

// gets the count of crops with the same insurance contracts
export function getSameCropContractCount(contracts,itemName,floor,expiry,type){
  let sameContractCount = 0;
  for (let i = 0; i < contracts.length; i++){
    let currItem = contracts[i];
    let hasSameContract =  currItem.name == itemName && currItem.floorPrice == floor && currItem.expiry == expiry && currItem.type == type;
    if (hasSameContract){
      sameContractCount++;
    }
  }
  return sameContractCount;
}

// gets crop count 
export function getCropCount(inventory, crop){
  let cropCount = 0;
  for (let i = 0; i < inventory.length; i++){
    let currItem = inventory[i];
    if (currItem.name == crop && currItem.type == "crop"){
      cropCount++;
    }
  }
  return cropCount;
}

// gets seed count
export function getSeedCount(inventory,seed){
  let seedCount = 0;
  for (let i = 0; i < inventory.length; i++){
    let currItem = inventory[i];
    if (currItem.name == seed && currItem.type == "seed"){
      seedCount++;
    }
  }
  return seedCount;
}

// get item count (for all non-plants)
export function getItemCount(inventory,tool){
  let toolCount = 0;
  for (let i = 0; i < inventory.length; i++){
    let currItem = inventory[i];
    if (currItem.name == tool && currItem.type == "tool"){
      toolCount++;
    }
  }
  return toolCount;
}

export function getAllItemContracts(inventory,itemName){
  let itemContracts = [];
  for (let i = 0; i < inventory.length; i++){
    let currItem = inventory[i];
    if (currItem.name == itemName){
      itemContracts.push(currItem);
    }
  }
  return itemContracts;
}

export function getAllSeedContracts(inventory, itemName){
  let seedContracts = [];
  for (let i = 0; i < inventory.length; i++){
    let currItem = inventory[i];
    if (currItem.name == itemName && currItem.type == 'seed'){
      seedContracts.push(currItem);
    } 
  }
  return seedContracts;
}

export function getAllCropContracts(inventory, itemName){
  let cropContracts = [];
  for (let i = 0; i < inventory.length; i++){
    let currItem = inventory[i];
    if (currItem.name == itemName && currItem.type == 'crop'){
      cropContracts.push(currItem);
    } 
  }
  return cropContracts;
}

export function getSeedContractsCounts(inventory,itemName){
  let counts = {}
  let floorPrices = [];
  let allSeeds = getAllSeedContracts(inventory, itemName);
  for (let i = 0; i < allSeeds.length; i++){
      let currContract = allSeeds[i];
      if (!floorPrices.includes(currContract.floorPrice)){
          floorPrices.push(currContract.floorPrice);
          counts[currContract["floorPrice"]] = 1;
      } else {
          counts[currContract["floorPrice"]] += 1;
      }
  }
  return counts;
}