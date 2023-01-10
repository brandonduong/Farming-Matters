import React from "react";
import { useModels } from "./hooks"

export function TreeModel(props) {
    const { tree } = useModels();
    
    return (
        <primitive 
            object={tree.scene.clone()} 
            {...props} 
            scale={0.3}
            rotation-x={Math.PI/2}
        />
    );
  };

