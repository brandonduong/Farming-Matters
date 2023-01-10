import React from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from "@react-three/fiber";

export const ModelContext = React.createContext()

export function ModelProvider({children}) {
  // Use the path to the .glb file. Note that the path starts at the 'public' folder.
  const tree = useLoader(GLTFLoader, '3dmodels/oak_tree_lowpoly.glb');
  // Add more models here using the same pattern as above

  const value = {tree}

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>
}