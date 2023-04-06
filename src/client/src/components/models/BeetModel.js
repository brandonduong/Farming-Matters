import React from 'react';
import { useModels } from './hooks';

export function BeetModel(props) {
  const { beet1, beet2, beet3, beet4 } = useModels();
  function getModel() {
    switch (props.stage) {
      case 0:
        return beet1.scene.clone();
      case 1:
        return beet2.scene.clone();
      case 2:
        return beet3.scene.clone();
      case 3:
        return beet4.scene.clone();
      default:
        return beet4.scene.clone();
    }
  }

  return (
    <primitive
      object={getModel()}
      {...props}
      scale={props.scale}
      rotation-x={Math.PI / 2}
    />
  );
}
