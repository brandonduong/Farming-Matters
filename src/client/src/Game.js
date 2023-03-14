import "./css/App.css";
import "./css/Inventory.css";
import InfoHeader from "./components/InfoHeader";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import FarmGrid from "./components/Farm/FarmGrid";
import Shop from "./components/Shop";
import React, { useState, useEffect, useNavigate } from "react";
import { ModelProvider } from "./components/models/ModelContext";
import { BarnModel } from "./components/models/BarnModel";
import { SiloModel } from "./components/models/SiloModel";
import { CoopModel } from "./components/models/CoopModel";
import { WindModel } from "./components/models/WindModel";
import { WellModel } from "./components/models/WellModel";
import { FenceModel } from "./components/models/FenceModel";
import { TreeModel } from "./components/models/TreeModel";
import { FlowerModel } from "./components/models/FlowerModel";
import InventoryRender from "./components/Inventory/InventoryRender";
import { shopItemsList } from "./components/Shop/constants";
import {
  generateNTurnPriceState,
  GameLogic,
} from "./components/GameLogic/GameLogic";
import { itemFluctuation } from "./components/GameLogic/constants";
import AvatarMenu from "./components/Avatar/AvatarMenu";
import { VisualGameLogic } from "./components/GameLogic/VisualGameLogic";
import { SEASONS } from "./components/GameLogic/constants";
import { logData } from "./utils/logData";
import { createConnection } from "./utils/connectionDb";
import { retrieveSavedGame, saveGame } from "./utils/gameState";

const globalInventoryState = {};
const insuredItems = {};
export const globalInventoryContext = React.createContext({});
// export const globalInsuredContext = React.createContext();

/**
 * Contains all of the game logic and graphics related code.
 */
