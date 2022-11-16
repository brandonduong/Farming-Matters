import React from 'react'

function FarmTilePopup(props) {
  function onClick(seedNum) {
    props.setPlantedSeed(seedNum)
    props.setClickedTile(null)
  }

  const plantButtons = []
  for (let i = 0; i < 6; i++) {
    plantButtons.push(
      <button type="button" onClick={()=>onClick(i)} key={"plant"+i}>
        Seed {i}
      </button>
    )
  }
  return (
    <div>
      {!props.plantedSeed ? plantButtons :
        <div>
          Seed Num: {props.plantedSeed}
        </div>
      }
      <button type="button" onClick={()=>props.setClickedTile(null)}>
        Close popup
      </button>
    </div>
  )
}

export default FarmTilePopup;
