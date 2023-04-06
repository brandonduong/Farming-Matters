import React from 'react';
import { useModels } from './hooks';

export function MushroomModel(props) {
  const { mush1, mush2, mush3 } = useModels();
  function getModel() {
    switch (props.stage) {
      case 0:
        return mush1.scene.clone();
      case 1:
        return mush2.scene.clone();
      case 2:
        return mush3.scene.clone();
      default:
        return mush3.scene.clone();
    }
  }

  return <primitive object={getModel()} {...props} rotation-x={Math.PI / 2} />;
}
