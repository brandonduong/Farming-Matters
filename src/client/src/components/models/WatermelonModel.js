import React from "react";
import { useModels } from "./hooks";

export function WatermelonModel(props) {
  const { water1, water2, water3, water4 } = useModels();
  function getModel() {
    switch (props.stage) {
      case 0:
        return water1.scene.clone();
      case 1:
        return water2.scene.clone();
      case 2:
        return water3.scene.clone();
      case 3:
        return water4.scene.clone();
      default:
        return water4.scene.clone();
    }
  }

  return <primitive object={getModel()} {...props} rotation-x={Math.PI / 2} />;
}
