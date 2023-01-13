import React from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const ModelContext = React.createContext()

export function ModelProvider({children}) {
  // Use the path to the .glb file. Note that the path starts at the 'public' folder.
  const tree = useLoader(GLTFLoader, '3dmodels/oak_tree_lowpoly.glb');
  // Add more models here using the same pattern as above

  // Beet
  const beet1 = useGLTF('3dmodels/beet_1.glb');
  const beet2 = useGLTF('3dmodels/beet_2.glb');
  const beet3 = useGLTF('3dmodels/beet_3.glb');
  const beet4 = useGLTF('3dmodels/beet_4.glb');

  // Carrot
  const carrot1 = useGLTF('3dmodels/carrot_1.glb');
  const carrot2 = useGLTF('3dmodels/carrot_2.glb');
  const carrot3 = useGLTF('3dmodels/carrot_3.glb');

  const value = {tree, beet1, beet2, beet3, beet4, carrot1, carrot2, carrot3}

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
}