import "./css/App.css";
import "./css/Inventory.css";
import InfoHeader from "./components/InfoHeader";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stats } from "@react-three/drei";
import FarmGrid from "./components/Farm/FarmGrid";
import Shop from "./components/Shop";
import React, { useState, useEffect } from "react";
import { ModelProvider } from "./components/models/ModelContext";
import { BarnModel } from "./components/models/BarnModel";
import { SiloModel } from "./components/models/SiloModel";
import { CoopModel } from "./components/models/CoopModel";
import { WindModel } from "./components/models/WindModel";
import { WellModel } from "./components/models/WellModel";
import { FenceModel } from "./components/models/FenceModel";
import { FlowerModel } from "./components/models/FlowerModel";
import InventoryRender from "./components/Inventory/InventoryRender";
import { shopItemsList } from "./components/Shop/constants";
import { generateNTurnPriceState, GameLogic } from "./components/GameLogic/GameLogic";
import { itemFluctuation } from "./components/GameLogic/constants";
import AvatarMenu from "./components/Avatar/AvatarMenu";
import Avatar from "./components/Avatar/Avatar";
import StartGameAvatar from "./components/StartGamePopup/StartGameAvatar";
import { VisualGameLogic } from "./components/GameLogic/VisualGameLogic";
import {
  SEASONS,
  EVENT_OCCUR_THRESHOLD,
  gameEvents,
} from "./components/GameLogic/constants";
import { logData } from "./utils/logData";
import { createConnection } from "./utils/connectionDb";
import { retrieveSavedGame, saveGame } from "./utils/gameState";
import { BackgroundMusic } from "./components/BackgroundMusic";
import SeasonTransition from "./components/GameLogic/SeasonTransition"
import bgMusic from "./assets/bg_music.mp3";
import winterMusic from "./assets/Winter.mp3";
import rainMusic from "./assets/Flood.mp3";
import torandoMusic from "./assets/Tornado.mp3";
import droughtMusic from "./assets/Insects.mp3";
import { GameSettings } from "./components/GameSettings";
import SnowFlakes from "./components/GameEvents/SeasonalEvents/Snow";
import { GrassModel } from "./components/models/GrassModel";
import EndGamePopup from "./components/EndGamePopup/EndGamePopup";
import { useAuth } from "./utils/auth/hooks";
import Tutorial from "./components/StartGamePopup/Tutorial";

const globalInventoryState = [];

export const globalInventoryContext = React.createContext([]);

const PLOT_SIZE = 2;
const MAX_TURNS = 48;
const FARM_TILE_INFO_SEPARATOR = "|";

/**
 * Contains all of the game logic and graphics related code.
 */
