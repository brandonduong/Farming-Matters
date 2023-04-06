import React from 'react';
import { useModels } from './hooks';

export function GrassModel(props) {
  const { grass } = useModels();
  const models = [grass.scene.clone()];

  return <primitive object={models[props.variant]} {...props} />;
}
