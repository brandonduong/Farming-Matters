import React, { useState } from "react";
import { seasonTransition } from "./constants";
import { Stats, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from '@react-three/fiber'
import { underwaterImg, heavyRainImg, winterImg, torandoImg } from "./constants";
import { addItem } from "../Inventory";
import { addItemToCropInfo } from "../Farm/FarmTile/FarmingHelpers";


const SeasonTransition = (props) => {
    const PLOT_SIZE = 2;
    function exitTransition(){
        console.log("EXIT BUTTON CLICKED");
        props.setDisplayTransition(false);
    }

    function newTile(x,z) {
        return props.grid.find((tile) => {
          return tile.x === x && tile.z === z;
        });
      }

      function updatedGrid(updatedTile) {
        var newGrid = props.grid.map((tile) =>
          updatedTile.x === tile.x && updatedTile.z === tile.z ? updatedTile : tile
        );
    
        props.setGrid(newGrid);
      }

    function elimanteFarm(){
       console.log(props.grid);
       for (let i = 0 ;i < props.grid.length; i++){
        if (props.grid[i].plantedSeed){
            const currentPlantedSeed = props.grid[i].plantedSeed;
            if (currentPlantedSeed.floorPrice == null){
      
                var updatedTile = newTile(props.grid[i].x,props.grid[i].z);
                updatedTile.plantedSeed = null;
                updatedTile.fertilizerAmount = 0;
                updatedTile.turnPlanted = 0;
                updatedGrid(updatedTile);

                
            }      
        }
        
       }
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
                        <img className={"background-img-" + props.season.toLowerCase()} src={props.typeOfCatastrophicEvent == "SnowStorm" ? winterImg : props.typeOfCatastrophicEvent == "HeavyRain" ? heavyRainImg :  props.typeOfCatastrophicEvent == "Drought" ? underwaterImg : props.typeOfCatastrophicEvent == "Tornadoes" ? torandoImg : ""}></img>
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
                        {elimanteFarm()}
                    </div>
                </>
                : 
                <></>        
            }

        </>

    );
};

export default SeasonTransition;
