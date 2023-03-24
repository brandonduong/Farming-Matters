import React, { useState } from "react";
import { seasonTransition } from "./constants";
import { Stats, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from '@react-three/fiber'
import { underwaterImg, heavyRainImg, winterImg } from "./constants";


const SeasonTransition = (props) => {

    function exitTransition(){
        console.log("EXIT BUTTON CLICKED");
        props.setDisplayTransition(false);
    }

    function findStatement(){
        for (let i = 0; i < seasonTransition.length; i++){
            console.log("HERE: ", props.typeOfCatastrophicEvent, Object.keys(seasonTransition[i])[0], "CURRENT SEASON: ", props.season)
            if (props.typeOfCatastrophicEvent == Object.keys(seasonTransition[i])[0]){
                return seasonTransition[i][Object.keys(seasonTransition[i])[0]];
            }
        }

        return '';
    }

    return (
        <>
            { true ?
                <>
                    <div className="season-transition" >
                        <img className="background-img-winter" src={winterImg}></img>
                        
                        
                        <div className="season-transition-component" >
                        
                            <div className="transition-box">

                                <div className="transition-header">
                                        <span className="caution">&#9888;</span>
                                        <div className="transition-title">Breaking News!</div>
                                </div>
                                <div className="warning-msg-box">
                                    <div className="warning-msg">
                                        "{findStatement()}"
                                    </div>
                                    
                                </div>
                                   
                            </div>
                            <button type="button" id="season-transition-close" className="close-button" onClick={()=> exitTransition()}>x</button>   
                        </div>
                      
                    </div>
                </>
                : 
                <></>        
            }

        </>

    );
};

export default SeasonTransition;
