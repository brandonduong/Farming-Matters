import './css/App.css';
import './css/Inventory.css'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import FarmGrid from './components/FarmGrid.js';
import Inventory from './components/Inventory';


function App() {

  return (
    <div className="App">
      Text Here
      <div className="canvas-container">
        <Canvas camera={{ fov: 70, position: [0, 5, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 50, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <FarmGrid position={[0, 0, 0]} />
          <OrbitControls target={[0, 0, 0]} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} maxDistance={10} enablePan={false}/>
        </Canvas>
        <Inventory className='inventory'></Inventory>
      </div>
    </div>
  );
}

export default App;
