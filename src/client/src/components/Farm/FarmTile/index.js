import React, { useEffect, useState } from 'react';
import { Html, Sparkles } from '@react-three/drei';
import FarmTilePopup from './FarmTilePopup';
import { useTurnActions } from '../../../contexts';
// import { logData } from '../../../utils/logData';
import { plants } from './constants';
import { BeetModel } from '../../models/BeetModel';
import { CarrotModel } from '../../models/CarrotModel';
import { RiceModel } from '../../models/RiceModel';
import { OrangeModel } from '../../models/OrangeModel';
import { LettuceModel } from '../../models/LettuceModel';
import { TomatoModel } from '../../models/TomatoModel';
import { WatermelonModel } from '../../models/WatermelonModel';
import { WheatModel } from '../../models/WheatModel';
import { PumpkinModel } from '../../models/PumpkinModel';
import { WinterModel } from '../../models/WinterModel';
import { BerryModel } from '../../models/BerryModel';
import { MushroomModel } from '../../models/MushroomModel';

const FarmTile = (props) => {
  // Hold state for hovered and clicked events
  const position = [props.x - 0.5, -0.01, props.z - 0.5];
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const owned = props.owned;
  const fertilizerAmount = props.fertilizerAmount;
  const plantedSeed = props.plantedSeed;
  const [turnPlanted, setTurnPlanted] = useState(null);
  const { currentTurnActions, setcurrentTurnActions } = useTurnActions();

  function onClick(e) {
    e.stopPropagation();
    click(!clicked);
    props.setClickedTile([props.x, props.z]);
  }

  // Log when a seed is planted
  useEffect(() => {
    if (plantedSeed) {
      setTurnPlanted(props.turn);

      let season;
      if (props.turn % 3 === 0) {
        season = 'Fall';
      } else if (props.turn % 3 === 1) {
        season = 'Winter';
      } else if (props.turn % 3 === 2) {
        season = 'Spring';
      } else {
        season = 'Summer';
      }

      console.log('setcurrentactions: ', typeof currentTurnActions);
      console.log('setcurrentactions: ', typeof currentTurnActions);

      // setcurrentTurnActions([
      //   ...currentTurnActions,
      //   'seed planted',
      //   // {
      //   //   actionType: 'Seed planted',
      //   //   turn: props.turn,
      //   //   season: season,
      //   //   isExperimental: true,
      //   //   balance: props.money,
      //   //   details: { x: props.x, z: props.z, seedInfo: plantedSeed },
      //   // },
      // ]);
    }
  }, [plantedSeed]);

  // Using a model component. The model is placed outside of the <mesh> so it's not clickable or hoverable
  const models = (
    <>
      <RiceModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'rice'}
        scale={[0.02, 0.015, 0.02]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <CarrotModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'carrot'}
        scale={[0.03, 0.015, 0.03]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <OrangeModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'orange'}
        scale={[0.0075, 0.0075, 0.0075]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <LettuceModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'lettuce'}
        scale={[0.015, 0.02, 0.015]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <TomatoModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'tomato'}
        scale={[0.02, 0.01, 0.02]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <WatermelonModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'watermelon'}
        scale={[0.0125, 0.02, 0.015]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <WheatModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'wheat'}
        scale={[0.05, 0.01, 0.05]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <PumpkinModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'pumpkin'}
        scale={[0.0125, 0.02, 0.015]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <BeetModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'beet'}
        scale={[0.02, 0.015, 0.02]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <BerryModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'berries'}
        scale={[0.0075, 0.01, 0.01]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <MushroomModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'mushroom'}
        scale={[0.025, 0.025, 0.025]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <WinterModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'wintermelon'}
        scale={[0.0125, 0.02, 0.015]}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />
    </>
  );

  return (
    <>
      {models}
      {plantedSeed &&
      props.turn - turnPlanted + fertilizerAmount >=
        plants.find((plant) => plant.name == plantedSeed.name)?.growthLength ? (
        <Sparkles size={5} position={position} scale={1.5} />
      ) : (
        <></>
      )}

      {/* Grid outline */}
      <mesh rotation={[0, 0, 0]} position={[props.x - 0.5, 0, props.z - 0.5]}>
        <gridHelper args={[2, 1, '#004500', '#004500']} position={[0, 0, 0]} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={position}
        onClick={(e) => {
          onClick(e);
        }}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial
          color={
            hovered
              ? owned
                ? '#566b50'
                : '#404040'
              : owned
              ? props.colors[Math.floor((props.turn - 1) / 3) % 4]
              : '#4a4a4a'
          }
        />

        <Html center>
          {props.clickedTile &&
            props.clickedTile[0] === props.x &&
            props.clickedTile[1] === props.z && (
              <FarmTilePopup
                x={props.x}
                z={props.z}
                plantedSeed={plantedSeed}
                grid={props.grid}
                setGrid={props.setGrid}
                setClickedTile={props.setClickedTile}
                turn={props.turn}
                turnPlanted={turnPlanted}
                money={props.money}
                setMoney={props.setMoney}
                owned={owned}
                price={props.price}
                inventoryState={props.inventoryState}
                cropInfo={props.cropInfo}
                setCropInfo={props.setCropInfo}
                fertilizerAmount={fertilizerAmount}
              />
            )}
        </Html>
      </mesh>
    </>
  );
};

export default FarmTile;
