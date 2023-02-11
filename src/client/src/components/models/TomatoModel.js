import React from "react";
import { useModels } from "./hooks";

export function TomatoModel(props) {
  const { tomato1, tomato2, tomato3 } = useModels();
  function getModel() {
    switch (props.stage) {
      case 0:
        return tomato1.scene.clone();
      case 1:
        return tomato2.scene.clone();
      case 2:
        return tomato3.scene.clone();
      default:
        return tomato3.scene.clone();
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
