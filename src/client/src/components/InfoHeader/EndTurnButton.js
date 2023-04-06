import { useContext } from 'react';
import { globalInventoryContext } from '../../Game';
import Button from 'react-bootstrap/Button';

export const EndTurnButton = ({ season, setSeason, turn, setTurn }) => {
  const SEASONS = ['Winter', 'Spring', 'Summer', 'Fall'];
  const { inventoryState, setInventoryState, cropInfo, setCropInfo } =
    useContext(globalInventoryContext);

  const expireCrops = () => {
    //let cropInfoCopy = JSON.parse(JSON.stringify(inventoryState));
    let cropInfoCopy = {};
    let inventoryCopy = inventoryState.filter((item) => item.cropExpiry > 1);

    for (let i = 0; i < inventoryCopy.length; i++) {
      inventoryCopy[i].cropExpiry -= 1;
    }

    setInventoryState(inventoryCopy);

    Object.keys(cropInfo).forEach((name) => {
      cropInfoCopy[name] = cropInfo[name].filter((item) => item.cropExpiry > 1);

      for (let i = 0; i < cropInfoCopy[name].length; i++) {
        cropInfoCopy[name][i].cropExpiry -= 1;
      }
    });
    console.log(cropInfoCopy);
    setCropInfo(cropInfoCopy);
  };

  function endTurn() {
    setTurn(turn + 1);
    expireCrops();

    // Change season every 3 turns
    if ((turn + 1) % 3 === 1) {
      setSeason(SEASONS[(SEASONS.indexOf(season) + 1) % 4]);
    }
  }

  return (
    <Button
      id="info-header-button"
      type="button"
      variant="light"
      size="lg"
      onClick={() => endTurn()}
    >
      End Turn
    </Button>
  );
};
