import React from "react";
import { useModels } from "./hooks";

export function WinterModel(props) {
  const { winter1, winter2, winter3, winter4 } = useModels();
  function getModel() {
    switch (props.stage) {
      case 0:
        return winter1.scene.clone();
      case 1:
        return winter2.scene.clone();
      case 2:
        return winter3.scene.clone();
      case 3:
        return winter4.scene.clone();
      default:
        return winter4.scene.clone();
    }
  }

  return (
    <primitive
      object={getModel()}
      {...props}
      scale={0.008}
      rotation-x={Math.PI / 2}
    />
  );
}
