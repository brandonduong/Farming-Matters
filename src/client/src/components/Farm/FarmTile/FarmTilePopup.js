import React from 'react'

//TODO: Make popup go away on blur
const FarmTilePopup = (props) => {
  function onClick(seedNum) {
    props.setPlantedSeed(seedNum)
    props.setClickedTile(null)
  }

  function harvestPlant() {
    props.setPlantedSeed(0)
    props.setMoney(props.money + props.plants[props.plantedSeed].harvestValue)
    props.setClickedTile(null)
  }

  const plantButtons = []
  for (let i = 1; i < props.plants.length; i++) {
    plantButtons.push(
      <button type="button" onClick={()=>onClick(i)} key={"plant"+i}>
        Seed {i}
      </button>
    )
  }
  return (
    <div className="tile-popup">
      {!props.plantedSeed ? plantButtons :
        <div className="tile-popup-info">
          <div className="tile-popup-info-item">
            Seed Num: {props.plantedSeed}
          </div>
          <div className="tile-popup-info-item">
            Turn Planted: {props.turnPlanted}
          </div>
          <div className="tile-popup-info-item">
            Turn Complete: {props.turnPlanted + props.plants[props.plantedSeed].growthLength}
          </div>
          {
            props.turn - props.turnPlanted >= props.plants[props.plantedSeed].growthLength &&
              <button type="button" onClick={()=>harvestPlant()}>
                Harvest Plant
              </button>
          }
        </div>
      }
      <button type="button" onClick={()=>props.setClickedTile(null)}>
        Close popup
      </button>
    </div>
  )
}

export default FarmTilePopup;
