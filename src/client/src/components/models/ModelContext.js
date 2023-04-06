import React from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export const ModelContext = React.createContext();

export function ModelProvider({ children }) {
  // Use the path to the .glb file. Note that the path starts at the 'public' folder.
  const tree = useLoader(GLTFLoader, '3dmodels/oak_tree_lowpoly.glb');
  // Add more models here using the same pattern as above

  // Rice
  const rice1 = useGLTF('3dmodels/rice_1.glb');
  const rice2 = useGLTF('3dmodels/rice_2.glb');

  // Carrot
  const carrot1 = useGLTF('3dmodels/carrot_1.glb');
  const carrot2 = useGLTF('3dmodels/carrot_2.glb');
  const carrot3 = useGLTF('3dmodels/carrot_3.glb');

  // Orange
  const orange1 = useGLTF('3dmodels/orange_1.glb');
  const orange2 = useGLTF('3dmodels/orange_2.glb');
  const orange3 = useGLTF('3dmodels/orange_3.glb');
  const orange4 = useGLTF('3dmodels/orange_4.glb');

  // Lettuce
  const lettuce1 = useGLTF('3dmodels/lettuce_1.glb');
  const lettuce2 = useGLTF('3dmodels/lettuce_2.glb');

  // Tomato
  const tomato1 = useGLTF('3dmodels/tomato_1.glb');
  const tomato2 = useGLTF('3dmodels/tomato_2.glb');
  const tomato3 = useGLTF('3dmodels/tomato_3.glb');

  // Watermelon
  const water1 = useGLTF('3dmodels/water_1.glb');
  const water2 = useGLTF('3dmodels/water_2.glb');
  const water3 = useGLTF('3dmodels/water_3.glb');
  const water4 = useGLTF('3dmodels/water_4.glb');

  // Wheat
  const wheat1 = useGLTF('3dmodels/wheat_1.glb');
  const wheat2 = useGLTF('3dmodels/wheat_2.glb');

  // pumpkin
  const pumpkin1 = useGLTF('3dmodels/pumpkin_1.glb');
  const pumpkin2 = useGLTF('3dmodels/pumpkin_2.glb');
  const pumpkin3 = useGLTF('3dmodels/pumpkin_3.glb');

  // Beet
  const beet1 = useGLTF('3dmodels/beet_1.glb');
  const beet2 = useGLTF('3dmodels/beet_2.glb');
  const beet3 = useGLTF('3dmodels/beet_3.glb');
  const beet4 = useGLTF('3dmodels/beet_4.glb');

  // Berries
  const berry1 = useGLTF('3dmodels/berry_1.glb');
  const berry2 = useGLTF('3dmodels/berry_2.glb');

  // Mushrooms
  const mush1 = useGLTF('3dmodels/mush_1.glb');
  const mush2 = useGLTF('3dmodels/mush_2.glb');
  const mush3 = useGLTF('3dmodels/mush_3.glb');

  // Wintermelon
  const winter1 = useGLTF('3dmodels/winter_1.glb');
  const winter2 = useGLTF('3dmodels/winter_2.glb');
  const winter3 = useGLTF('3dmodels/winter_3.glb');
  const winter4 = useGLTF('3dmodels/winter_4.glb');

  // Farm Buildings
  const barn = useGLTF('3dmodels/barn.glb');
  const coop = useGLTF('3dmodels/coop.glb');
  const fence = useGLTF('3dmodels/fence.glb');
  const silo = useGLTF('3dmodels/silo.glb');
  const well = useGLTF('3dmodels/well.glb');
  const wind = useGLTF('3dmodels/windmill.glb');

  // Landscape
  const tree1 = useGLTF('3dmodels/tree1.glb');
  const tree2 = useGLTF('3dmodels/tree2.glb');
  const tree3 = useGLTF('3dmodels/tree3.glb');
  const flower1 = useGLTF('3dmodels/flower1.glb');
  const flower2 = useGLTF('3dmodels/flower2.glb');
  const grass = useGLTF('3dmodels/grass.glb');

  //Seasonal Events
  const tornado = useGLTF('3dmodels/animated_tornado.glb');

  const value = {
    tree,
    rice1,
    rice2,
    carrot1,
    carrot2,
    carrot3,
    orange1,
    orange2,
    orange3,
    orange4,
    lettuce1,
    lettuce2,
    tomato1,
    tomato2,
    tomato3,
    water1,
    water2,
    water3,
    water4,
    wheat1,
    wheat2,
    pumpkin1,
    pumpkin2,
    pumpkin3,
    beet1,
    beet2,
    beet3,
    beet4,
    berry1,
    berry2,
    mush1,
    mush2,
    mush3,
    winter1,
    winter2,
    winter3,
    winter4,
    barn,
    coop,
    fence,
    silo,
    well,
    wind,
    tree1,
    tree2,
    tree3,
    flower1,
    flower2,
    tornado,
    grass,
  };

  return (
    <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
  );
}
