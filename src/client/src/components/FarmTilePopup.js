import React from 'react'

function FarmTilePopup(props) {
  function onClick(seedNum) {
    props.setPlantedSeed(seedNum)
    props.setClickedTile(null)
  }

  function harvestPlant() {
    props.setPlantedSeed(0)
    props.setClickedTile(null)
  }

  const plantButtons = []
  for (let i = 1; i < 6; i++) {
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
            Turn Complete: {props.turnPlanted + props.growthLength}
          </div>
          {
            props.turn - props.turnPlanted >= props.growthLength &&
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