export const Game = ({season, setSeason}) => {
  // TODO: Implement state for user, inventory, money, etc...
  // Can use react contexts or maybe redux or something like that
  const { user } = useAuth();
  const [userName] = useState(user.displayName.substring(0, 10));
  const [money, setMoney] = useState(2500);
  //const [season, setSeason] = useState("");
  const [turn, setTurn] = useState(1);
  const [decisionType, setDecisionType] = useState(0);
  const [landscape, setLandscape] = useState([]);
  const [farmBuildings, setFarmBuildings] = useState([]);
  const [inventoryState, setInventoryState] = useState(globalInventoryState);
  
  // TODO: move to constants.js
  let defaultCropInfo = {
    rice: [],
    carrot: [],
    orange: [],
    lettuce: [],
    tomato: [],
    watermelon: [],
    wheat: [],
    pumpkin:[],
    beet:[],
    berries:[],
    mushroom:[],
    wintermelon:[]
  }
  const [cropInfo, setCropInfo] = useState(defaultCropInfo);

  // const [insuredState, setInsuredState] = useState(insuredItems);
  const marketItems = [];
  const [accessToConsultant, setAccessToConsultant] = useState(false);
  const [consultantStatement, setConsultantStatement] = useState("");
  const [autoPrompt, setAutoPrompt] = useState(true);
  const [isConsultantPrompt, setIsConsultantPrompt] = useState(true);
  const [otherAvatarStatements, setOtherAvatarStatements] = useState([]);
  const [isEventHappening, setIsEventHappening] = useState(false);
  const [backgroundMusicVolume, setBackgroundVolume] = useState(5);
  const [soundEffectsVolume, setSoundEffectsVolume] = useState(5);
  const [typeOfCatastrophicEvent, setTypeOfCatastrophicEvent] = useState("");
  const [displayTransition, setDisplayTransition] = useState(false);
  const initialGrid = [];
  const [grid, setGrid] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameStateJustloaded,setGameStateJustloaded ] = useState(false);
  const [loadedTurn, setLoadedTurn] = useState(1);
  const [showTutorial, setShowTutorial] = useState(false);

  for (let i = 1; i < shopItemsList.length; i++) {
    marketItems.push(shopItemsList[i]);
  }
  let nTurnItemPrices = generateNTurnPriceState(10, itemFluctuation, marketItems);
  const [allTurnPrices, setAllTurnPrices] = useState(nTurnItemPrices);

  // constructor for inventory
  // let getNames = {};
  // let getNamesInsurance = {};
  // for (let i = 0; i < marketItems.length; i++) {
  //   let currentName = marketItems[i].name;
  //   getNames[currentName] = 0;
  //   getNamesInsurance[currentName] = 0;
  // }

  let currentPrices = [];
  for (let i = 0; i < marketItems.length; i++) {
    let itemInfo = {};
    const currItemName = marketItems[i].name;
    let currItemPrice = marketItems[i].price;
    itemInfo[currItemName] = currItemPrice;
    currentPrices.push(itemInfo);
  }

  useEffect(() => {
    if (turn > loadedTurn){
      const savableGrid = [];
      for (let i = 0; i < grid.length; i++) {
        savableGrid.push(JSON.stringify(grid[i]));
      }

      saveGame({
        turn: turn,
        season: season,
        money: money,
        decisionType: decisionType,
        inventory: inventoryState,
        // insuredCrops: insuredState,
        sellPrices: allTurnPrices[turn],
        consultant: [accessToConsultant, consultantStatement],
        farmGrid: savableGrid.join(FARM_TILE_INFO_SEPARATOR),
    

      });
    }
  }, [turn]);

  function determineSeason(turnNum){
    const seasonOrder = ["Fall", "Winter", "Spring", "Summer"];
    return seasonOrder[Math.floor((turnNum - 1) / 3) % 4];
  }

  function addFarmLand(x, y, owned, price = 500) {
    // Add 2x2 grid of land at position x and y
    for (let i = x; i <= x + PLOT_SIZE; i += PLOT_SIZE) {
      for (let o = y; o <= y + PLOT_SIZE; o += PLOT_SIZE) {
        initialGrid.push({
          x: i,
          z: o,
          owned,
          price,
          plantedSeed: null,
          fertilizerAmount: 0,
          turnPlanted: 0,
        });
      }
    }
  }

  function intializeFarmLand() {
    // Default unlocked farm land
    addFarmLand(-3, -3, true);
    addFarmLand(-3, 2, true);
    addFarmLand(2, 2, true);
    addFarmLand(2, -3, true);

    // Default locked farm land
    addFarmLand(-8, -3, false);
    addFarmLand(-8, 2, false);
    addFarmLand(7, -3, false);
    addFarmLand(7, 2, false);
    addFarmLand(2, 7, false);
    addFarmLand(-3, 7, false);
    //addFarmLand(1.5, -8.5, false);
    //addFarmLand(-3.5, -8.5, false);
    setGrid(initialGrid);
  }

  useEffect(() => {
    setAccessToConsultant(false);
    setAutoPrompt(true);
    const isEventHappeningNextSeason =
      GameLogic.GenerateStatistics.getEventHappening();
    console.log(
      "EVENT HAPPENING IS ",
      isEventHappeningNextSeason,
      isEventHappeningNextSeason > EVENT_OCCUR_THRESHOLD
    );
    //setIsEventHappening(isEventHappeningNextSeason);

    //setTypeOfCatastrophicEvent(
    //  GameLogic.GenerateStatistics.getEventType()
    //);

    if (isEventHappeningNextSeason > EVENT_OCCUR_THRESHOLD) {
      setIsEventHappening(true);
    } else {
      setIsEventHappening(false);
    }
    
      

  }, [season]);

  useEffect(() => {
    //Sesonal Events
    if (isEventHappening) {
      setTypeOfCatastrophicEvent(Object.keys(gameEvents["Season"][season])[0]);
      setDisplayTransition(true);
    } else {
      setTypeOfCatastrophicEvent("");
      setDisplayTransition(false);
    }
    console.log(typeOfCatastrophicEvent);

    if (isEventHappening) {
      logData({
        actionType: "Catastrophic Event",
        turn: turn,
        season: season,
        isExperimental: false,
        balance: money,
        details: {
          isEventHappeningNextSeason: isEventHappening,
          typeOfCatastrophicEvent: typeOfCatastrophicEvent,
        },
      });
    }

  },[isEventHappening, season]);



