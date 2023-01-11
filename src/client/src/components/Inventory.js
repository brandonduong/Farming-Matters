
//TODO: This component will need to be completely reworked once the react state is set up to dynamically show inventory contents

export function getItems(inventory){ 
  console.log(inventory);
  return Object.keys(inventory);
}

export function getItemCount(inventory,item){
  return inventory[item];
}

export function addItem(inventory,item,count){
  inventory[item] = inventory[item] + count; 
}

export function removeItem(inventory,item,count){
  if (inventory[item] < count){
    console.log("Not enough items");
  }
  inventory[item] = inventory[item] - count;
}
