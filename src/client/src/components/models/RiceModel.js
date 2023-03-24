import React from "react";
import { useModels } from "./hooks";

export function RiceModel(props) {
  const { rice1, rice2 } = useModels();
  function getModel() {
    switch (props.stage) {
      case 0:
        return rice1.scene.clone();
      case 1:
        return rice2.scene.clone();
      default:
        return rice2.scene.clone();
    }
  }

  return <primitive object={getModel()} {...props} rotation-x={Math.PI / 2} />;
}
