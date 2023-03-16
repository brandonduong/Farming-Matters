import React from "react";
import { useModels } from "./hooks";

export function TornadoModel(props) {
  const { tornado} = useModels();
  const models = [
    tornado.scene.clone(),
  ];

  return <primitive object={models[props.variant]} {...props} />;
}
