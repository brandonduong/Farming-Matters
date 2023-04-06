import '../css/App.css';
import '../css/Inventory.css';
import InfoHeader from '../components/InfoHeader';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import FarmGrid from '../components/Farm/FarmGrid';
import Shop from '../components/Shop';
import React, { useState } from 'react';
import { ModelProvider } from '../components/models/ModelContext';
import InventoryRender from '../components/Inventory/InventoryRender';
import AvatarMenu from '../components/Avatar/AvatarMenu';
import Avatar from '../components/Avatar/Avatar';
import StartGameAvatar from '../components/StartGamePopup/StartGameAvatar';
import { VisualGameLogic } from '../components/GameLogic/VisualGameLogic';
import { BackgroundMusic } from '../components/BackgroundMusic';
import SeasonTransition from '../components/GameLogic/SeasonTransition';
import bgMusic from '../assets/bg_music.mp3';
import winterMusic from '../assets/Winter.mp3';
import rainMusic from '../assets/Flood.mp3';
import torandoMusic from '../assets/Tornado.mp3';
import droughtMusic from '../assets/Insects.mp3';
import { GameSettings } from '../components/GameSettings';
import EndGamePopup from '../components/EndGamePopup/EndGamePopup';
import Tutorial from '../components/StartGamePopup/Tutorial';
import { InventoryProvider } from '../contexts/InventoryContext';
import { useConsultantEffects, useEvents, useInitializeGame, useSaveGame } from './hooks';
import { useConsultant, useGameInfo, useInventory, useItems } from '../contexts';

const MAX_TURNS = 48;

/**
 * Contains all of the game logic and graphics related code.
 */
export const Game = () => {
  const initialGrid = [];
  const [loading, setLoading] = useState(false);
  const [gameStateJustloaded, setGameStateJustloaded] = useState(false);
  const [loadedTurn, setLoadedTurn] = useState(1);
  const [showTutorial, setShowTutorial] = useState(false);

  const { marketItems } = useItems();
  const { 
    userName,
    grid,
    money,
    setMoney,
    turn,
    setTurn,
    decisionType,
    landscape,
    farmBuildings,
    season,
    setSeason,
    backgroundMusicVolume,
    setBackgroundVolume,
    soundEffectsVolume,
    setSoundEffectsVolume
  } = useGameInfo();

  const { 
    accessToConsultant,
    setAccessToConsultant,
    consultantStatement,
    autoPrompt,
    setAutoPrompt,
    isEventHappening,
    typeOfCatastrophicEvent,
    displayTransition,
    setDisplayTransition,
  } = useConsultant();

  const {
    inventoryState,
    cropInfo
  } = useInventory();

  const { allTurnPrices } = useItems()
  
  // Unused?
  let currentPrices = [];
  for (let i = 0; i < marketItems.length; i++) {
    let itemInfo = {};
    const currItemName = marketItems[i].name;
    let currItemPrice = marketItems[i].price;
    itemInfo[currItemName] = currItemPrice;
    currentPrices.push(itemInfo);
  }

  useSaveGame(loadedTurn);
  useEvents();
  useConsultantEffects(gameStateJustloaded, setGameStateJustloaded);
  useInitializeGame(initialGrid, setLoading, setLoadedTurn, setGameStateJustloaded);

  function loadGameUI() {
    return (
      <>
        <InventoryProvider>
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
                />

                {farmBuildings}
                {landscape}
                {turn > 3 && isEventHappening ? (
                  VisualGameLogic.generateVisualEnvironment(
                    turn,
                    season,
                    isEventHappening,
                    typeOfCatastrophicEvent,
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
          {autoPrompt &&
          displayTransition == false &&
          consultantStatement != '' ? (
            <div className="dialog-background">
              <Avatar
                avatarID={0}
                isOpened={autoPrompt}
                onExit={() => {
                  setAutoPrompt(!autoPrompt);
                }}
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
          ) : (
            <></>
          )}

          <InventoryRender marketItems={marketItems} />
          <Shop
            money={money}
            setMoney={setMoney}
            turn={turn}
            allTurnPrices={allTurnPrices}
            marketItems={marketItems}
            season={season}
          />
        </InventoryProvider>
        <BackgroundMusic volume={backgroundMusicVolume} music={bgMusic} />
        <BackgroundMusic
          volume={soundEffectsVolume}
          music={
            displayTransition
              ? turn > 3
                ? typeOfCatastrophicEvent == 'SnowStorm'
                  ? winterMusic
                  : displayTransition && typeOfCatastrophicEvent == 'HeavyRain'
                  ? rainMusic
                  : typeOfCatastrophicEvent == 'Drought'
                  ? droughtMusic
                  : typeOfCatastrophicEvent == 'Tornadoes'
                  ? torandoMusic
                  : ''
                : ''
              : ''
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
          <h1 style={{ paddingTop: '10%' }}>Loading...</h1>
        </>
      ) : (
        loadGameUI()
      )}
    </>
  );
};
