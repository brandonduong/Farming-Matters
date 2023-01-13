import React, { Suspense } from "react";
import { Beet1 } from "./Beet1";
import { Beet2 } from "./Beet2";
import { Beet3 } from "./Beet3";
import { Beet4 } from "./Beet4";
import { useModels } from "../hooks"

export function BeetModel(props) {
    const models = [<Beet1 position={props.position} {...props}/>,
     <Beet2 position={props.position} {...props}/>,
      <Beet3 position={props.position} {...props}/>,
       <Beet4 position={props.position} {...props}/>]

    return (
      <>
      {models[props.stage]}
      </>
    );
  };

