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
export function getSameCropContractCount(inventory,item){
  const itemName = item.name;
  const floorPrice = item.insuranceInfo
  let sameContractCount = 0;
  for (let i = 0; i < inventory.length; i++){
    let currItem = inventory[i];
    if (currItem.name == itemName && currItem.insuranceInfo == floorPrice){
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