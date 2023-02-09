import "./css/App.css";
import "./css/Inventory.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import FarmGrid from "./components/Farm/FarmGrid";
import Shop from "./components/Shop";
import Inventory from "./components/Inventory";
import Consultant from "./components/Consultant";
import InfoHeader from "./components/InfoHeader";
import React, { useEffect, useState } from "react";
import { ModelProvider } from "./components/models/ModelContext";
import { BarnModel } from "./components/models/BarnModel";
import { SiloModel } from "./components/models/SiloModel";
import { CoopModel } from "./components/models/CoopModel";
import { WindModel } from "./components/models/WindModel";
import { WellModel } from "./components/models/WellModel";
import { FenceModel } from "./components/models/FenceModel";

const App = () => {
  // TODO: Implement state for user, inventory, money, etc...
  // Can use react contexts or maybe redux or something like that
  const [user, setUser] = useState("Brandon");
  const [money, setMoney] = useState(10000);
  const [season, setSeason] = useState("Fall");
  const [turn, setTurn] = useState(1);

  const [decisionType, setDecisionType] = useState(0);

  // This useEffect hook performs all operations needed on page load
  useEffect(() => {
    setDecisionType(Math.round(Math.random()));
  }, []);

  return (
    <div className="App">
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

            {/* Farm Buildings*/}
            <BarnModel position={[0, 0, -10]} />
            <SiloModel
              position={[-6.9, 0, -8]}
              rotation={[0, Math.PI / 8, 0]}
            />
            <CoopModel position={[-12, 0, -5]} rotation={[0, Math.PI / 4, 0]} />
            <WindModel
              position={[6.5, 0, -7]}
              rotation={[0, -Math.PI / 8, 0]}
            />
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
            <FenceModel
              position={[4.9, 0, 7.375]}
              rotation={[0, Math.PI / 2, 0]}
            />
          </ModelProvider>

          <OrbitControls
            target={[0, 0, 0]}
            maxPolarAngle={Math.PI / 2.5}
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
      <Consultant decisionType={decisionType} />
      <Inventory />
      <Shop money={money} setMoney={setMoney}></Shop>
    </div>
  );
};

export default App;