export const Game = () => {
  // TODO: Implement state for user, inventory, money, etc...
  // Can use react contexts or maybe redux or something like that
  const [user, setUser] = useState("Brandon");
  const [money, setMoney] = useState(10000);
  const [season, setSeason] = useState("Fall");
  const [turn, setTurn] = useState(1);
  const [decisionType, setDecisionType] = useState(0);
  const [landscape, setLandscape] = useState([]);
  const [farmBuildings, setFarmBuildings] = useState([]);
  const [inventoryState, setInventoryState] = useState(globalInventoryState);
  const [insuredState, setInsuredState] = useState(insuredItems);
  const marketItems = [];
  const [accessToConsultant, setAccessToConsultant] = useState(false);
  const [consultantStatement, setConsultantStatement] = useState("");
  const [otherAvatarStatements, setOtherAvatarStatements] = useState([]);
  const [isEventHappening, setIsEventHappening] = useState(false);
  const [typeOfCatastrophicEvent, setTypeOfCatastrophicEvent] = useState("");

  for (let i = 1; i < shopItemsList.length; i++) {
    marketItems.push(shopItemsList[i]);
  }
  let nTurnItemPrices = generateNTurnPriceState(
    10,
    itemFluctuation,
    marketItems
  );
  const [allTurnPrices, setAllTurnPrices] = useState(nTurnItemPrices);

  // constructor for inventory
  let getNames = {};
  let getNamesInsurance = {};
  for (let i = 0; i < marketItems.length; i++) {
    let currentName = marketItems[i].name;
    getNames[currentName] = 0;
    getNamesInsurance[currentName] = 0;
  }

  let currentPrices = [];
  for (let i = 0; i < marketItems.length; i++) {
    let itemInfo = {};
    const currItemName = marketItems[i].name;
    let currItemPrice = marketItems[i].price;
    itemInfo[currItemName] = currItemPrice;
    currentPrices.push(itemInfo);
  }

  useEffect(() => {
    if (turn > 1) {
      saveGame({
        turn: turn,
        season: season,
        money: money,
        decisionType: decisionType,
        inventory: inventoryState,
        insuredCrops: insuredState,
        sellPrices: allTurnPrices[turn],
        consultant: [accessToConsultant, consultantStatement],
      });
    }
  }, [turn]);

  useEffect(() => {
    setInventoryState(getNames);
  }, []);

  useEffect(() => {
    setInsuredState(getNamesInsurance);
  }, []);

  // This useEffect hook performs all operations needed on page load
  useEffect(() => {
    setDecisionType(Math.round(Math.random()));
  }, []);

  useEffect(() => {
    setDecisionType(Math.round(Math.random()));
    initializeLandscape();
    initializeFarmBuildings();
  }, []);

  useEffect(() => {
    setAccessToConsultant(false);
    const isEventHappeningNextSeason =
      GameLogic.GenerateStatistics.getEventHappening();
    setIsEventHappening(isEventHappeningNextSeason);
    const eventType = setTypeOfCatastrophicEvent(
      GameLogic.GenerateStatistics.getEventType()
    );

    if (isEventHappening) {
      logData("CatastrophicEvent", {
        turn: turn,
        isEventHappeningNextSeason: isEventHappeningNextSeason,
        eventType: eventType,
      });
    }
  }, [season]);

  useEffect(() => {
    if (accessToConsultant) {
      console.log(allTurnPrices);
      const statement =
        GameLogic.GenerateStatistics.generateConsultantStatement(
          decisionType,
          turn,
          allTurnPrices,
          SEASONS,
          season
        );
      setConsultantStatement(statement);
      logData("ConsultantAdvice", {
        turn: turn,
        statement: statement,
        isEventHappeningNextSeason: isEventHappening,
      });
    } else {
      setConsultantStatement("");
    }
  }, [accessToConsultant]);

  // // This effect will create a connection to the database once this component loads
  useEffect(() => {
    const initalizeGameState = async () => {
      await createConnection();
      retrieveSavedGame().then((gameState) => {
        console.log(gameState.json());
      });
    };
    initalizeGameState();
  }, []);

  function randomXYCircle(maxRadius, minRadius) {
    const r = maxRadius * Math.random() ** 0.5 + minRadius;
    const theta = Math.random() * 2 * Math.PI;
    return [r * Math.cos(theta), 0, r * Math.sin(theta)];
  }

  function initializeLandscape() {
    const initial = [];
    const treeNum = 100;

    for (let i = 0; i < treeNum; i++) {
      // Trees
      initial.push(
        <TreeModel
          variant={Math.floor(Math.random() * 3)}
          position={randomXYCircle(30, 11)}
          key={`tree${i}`}
          scale={Math.random() * 0.05 + 0.02}
        />
      );

      // Flowers
      initial.push(
        <FlowerModel
          variant={Math.floor(Math.random() * 2)}
          position={randomXYCircle(30, 11)}
          key={`flower${i}`}
          scale={Math.random() * 0.03 + 0.02}
        />
      );
    }

    setLandscape(initial);
  }

  // Farm buildings
  function initializeFarmBuildings() {
    setFarmBuildings(
      <>
        <BarnModel position={[0, 0, -10]} />
        <SiloModel position={[-6.9, 0, -8]} rotation={[0, Math.PI / 8, 0]} />
        <CoopModel position={[-12, 0, -5]} rotation={[0, Math.PI / 4, 0]} />
        <WindModel position={[6.5, 0, -7]} rotation={[0, -Math.PI / 8, 0]} />
        <WellModel position={[7, 0, 7]} rotation={[0, -Math.PI / 4, 0]} />
        <FenceModel position={[7.375, 0, 5]} />
        <FenceModel
          position={[9.875, 0, 2.625]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <FenceModel
          position={[9.875, 0, -2.625]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <FenceModel position={[7.375, 0, -5]} />
        <FenceModel position={[-7.375, 0, -5]} />
        <FenceModel
          position={[-9.875, 0, 2.625]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <FenceModel
          position={[-9.875, 0, -2.625]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <FenceModel position={[-7.375, 0, 5]} />
        <FenceModel
          position={[-4.9, 0, 7.375]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <FenceModel position={[-2.625, 0, 9.875]} />
        <FenceModel position={[2.625, 0, 9.875]} />
        <FenceModel position={[4.9, 0, 7.375]} rotation={[0, Math.PI / 2, 0]} />
      </>
    );
  }

  return (
    <>
      {
        <globalInventoryContext.Provider
          value={{
            inventoryState,
            setInventoryState,
            insuredState,
            setInsuredState,
            turn,
          }}
        >
          <InfoHeader
            user={user}
            money={money}
            season={season}
            turn={turn}
            setSeason={setSeason}
            setTurn={setTurn}
          />
          <div className="canvas-container">
            <Canvas camera={{ fov: 70, position: [0, 5, 5] }}>
              <ambientLight intensity={1} />
              <spotLight position={[10, 50, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />

              <ModelProvider>
                {/* Blue sky */}
                <Sky distance={50} sunPosition={[10, 12, 0]} />

                <FarmGrid
                  position={[0, 0, 0]}
                  turn={turn}
                  money={money}
                  setMoney={setMoney}
                />

                {farmBuildings}
                {landscape}
                {VisualGameLogic.generateVisualEnvironment(
                  turn,
                  season,
                  isEventHappening,
                  typeOfCatastrophicEvent
                )}
              </ModelProvider>

              <OrbitControls
                target={[0, 0, 0]}
                maxPolarAngle={Math.PI / 3.5}
                maxDistance={13}
                screenSpacePanning={false}
              />
            </Canvas>
          </div>
          <InfoHeader
            user={user}
            money={money}
            season={season}
            turn={turn}
            setSeason={setSeason}
            setTurn={setTurn}
          />

          <AvatarMenu
            accessToConsultant={accessToConsultant}
            setAccessToConsultant={setAccessToConsultant}
            money={money}
            setMoney={setMoney}
            consultantStatement={consultantStatement}
          />

          <InventoryRender marketItems={marketItems} />
          <Shop
            money={money}
            setMoney={setMoney}
            turn={turn}
            allTurnPrices={allTurnPrices}
            marketItems={marketItems}
          ></Shop>
        </globalInventoryContext.Provider>
      }
    </>
  );
};
