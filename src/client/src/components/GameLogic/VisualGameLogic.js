import {SeasonalEvents} from '../GameEvents/SeasonalEvents/SeasonalEvents'
import { logData } from '../../utils/logData';
import { Stats, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import { useEffect } from 'react';
//seed [x,z] coordinates on grid
function addPlantedSeeds(plantedSeeds, seed){
    console.log(plantedSeeds);
    //exception if added planted seed exceeds grid
    plantedSeeds.push(seed);
    return plantedSeeds;
}

function removePlantedSeeds(plantedSeeds, seed){
    //exception if removing a seed is not in the grid
    const itemIndex = plantedSeeds.findIndex(seed);
    if (itemIndex < 0){
        return false;
    }

    //removing only 1 item at itemIndex
    plantedSeeds.splice(itemIndex,1);
    return plantedSeeds;
}

function changeSeasonBaseEnvironment(currentSeason){
    switch(currentSeason){
        case "Fall":
            return SeasonalEvents.HeavyRain();
        case "Winter":
            return SeasonalEvents.SnowStorm();
        case "Spring":
            break;
        case "Summer":
            break;
    }
}

function changeSeasonAmbience(currentSeason){
    let lightIntensity;
    switch (currentSeason){
        case "Fall":
            lightIntensity = 0.65;
            break;
        case "Winter":
            lightIntensity = 0.45;
            break;
        case "Spring":
            lightIntensity = 0.85;
            break;
        case "Summer": 
            lightIntensity= 1.15;
            break;
    }
    return lightIntensity;
}

function generateVisualEnvironment(turn, currentSeason, eventHappening, eventType){

    
    return(
        <>
            <ambientLight intensity={changeSeasonAmbience(currentSeason)} />
            <spotLight position={[10, 50, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <PerspectiveCamera
                makeDefault
                fov={70}
                position={ changeCameraAngle(currentSeason)}
            />
            {eventHappening > 0.5 ? changeSeasonBaseEnvironment(currentSeason) : <></>}
        </>
    )
}

function changeCameraAngle(currentSeason){
    let x,y,z;
    //Make a constants file
    switch (currentSeason){
        case "Fall":
            x = 10;
            y = 5;
            z = 0;
            break;
        case "Winter":
            x = 15;
            y = 5;
            z = 0;
            break;
        case "Spring":
            x = 15;
            y = 5;
            z = 10;
            break;
        case "Summer":
            x = 5;
            y = 5;
            z = 15;
            break;
    }

    return [x,y,z];
}

export const VisualGameLogic = {
    addPlantedSeeds,
    removePlantedSeeds,
    changeSeasonBaseEnvironment,
    changeCameraAngle,
    generateVisualEnvironment
};

