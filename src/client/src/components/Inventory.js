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
  inventory.push(item);
}


export function removeItem(inventory,item){
  inventory.remove(item)
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
  console.log(sameContractCount)
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
  let itemContracts = []
  for (let i = 0; i < inventory.length; i++){
    let currItem = inventory[i];
    if (currItem.name == itemName){
      itemContracts.push(currItem);
    }
  }
  return itemContracts;
}

export function getUniqueContracts(inventory,itemName){
  let floorPrices = [];
  let expiries = [];
  let uniqueContracts = []; 
  for (let i = 0; i < inventory.length; i++){
    let currItem = inventory[i];
    if(currItem.name == itemName){
      if (!floorPrices.includes(currItem.floorPrice)){
        floorPrices.push(currItem.floorPrice);
        uniqueContracts.push(currItem);
      } else {
        if (!expiries.includes(currItem.cropExpiry)){
          expiries.push(currItem.cropExpiry);
          uniqueContracts.push(currItem);
        }
      }
    }
  }
  return uniqueContracts;
}