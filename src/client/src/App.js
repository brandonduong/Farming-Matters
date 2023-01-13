import "./css/App.css";
import "./css/Inventory.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FarmGrid from "./components/Farm/FarmGrid";
import Shop from "./components/Shop";
import Inventory from "./components/Inventory";
import Consultant from './components/Consultant';
import InfoHeader from './components/InfoHeader';
import React, { useEffect, useState } from 'react';
import { ModelProvider } from "./components/models/ModelContext";

const App = () => {
  // TODO: Implement state for user, inventory, money, etc...
  // Can use react contexts or maybe redux or something like that
  const [user, setUser] = useState("Brandon");
  const [money, setMoney] = useState(0);
  const [season, setSeason] = useState("Fall");
  const [turn, setTurn] = useState(1);

    const [decisionType, setDecisionType] = useState(0);

    // This useEffect hook performs all operations needed on page load
    useEffect(() => {
      setDecisionType(Math.round(Math.random()));
    }, [])
    ; 

  return (
    <div className="App">
      <div className="canvas-container">
        <Canvas camera={{ fov: 70, position: [0, 5, 5] }}>
          <ambientLight intensity={1} />
          <spotLight position={[10, 50, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <ModelProvider>
            {/* Blue sky */}
            <mesh position={[200,50,0]}>
              <boxGeometry args={[1,100,500]} />
              <meshStandardMaterial color={'rgb(90, 150, 147)'} />
            </mesh>
            <mesh position={[0,50,200]}>
              <boxGeometry args={[500,100,1]} />
              <meshStandardMaterial color={'rgb(90, 150, 147)'} />
            </mesh>
            <mesh position={[-200,50,0]}>
              <boxGeometry args={[1,100,500]} />
              <meshStandardMaterial color={'rgb(90, 150, 147)'} />
            </mesh>\
            <mesh position={[0,50,-200]}>
              <boxGeometry args={[500,100,1]} />
              <meshStandardMaterial color={'rgb(90, 150, 147)'} />
            </mesh>


            <FarmGrid position={[0, 0, 0]} turn={turn} money={money} setMoney={setMoney} />
          </ModelProvider>

          <OrbitControls
            target={[0, 0, 0]}
            maxPolarAngle={Math.PI / 2.5}
            maxDistance={10}
            enablePan={false}
          />
        </Canvas>

      </div>
      <InfoHeader user={user} money={money} season={season} turn={turn} setSeason={setSeason} setTurn={setTurn} />
      <Consultant decisionType = {decisionType} />
      <Inventory />
      <Shop money={money} setMoney={setMoney}></Shop>
      
    </div>
  );
}

export default App;
