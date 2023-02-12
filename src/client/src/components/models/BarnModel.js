import React from "react";
import { useModels } from "./hooks";

export function BarnModel(props) {
  const { barn } = useModels();

  return <primitive object={barn.scene.clone()} {...props} scale={0.01275} />;
}
