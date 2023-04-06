import React from 'react';
import { useModels } from './hooks';

export function BerryModel(props) {
  const { berry1, berry2 } = useModels();
  function getModel() {
    switch (props.stage) {
      case 0:
        return berry1.scene.clone();
      case 1:
        return berry2.scene.clone();
      default:
        return berry2.scene.clone();
    }
  }

  return <primitive object={getModel()} {...props} rotation-x={Math.PI / 2} />;
}
