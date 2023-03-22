import React, { useState } from "react";
import { seasonTransition } from "./constants";
import { Stats, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from '@react-three/fiber'
import { underwaterImg, heavyRainImg } from "./constants";


const SeasonTransition = (props) => {
    const [displayTransition, setDisplayTransition] = useState(props.displayTransition);

    function exitTransition(){
        props.setDisplayTransition(false);
    }

    function findStatement(){
        for (let i = 0; i < seasonTransition.length; i++){
            console.log("HERE: ", props.typeOfCatastrophicEvent, Object.keys(seasonTransition[i])[0])
            if (props.typeOfCatastrophicEvent == Object.keys(seasonTransition[i])[0]){
                return seasonTransition[i][Object.keys(seasonTransition[i])[0]];
            }
        }

        return '';
    }

    return (
        <>
            { props.displayTransition ?
                <>
                    <div className="season-transition" >
                        <img className="background-img" src={heavyRainImg}></img>
                        <div className="transition-grid" >
                            <div className="transition-header">
                                    <span className="caution">&#9888;</span>
                                    <div className="transition-title">Breaking News!</div>
                            </div>
                            <div className="transition-box">
                                <div className="warning-msg">
                                    "{findStatement()} "
                                </div>
                            </div>
                        </div>
                        <button type="button" className="transition-button" onClick={()=> exitTransition()}>Close</button>
                        
                    </div>
                </>
                : 
                <></>        
            }

        </>

    );
};

export default SeasonTransition;
