import "./css/App.css";
import "./css/Inventory.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FarmGrid from "./components/Farm/FarmGrid";
import Shop from "./components/Shop";
import Inventory from "./components/Inventory";
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from "./utils/auth/hooks";
import { LoginPage } from "./components/LoginPage";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/auth/PrivateRoute";
import Consultant from './components/Consultant';
import InfoHeader from './components/InfoHeader';
import { ModelProvider } from "./components/models/ModelContext";

// Initialize the websocket on the client side
const socket = io();

const App = () => {
  // TODO: Implement state for user, inventory, money, etc...
  // Can use react contexts or maybe redux or something like that
  const [user, setUser] = useState("Brandon");
  const [money, setMoney] = useState(0);
  const [season, setSeason] = useState("Fall");
  const [turn, setTurn] = useState(1);

  const { user: userTest, isLoggedIn, error, signInHandler, signOutHandler, createAccountHandler } = useAuth();

  //TODO move socket logic to context
  const [isDenied, setIsDenied] = useState(false);
  socket.on('deny', () => {
    setIsDenied(true)
  })
  
  useEffect(() => console.log(userTest), [userTest])

  
  const [decisionType, setDecisionType] = useState(0);
  // This useEffect hook performs all operations needed on page load
  useEffect(() => {
    setDecisionType(Math.round(Math.random()));
  }, [])
  ; 

  return (
    <div className="App">
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="denied" element={<h1>Denied!</h1>} />
        <Route path="play" element={
          <PrivateRoute>
            <Game/>
          </PrivateRoute>
        } 
        />
      </Routes> 
      {isDenied && <h1>Denied!</h1>} 
      {isLoggedIn ? <h1>Logged In</h1> : <h1>Logged Out</h1>}
      <LoginPage />
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
      <Inventory />
      <Shop money={money} setMoney={setMoney}></Shop>
      
    </div>
  );
}

export default App;
