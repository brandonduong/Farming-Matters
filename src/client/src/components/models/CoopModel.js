import React from 'react';
import { useModels } from './hooks';

export function CoopModel(props) {
  const { coop } = useModels();

  return <primitive object={coop.scene.clone()} {...props} scale={0.015} />;
}
