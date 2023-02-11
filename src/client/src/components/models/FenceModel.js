import React from "react";
import { useModels } from "./hooks";

export function FenceModel(props) {
  const { fence } = useModels();

  return (
    <primitive
      object={fence.scene.clone()}
      {...props}
      scale={[0.008, 0.01, 0.01]}
    />
  );
}
