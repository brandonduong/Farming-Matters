import React from 'react';
import { useModels } from './hooks';

export function TreeModel(props) {
  const { tree1, tree2, tree3 } = useModels();
  const models = [
    tree1.scene.clone(),
    tree2.scene.clone(),
    tree3.scene.clone(),
  ];

  return <primitive object={models[props.variant]} {...props} />;
}
