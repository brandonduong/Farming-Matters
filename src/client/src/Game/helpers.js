import { BarnModel } from '../components/models/BarnModel';
import { SiloModel } from '../components/models/SiloModel';
import { CoopModel } from '../components/models/CoopModel';
import { WindModel } from '../components/models/WindModel';
import { WellModel } from '../components/models/WellModel';
import { FenceModel } from '../components/models/FenceModel';
import { FlowerModel } from '../components/models/FlowerModel';
import { GrassModel } from '../components/models/GrassModel';

const PLOT_SIZE = 2;

export function initializeLandscape(setLandscape) {
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
        />,
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
        />,
      );
    }

    setLandscape(initial);
}

// Farm buildings
export function initializeFarmBuildings(setFarmBuildings) {
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
      </>,
    );
}

function randomXYCircle(maxRadius, minRadius) {
    const r = maxRadius * Math.random() ** 0.5 + minRadius;
    const theta = Math.random() * 2 * Math.PI;
    return [r * Math.cos(theta), 0, r * Math.sin(theta)];
}

function addFarmLand(initialGrid, x, y, owned, price = 500) {
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

export function intializeFarmLand(initialGrid, setGrid) {
    // Default unlocked farm land
    addFarmLand(initialGrid, -3, -3, true);
    addFarmLand(initialGrid, -3, 2, true);
    addFarmLand(initialGrid, 2, 2, true);
    addFarmLand(initialGrid, 2, -3, true);

    // Default locked farm land
    addFarmLand(initialGrid, -8, -3, false);
    addFarmLand(initialGrid, -8, 2, false);
    addFarmLand(initialGrid, 7, -3, false);
    addFarmLand(initialGrid, 7, 2, false);
    addFarmLand(initialGrid, 2, 7, false);
    addFarmLand(initialGrid, -3, 7, false);
    
    setGrid(initialGrid);
}
