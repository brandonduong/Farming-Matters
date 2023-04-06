import React from 'react';
import { useModels } from './hooks';

export function WellModel(props) {
  const { well } = useModels();

  return <primitive object={well.scene.clone()} {...props} scale={0.015} />;
}
