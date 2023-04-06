import React from 'react';
import { useModels } from './hooks';

export function WindModel(props) {
  const { wind } = useModels();

  return <primitive object={wind.scene.clone()} {...props} scale={0.0075} />;
}
