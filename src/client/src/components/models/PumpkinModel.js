import React from "react";
import { useModels } from "./hooks";

export function PumpkinModel(props) {
  const { pumpkin1, pumpkin2, pumpkin3 } = useModels();
  function getModel() {
    switch (props.stage) {
      case 0:
        return pumpkin1.scene.clone();
      case 1:
        return pumpkin2.scene.clone();
      case 2:
        return pumpkin3.scene.clone();
      default:
        return pumpkin3.scene.clone();
    }
  }

  return (
    <primitive
      object={getModel()}
      {...props}
      scale={props.scale}
      rotation-x={Math.PI / 2}
    />
  );
}
