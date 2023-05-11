import { useEffect } from 'react';
import {
  useConsultant,
  useGameInfo,
  useInventory,
  useItems,
  useTurnActions,
} from '../contexts';
import { GameLogic } from '../components/GameLogic/GameLogic';
import {
  initializeFarmBuildings,
  initializeLandscape,
  intializeFarmLand,
} from './helpers';
import {
  SEASONS,
  EVENT_OCCUR_THRESHOLD,
  gameEvents,
} from '../components/GameLogic/constants';
import { logData } from '../utils/logData';
import { createConnection } from '../utils/connectionDb';
import { retrieveSavedGame, saveGame } from '../utils/gameState';

const FARM_TILE_INFO_SEPARATOR = '|';

export const useSaveGame = (loadedTurn) => {
  const { turn, season, money, decisionType, grid } = useGameInfo();
  const { inventoryState } = useInventory();
  const { allTurnPrices } = useItems();
  const { accessToConsultant, consultantStatement } = useConsultant();
  const { currentTurnActions, setcurrentTurnActions } = useTurnActions();

  useEffect(() => {
    if (turn > loadedTurn) {
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
        sellPrices: allTurnPrices[turn],
        consultant: [accessToConsultant, consultantStatement],
        farmGrid: savableGrid.join(FARM_TILE_INFO_SEPARATOR),
      });
      logData(currentTurnActions);
      setcurrentTurnActions([]);
    }
  }, [turn]);
};

export const useEvents = () => {
  const {
    setAccessToConsultant,
    isEventHappening,
    setIsEventHappening,
    typeOfCatastrophicEvent,
    setTypeOfCatastrophicEvent,
    setDisplayTransition,
    setAutoPrompt,
  } = useConsultant();
  const { season, turn, money } = useGameInfo();

  useEffect(() => {
    setAccessToConsultant(false);
    setAutoPrompt(true);
    const isEventHappeningNextSeason =
      GameLogic.GenerateStatistics.getEventHappening();

    if (isEventHappeningNextSeason > EVENT_OCCUR_THRESHOLD) {
      setIsEventHappening(true);
    } else {
      setIsEventHappening(false);
    }
  }, [season]);

  useEffect(() => {
    //Sesonal Events
    if (isEventHappening) {
      setTypeOfCatastrophicEvent(Object.keys(gameEvents['Season'][season])[0]);
      setDisplayTransition(true);
    } else {
      setTypeOfCatastrophicEvent('');
      setDisplayTransition(false);
    }
    console.log(typeOfCatastrophicEvent);

    if (isEventHappening) {
      logData({
        actionType: 'Catastrophic Event',
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
  }, [isEventHappening, season]);
};

export const useConsultantEffects = (
  gameStateJustloaded,
  setGameStateJustloaded,
) => {
  const { accessToConsultant, setConsultantStatement } = useConsultant();
  const { turn, season, decisionType, money } = useGameInfo();
  const { allTurnPrices } = useItems();

  useEffect(() => {
    if (accessToConsultant && !gameStateJustloaded) {
      const statement =
        GameLogic.GenerateStatistics.generateConsultantStatement(
          decisionType,
          turn,
          allTurnPrices,
          SEASONS,
          season,
        );

      setConsultantStatement(statement);

      logData({
        actionType: 'Consultant Advice',
        turn: turn,
        season: season,
        isExperimental: true,
        balance: money,
        details: {
          statement: statement,
        },
      });
    } else {
      setGameStateJustloaded(false);
    }
  }, [accessToConsultant, season]);
};

export const useInitializeGame = (
  initialGrid,
  setLoading,
  setLoadedTurn,
  setGameStateJustloaded,
) => {
  const {
    setTurn,
    setMoney,
    setSeason,
    setDecisionType,
    setLandscape,
    setFarmBuildings,
    setGrid,
  } = useGameInfo();
  const { setAccessToConsultant, setConsultantStatement } = useConsultant();

  // This useEffect runs when the page is first loaded
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    // For database connection
    const initalizeGameState = async () => {
      await createConnection();
      retrieveSavedGame()
        .then((gameState) => {
          if (!initialGrid.length) {
            const loadedGrid = gameState.farmGrid.split(
              FARM_TILE_INFO_SEPARATOR,
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

          const consultantState = gameState.consultant.split(',');
          setAccessToConsultant(consultantState[0]);
          setConsultantStatement(consultantState[1]);
          setDecisionType(gameState.decision_type);
          setSeason(gameState.season);
        })
        .catch((err) => {
          console.log('error loading game data:', err);
          if (!initialGrid.length) {
            intializeFarmLand(initialGrid, setGrid);
          }
        });
    };

    initalizeGameState();
    initializeLandscape(setLandscape);
    initializeFarmBuildings(setFarmBuildings);
  }, []);
};
