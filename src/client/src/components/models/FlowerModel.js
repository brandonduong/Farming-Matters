import React from "react";
import { useModels } from "./hooks";

export function FlowerModel(props) {
  const { flower1, flower2 } = useModels();
  const models = [flower1.scene.clone(), flower2.scene.clone()];

  return <primitive object={models[props.variant]} {...props} />;
}
