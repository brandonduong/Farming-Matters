import React from "react";
import { useModels } from "./hooks";

export function LettuceModel(props) {
  const { lettuce1, lettuce2 } = useModels();
  function getModel() {
    switch (props.stage) {
      case 0:
        return lettuce1.scene.clone();
      case 1:
        return lettuce2.scene.clone();
      default:
        return lettuce2.scene.clone();
    }
  }

  return <primitive object={getModel()} {...props} rotation-x={Math.PI / 2} />;
}
