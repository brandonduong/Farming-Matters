import React, { Suspense } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from "@react-three/fiber";

export function TestModel(props) {

    // Use the path to the .glb file. Note that the path starts at the 'public' folder.
    const gltf = useLoader(GLTFLoader, '3dmodels/oak_tree_lowpoly.glb');
    return (
        <primitive 
            object={gltf.scene.clone()} 
            {...props} 
            scale={0.3}
            rotation-x={Math.PI/2}
        />
    );
  };

