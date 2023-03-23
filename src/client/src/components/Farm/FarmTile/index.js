import React, { useEffect, useState } from "react";
import { Html, Sparkles } from "@react-three/drei";
import FarmTilePopup from "./FarmTilePopup";
import { logData } from "../../../utils/logData";
import { plants } from "./constants";
import { BeetModel } from "../../models/BeetModel";
import { CarrotModel } from "../../models/CarrotModel";
import { RiceModel } from "../../models/RiceModel";
import { OrangeModel } from "../../models/OrangeModel";
import { LettuceModel } from "../../models/LettuceModel";
import { TomatoModel } from "../../models/TomatoModel";
import { WatermelonModel } from "../../models/WatermelonModel";
import { WheatModel } from "../../models/WheatModel";
import { PumpkinModel } from "../../models/PumpkinModel";
import { WinterModel } from "../../models/WinterModel";
import { BerryModel } from "../../models/BerryModel";
import { MushroomModel } from "../../models/MushroomModel";

const FarmTile = (props) => {
  // Hold state for hovered and clicked events
  const position = [props.x - 0.5, -0.01, props.z - 0.5];
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const owned = props.owned;
  const fertilizerAmount = props.fertilizerAmount;
  const plantedSeed = props.plantedSeed;

  const [turnPlanted, setTurnPlanted] = useState(null); // null if nothing is planted

  function onClick(e) {
    e.stopPropagation();
    click(!clicked);
    props.setClickedTile([props.x, props.z]);

    console.log(owned);
  }

  // Log when a seed is planted
  useEffect(() => {
    if (plantedSeed) {
      setTurnPlanted(props.turn);

      let season;
      if (props.turn % 3 === 0) {
        season = "Fall";
      } else if (props.turn % 3 === 1) {
        season = "Winter";
      } else if (props.turn % 3 === 2) {
        season = "Spring";
      } else {
        season = "Summer";
      }

      logData({
        actionType: "Seed planted",
        turn: props.turn,
        season: season,
        isExperimental: true,
        balance: props.money,
        details: { x: props.x, z: props.z, seedInfo: plantedSeed },
      });
    }
  }, [plantedSeed]);

  // Using a model component. The model is placed outside of the <mesh> so it's not clickable or hoverable
  const models = (
    <>
      <RiceModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'rice'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <CarrotModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'carrot'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <OrangeModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'orange'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <LettuceModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'lettuce'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <TomatoModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'tomato'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <WatermelonModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'watermelon'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <WheatModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'wheat'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <PumpkinModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'pumpkin'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <BeetModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'beet'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <BerryModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'berry'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <MushroomModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'mushroom'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />

      <WinterModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed?.name === 'wintermelon'}
        stage={props.turn - turnPlanted + fertilizerAmount}
      />
    </>
  );

  return (
    <>
      {models}
      {plantedSeed &&
      props.turn - turnPlanted + fertilizerAmount >=
        plants.find(plant => plant.name == plantedSeed.name)?.growthLength ? (
        <Sparkles size={3} position={position} scale={0.75} />
      ) : (
        <></>
      )}

      {/* Grid outline */}
      <mesh rotation={[0, 0, 0]} position={[props.x - 0.5, 0, props.z - 0.5]}>
        <gridHelper args={[1, 1, "#004500", "#004500"]} position={[0, 0, 0]} />
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
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={
            hovered
              ? owned
                ? "#566b50"
                : "#404040"
              : owned
              ? props.colors[Math.floor((props.turn - 1) / 3) % 4]
              : "#4a4a4a"
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
