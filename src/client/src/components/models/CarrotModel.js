import React from "react";
import { useModels } from "./hooks"

export function CarrotModel(props) {
    const { carrot1, carrot2, carrot3 } = useModels();
    function getModel() {
      switch (props.stage) {
        case 0:
          return carrot1.scene.clone();
        case 1:
          return carrot2.scene.clone();
        case 2:
          return carrot3.scene.clone();
        default:
          if (props.stage >= 2) {
            return carrot3.scene.clone();
          }
          return carrot1.scene.clone();
      }
    }

    return (
        <primitive 
            object={getModel()} 
            {...props} 
            scale={0.02}
            rotation-x={Math.PI/2}
        />
    );
  };

