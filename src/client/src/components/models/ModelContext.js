import React from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export const ModelContext = React.createContext()

export function ModelProvider({children}) {
  // Use the path to the .glb file. Note that the path starts at the 'public' folder.
  const tree = useLoader(GLTFLoader, '3dmodels/oak_tree_lowpoly.glb');
  // Add more models here using the same pattern as above

  // Carrot
  const carrot1 = useGLTF('3dmodels/carrot_1.glb');
  const carrot2 = useGLTF('3dmodels/carrot_2.glb');
  const carrot3 = useGLTF('3dmodels/carrot_3.glb');

  const value = {tree, carrot1, carrot2, carrot3}

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
}