import React from "react";
import { useModels } from "./hooks";

export function WheatModel(props) {
  const { wheat1, wheat2 } = useModels();
  function getModel() {
    switch (props.stage) {
      case 0:
        return wheat1.scene.clone();
      case 1:
        return wheat2.scene.clone();
      default:
        return wheat2.scene.clone();
    }
  }

  return (
    <primitive
      object={getModel()}
      {...props}
      scale={0.01}
      rotation-x={Math.PI / 2}
    />
  );
}
