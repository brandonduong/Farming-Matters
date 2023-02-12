import "./css/App.css";
import "./css/Avatar.css";
import "./css/Inventory.css";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import FarmGrid from "./components/Farm/FarmGrid";
import Shop from "./components/Shop";
import InventoryRender from "./components/Inventory/InventoryRender";
import AvatarMenu from './components/Avatar/AvatarMenu';
import InfoHeader from './components/InfoHeader';
import {VisualGameLogic} from './components/GameLogic/VisualGameLogic';
import {GameLogic} from './components/GameLogic/GameLogic';
import {SEASONS} from './components/GameLogic/constants'
import {HeavyRain} from './components/GameEvents/SeasonalEvents/SeasonalEvents';
import React, { useEffect, useState } from 'react';
import { ModelProvider } from "./components/models/ModelContext";
import {plants} from "./components/Farm/FarmTile/constants"
import {getItems} from "./components/Inventory"
import {shopItemsList} from "./components/Shop/constants";
import { generateNTurnPriceState, getItemBasePrice }  from "./components/GameLogic/GenerateTurnPrices";
import { itemFluctuation } from "./components/GameLogic/constants";

const globalInventoryState = {};
const insuredItems = {};
export const globalInventoryContext = React.createContext({});
// export const globalInsuredContext = React.createContext();

const App = () => {
  // TODO: Implement state for user, inventory, money, etc...
  // Can use react contexts or maybe redux or something like that
  const [user, setUser] = useState("Brandon");
  const [money, setMoney] = useState(1000);
  const [season, setSeason] = useState("Fall");
  const [turn, setTurn] = useState(1);
  const [accessToConsultant, setAccessToConsultant] = useState(false);
  const [plantedSeeds, setPlantedSeeds] = useState([]);
  const [decisionType, setDecisionType] = useState(0);
  
  const [inventoryState, setInventoryState] = useState(globalInventoryState);
  const [insuredState, setInsuredState] = useState(insuredItems);
  const [consultantStatement, setConsultantStatement] = useState("");
  const [otherAvatarStatements, setOtherAvatarStatements] = useState([]);
  let nTurnItemPrices = generateNTurnPriceState(100,itemFluctuation,shopItemsList);
  const [allTurnPrices, setAllTurnPrices] = useState(nTurnItemPrices);
  const [isEventHappening, setIsEventHappening] = useState(false);


  // This useEffect hook performs all operations needed on page load
  useEffect(() => {
    setDecisionType(Math.round(Math.random()));
  }, []); 


  // constructor for inventory
  let getNames = {};
  let getNamesInsurance = {};
  for (let i = 0; i < plants.length; i++){
    let currentName = plants[i].name;
    getNames[currentName]=0;   
    getNamesInsurance[currentName]=0; 
  }

  let currentPrices = []
  for (let i = 0; i < shopItemsList.length; i++){
    let itemInfo = {}
    const currItemName = shopItemsList[i].name;
    let currItemPrice = shopItemsList[i].price;
    itemInfo[currItemName] = currItemPrice;
    currentPrices.push(itemInfo);
  }

  useEffect( () => {
    setInventoryState(
      getNames
    )
  },[]);

  useEffect(() => {   
    setInsuredState(
      getNamesInsurance
  )}, []);

  
  useEffect(() => {
    setAccessToConsultant(false);
    const isEventHappeningNextSeason = GameLogic.GenerateStatistics.getEventHappening();
    setIsEventHappening(isEventHappeningNextSeason);
  },[season]);
    
  useEffect(()=>{
    if (accessToConsultant){
      console.log(allTurnPrices);
      const statement = GameLogic.GenerateStatistics.generateConsultantStatement(decisionType, turn, allTurnPrices, SEASONS, season);
      setConsultantStatement(statement);

    }else{
      setConsultantStatement("");
    }
    }, [accessToConsultant]
  );


    

  return (
    <div className="App">
      <InfoHeader user={user} money={money} season={season} turn={turn} SEASONS={SEASONS} setSeason={setSeason} setTurn={setTurn} />
      <div className="canvas-container">
        <Canvas >
          <Stats />
         
          
          <ModelProvider>
            <FarmGrid position={[0, 0, 0]} plantedSeeds={plantedSeeds} setPlantedSeeds={setPlantedSeeds} VisualGameLogic={VisualGameLogic} turn={turn} money={money} setMoney={setMoney} />
          </ModelProvider>

          {VisualGameLogic.generateVisualEnvironment(season, isEventHappening)}
          
          <OrbitControls
            target={[0, 0, 0]}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            maxDistance={10}
            enablePan={false}
          />

        </Canvas>
      </div>

      <AvatarMenu 
        accessToConsultant={accessToConsultant} 
        setAccessToConsultant={setAccessToConsultant} 
        money={money} 
        setMoney={setMoney}  
        consultantStatement={consultantStatement}
      />

      
      <globalInventoryContext.Provider value={{inventoryState,setInventoryState,insuredState,setInsuredState, turn}}>
          <InventoryRender />
          <Shop money={money} setMoney={setMoney} turn={turn} allTurnPrices={allTurnPrices} ></Shop>
        {/* <globalInsuredContext value={{insuredState,setInsuredState}}>
            <InventoryRender />
            <Shop money={money} setMoney={setMoney}></Shop>
        </globalInsuredContext> */}
      </globalInventoryContext.Provider>
    </div>
  );
}

export default App;
