
//TODO: This component will need to be completely reworked once the react state is set up to dynamically show inventory contents

export function getItems(inventory){ 
  return Object.keys(inventory);
}

export function getItemCount(inventory,item){
  //console.log(inventory[item]);
  return inventory[item];
}

export function addItem(inventory,item,count){
  inventory[item] = parseInt(inventory[item]) + parseInt(count); 
  return inventory;
}

export function removeItem(inventory,item,count){
  if (parseInt(inventory[item]) < parseInt(count)) {
    console.log("Not enough items");
  }
  else{
    inventory[item] = parseInt(inventory[item]) - parseInt(count);
  }
}

export function addInsuredItem(insuredItems,item,count){
  insuredItems[item] = parseInt(insuredItems[item]) + parseInt(count); 
}

export function removeInsuredItem(insuredItems,item,count){
  if (parseInt(insuredItems[item]) < parseInt(count)) {
    console.log("Not enough items");
  }
  else{
    insuredItems[item] = parseInt(insuredItems[item]) - parseInt(count);
  }
}