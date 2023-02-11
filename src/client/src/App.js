import "./css/App.css";
import "./css/Inventory.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FarmGrid from "./components/Farm/FarmGrid";
import Shop from "./components/Shop";
import InventoryRender from "./components/Inventory/InventoryRender";
import Consultant from './components/Consultant';
import InfoHeader from './components/InfoHeader';
import React, { useEffect, useState } from 'react';
import { ModelProvider } from "./components/models/ModelContext";
import {plants} from "./components/Farm/FarmTile/constants"
import {getItems} from "./components/Inventory"
import {shopItemsList} from "./components/Shop/constants";
import { generateNTurnPriceState, getItemBasePrice }  from "./components/GameLogic/gamelogic";
import { itemFluctuation } from "./components/GameLogic/constants";

const globalInventoryState = {};
const insuredItems = {};
export const globalInventoryContext = React.createContext({});
// export const globalInsuredContext = React.createContext();

const App = () => {
  // TODO: Implement state for user, inventory, money, etc...
  // Can use react contexts or maybe redux or something like that
  const [user, setUser] = useState("Brandon");
  const [money, setMoney] = useState(1000); //starting with $1000
  const [season, setSeason] = useState("Fall");
  const [turn, setTurn] = useState(1);
  const [inventoryState, setInventoryState] = useState(globalInventoryState);
  const [insuredState, setInsuredState] = useState(insuredItems);
  let nTurnItemPrices = generateNTurnPriceState(10,itemFluctuation,shopItemsList);
  const [allTurnPrices, setAllTurnPrices] = useState(nTurnItemPrices);


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

    const [decisionType, setDecisionType] = useState(0);

    // This useEffect hook performs all operations needed on page load
    useEffect(() => {
      setDecisionType(Math.round(Math.random()));
    }, [])
    ; 

  return (
    <div className="App">
      <InfoHeader user={user} money={money} season={season} turn={turn} setSeason={setSeason} setTurn={setTurn} />
      <div className="canvas-container">
        <Canvas camera={{ fov: 70, position: [0, 5, 5] }}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 50, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <ModelProvider>
            <FarmGrid position={[0, 0, 0]} turn={turn} money={money} setMoney={setMoney} />
          </ModelProvider>

          <OrbitControls
            target={[0, 0, 0]}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            maxDistance={10}
            enablePan={false}
          />
        </Canvas>

      </div>
      <Consultant decisionType = {decisionType} />
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
