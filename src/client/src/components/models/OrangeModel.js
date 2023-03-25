import React from "react";
import { useModels } from "./hooks";

export function OrangeModel(props) {
  const { orange1, orange2, orange3, orange4 } = useModels();
  function getModel() {
    switch (props.stage) {
      case 0:
        return orange1.scene.clone();
      case 1:
        return orange2.scene.clone();
      case 2:
        return orange3.scene.clone();
      case 3:
        return orange4.scene.clone();
      default:
        return orange4.scene.clone();
    }
  }

  return <primitive object={getModel()} {...props} rotation-x={Math.PI / 2} />;
}
