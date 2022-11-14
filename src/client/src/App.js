import './css/App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import FarmGrid from './components/FarmGrid.js';
import InfoHeader from './components/InfoHeader';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState("Brandon");
  const [money, setMoney] = useState(0);
  const [season, setSeason] = useState("Fall");
  const [turn, setTurn] = useState(1);

  return (
    <div className="App">
      <InfoHeader user={user} money={money} season={season} turn={turn} setSeason={setSeason} setTurn={setTurn} />
      <div className="canvas-container">
        <Canvas camera={{ fov: 70, position: [0, 5, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 50, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <FarmGrid position={[0, 0, 0]} turn={turn} />
          <OrbitControls target={[0, 0, 0]} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} maxDistance={10} enablePan={false}/>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