/* Need to discuss with client about needing to log statements even if user didnt want to access it */
  useEffect(() => {
    if (accessToConsultant && !gameStateJustloaded) {
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

      logData({
        actionType: "Consultant Advice",
        turn: turn,
        season: season,
        isExperimental: true,
        balance: money,
        details: {
          // using statement instead of consultantStatement because I cant access the updated value
          statement: statement,
        },
      });
    }else{
      setGameStateJustloaded(false);
    }
  }, [accessToConsultant, season]);



  // This effect runs when the page is first loaded
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    // for database connection
    const season = "";
    const initalizeGameState = async () => {
      await createConnection();
      retrieveSavedGame()
        .then((gameState) => {
          console.log(gameState);
          // console.log(gameState.json());
          if (!initialGrid.length) {
            const loadedGrid = gameState.farmGrid.split(
              FARM_TILE_INFO_SEPARATOR
            );
            for (let i = 0; i < loadedGrid.length; i++) {
              initialGrid.push(JSON.parse(loadedGrid[i]));
            }

            setGrid(initialGrid);
            setTurn(gameState.turn);
            setLoadedTurn(gameState.turn);
            setMoney(gameState.money);
          }
          setGameStateJustloaded(true);

          //setSeason(determineSeason(gameState.turn));
          const consultantState = gameState.consultant.split(",");
          setAccessToConsultant(consultantState[0]);
          setConsultantStatement(consultantState[1]);
          setDecisionType(gameState.decision_type);
          setSeason(gameState.season);
          //setInventoryState(getNames);
          //setInsuredState(getNamesInsurance);
          
        })
        .catch((err) => {
          // error loading game data
          console.log("error loading game data:", err);
          if (!initialGrid.length) {
            intializeFarmLand();
          }
        });
    };
    initalizeGameState();

    // This useEffect hook performs all operations needed on page load
    //setDecisionType(Math.round(Math.random()));
    initializeLandscape();
    initializeFarmBuildings();
  }, []);

  function randomXYCircle(maxRadius, minRadius) {
    const r = maxRadius * Math.random() ** 0.5 + minRadius;
    const theta = Math.random() * 2 * Math.PI;
    return [r * Math.cos(theta), 0, r * Math.sin(theta)];
  }

  function initializeLandscape() {
    const initial = [];
    const flowerNum = 200;
    const grassNum = 200;

    for (let i = 0; i < flowerNum; i++) {
      // Flowers
      initial.push(
        <FlowerModel
          variant={Math.floor(Math.random() * 2)}
          position={randomXYCircle(50, 13)}
          key={`flower${i}`}
          scale={Math.random() * 0.03 + 0.02}
        />
      );
    }

    for (let i = 0; i < grassNum; i++) {
      // Grass
      initial.push(
        <GrassModel
          variant={Math.floor(Math.random() * 1)}
          position={randomXYCircle(50, 13)}
          key={`grass${i}`}
          scale={[
            Math.random() * 0.03 + 0.05,
            Math.random() * 0.01 + 0.01,
            Math.random() * 0.03 + 0.05,
          ]}
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

  function loadGameUI() {
    return (
      <>
        <globalInventoryContext.Provider
          value={{
            inventoryState,
            setInventoryState,
            cropInfo,
            setCropInfo,
            grid,
            setGrid,
            turn,
            money,
            setMoney
          }}
        >
          <div className="canvas-container">
            <Canvas camera={{ fov: 70, position: [0, 5, 5] }}>
              <ambientLight intensity={1} />
              <spotLight
                position={[-10, -10, -10]}
                angle={-Math.PI / 2}
                penumbra={0.1}
              />
              <pointLight position={[-10, -10, -10]} />

              <ModelProvider>
                {/* Blue sky */}
                <Sky distance={50} sunPosition={[10, 12, 0]} />

                <FarmGrid
                  position={[0, 0, 0]}
                  turn={turn}
                  money={money}
                  setMoney={setMoney}
                  grid={grid}
                  setGrid={setGrid}
                />

                {farmBuildings}
                {landscape}
                {turn > 3 && isEventHappening ? (
                  VisualGameLogic.generateVisualEnvironment(
                    turn,
                    season,
                    isEventHappening,
                    typeOfCatastrophicEvent
                  )
                ) : (
                  <></>
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
            user={userName}
            money={money}
            season={season}
            turn={turn}
            setSeason={setSeason}
            setTurn={setTurn}
            MAX_TURNS={MAX_TURNS}
          />

          {turn <= 1 ? (
            <StartGameAvatar
              userName={userName}
              showTutorial={showTutorial}
              setShowTutorial={setShowTutorial}
            />
          ) : null}
          {showTutorial ? <Tutorial setShowTutorial={setShowTutorial} /> : null}
          <button
            type="button"
            className="guide-button"
            onClick={() => setShowTutorial(!showTutorial)}
          >
            Guide
          </button>

          {isEventHappening && turn > 3 && displayTransition ? (
            <SeasonTransition
              typeOfCatastrophicEvent={typeOfCatastrophicEvent}
              displayTransition={displayTransition}
              setDisplayTransition={setDisplayTransition}
              season={season}
              grid={grid}
              inventoryState={inventoryState}
              cropInfo={cropInfo}
            />
          ) : (
            <></>
          )}
          <AvatarMenu
            accessToConsultant={accessToConsultant}
            setAccessToConsultant={setAccessToConsultant}
            money={money}
            setMoney={setMoney}
            consultantStatement={consultantStatement}
          />

          <GameSettings
            volume={backgroundMusicVolume}
            setVolume={setBackgroundVolume}
            soundEffectsVolume={soundEffectsVolume}
            setSoundEffectsVolume={setSoundEffectsVolume}
          />

          {turn >= MAX_TURNS && <EndGamePopup money={money} />}

          <InventoryRender
            marketItems={marketItems}
            money={money}
            turn={turn}
          />
          { autoPrompt && displayTransition == false && consultantStatement != ""? 
          <div className="dialog-background">
            <Avatar
            avatarID={0}
            isOpened={autoPrompt}
            onExit={() => {setAutoPrompt(!autoPrompt)}}
            accessToConsultant={accessToConsultant}
            setAccessToConsultant={setAccessToConsultant}
            money={money}
            setMoney={setMoney}
            consultantStatement={consultantStatement}
            decisionType={decisionType}
            turn={turn}
            allTurnPrices={allTurnPrices}
            season={season}
            />
          </div>
         : <></>  }

          <InventoryRender marketItems={marketItems} />
          <Shop
            money={money}
            setMoney={setMoney}
            turn={turn}
            allTurnPrices={allTurnPrices}
            marketItems={marketItems}
            season={season}
          ></Shop>
        </globalInventoryContext.Provider>
        <BackgroundMusic volume={backgroundMusicVolume} music={bgMusic} />
        <BackgroundMusic
          volume={soundEffectsVolume}
          music={
            displayTransition
              ? turn > 3
                ? typeOfCatastrophicEvent == "SnowStorm"
                  ? winterMusic
                  : displayTransition && typeOfCatastrophicEvent == "HeavyRain"
                  ? rainMusic
                  : typeOfCatastrophicEvent == "Drought"
                  ? droughtMusic
                  : typeOfCatastrophicEvent == "Tornadoes"
                  ? torandoMusic
                  : ""
                : ""
              : ""
          }
        />
        <BackgroundMusic volume={backgroundMusicVolume} music={bgMusic} />
      </>
    );
  }

  return (
    <>
      {loading ? (
        <>
          <h1 style={{ paddingTop: "10%" }}>Loading...</h1>
        </>
      ) : (
        loadGameUI()
      )}
    </>
  );
};
