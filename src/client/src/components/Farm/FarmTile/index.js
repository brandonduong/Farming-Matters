import React, { useEffect, useState } from "react";
import { Html, Sparkles } from "@react-three/drei";
import FarmTilePopup from "./FarmTilePopup";
import { logData } from "../../../utils/logData";
import { TreeModel } from "../../models/TreeModel";
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
  const [owned, setOwned] = useState(props.owned);

  const [plantedSeed, setPlantedSeed] = useState(0); // 0 if nothing is planted
  const [turnPlanted, setTurnPlanted] = useState(null); // null if nothing is planted
  const [fertilizerAmount, setFertilizerAmount] = useState(0);

  function onClick(e) {
    e.stopPropagation();
    click(!clicked);
    props.setClickedTile([props.x, props.z]);

    //Log data to the server
    logData("Tile clicked", {
      x: props.x,
      z: props.z,
    });
  }

  // Log when a seed is planted
  useEffect(() => {
    if (plantedSeed !== 0) {
      setTurnPlanted(props.turn);

      logData("Seed planted", {
        x: props.x,
        z: props.z,
        seedNum: plantedSeed,
        turnPlanted: props.turn,
      });
    }
  }, [plantedSeed]);

  // Using a model component. The model is placed outside of the <mesh> so it's not clickable or hoverable
  const models = (
    <>
      <RiceModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 1}
        stage={props.turn - turnPlanted}
      />

      <CarrotModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 2}
        stage={props.turn - turnPlanted}
      />

      <OrangeModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 3}
        stage={props.turn - turnPlanted}
      />

      <LettuceModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 4}
        stage={props.turn - turnPlanted}
      />

      <TomatoModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 5}
        stage={props.turn - turnPlanted}
      />

      <WatermelonModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 6}
        stage={props.turn - turnPlanted}
      />

      <WheatModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 7}
        stage={props.turn - turnPlanted}
      />

      <PumpkinModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 8}
        stage={props.turn - turnPlanted}
      />

      <BeetModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 9}
        stage={props.turn - turnPlanted}
      />

      <BerryModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 10}
        stage={props.turn - turnPlanted}
      />

      <MushroomModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 11}
        stage={props.turn - turnPlanted}
      />

      <WinterModel
        position={position}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        visible={plantedSeed === 12}
        stage={props.turn - turnPlanted}
      />
    </>
  );

  return (
    <>
      {models}
      {plantedSeed &&
      props.turn - turnPlanted >= plants[plantedSeed].growthLength ? (
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
                plantedSeed={plantedSeed}
                setPlantedSeed={setPlantedSeed}
                setClickedTile={props.setClickedTile}
                turn={props.turn}
                turnPlanted={turnPlanted}
                money={props.money}
                setMoney={props.setMoney}
                owned={owned}
                setOwned={setOwned}
                price={props.price}
                inventoryState={props.inventoryState}
                fertilizerAmount={fertilizerAmount}
                setFertilizerAmount={setFertilizerAmount}
              />
            )}
        </Html>
      </mesh>
    </>
  );
};

export default FarmTile;
