import React from "react";
import { useModels } from "./hooks";

export function SiloModel(props) {
  const { silo } = useModels();

  return <primitive object={silo.scene.clone()} {...props} scale={0.01} />;
}
